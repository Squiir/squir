import {
  MAX_HISTORY_RECORDS,
  QR_CODE_EXPIRATION_HOURS,
} from "@constants/qrcodes.constants";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import { QrCodeGateway } from "@qrcodes/qrcode.gateway";
import QRCode from "qrcode";

@Injectable()
export class QrCodesService {
  constructor(
    private prisma: PrismaService,
    private qrCodeGateway: QrCodeGateway,
  ) {}

  /**
   * Generates the QR code value string
   * @param qrId - QR code ID
   * @returns Formatted QR value URL
   * @private
   */
  private qrValue(qrId: string) {
    return `squir://redeem?qr=${encodeURIComponent(qrId)}`;
  }

  /**
   * Creates a new QR code for a user
   * @param params - QR code creation parameters
   * @param params.userId - ID of the user creating the QR code
   * @param params.barId - ID of the bar
   * @param params.offerId - ID of the product/offer
   * @param params.label - Optional label for the QR code
   * @returns Created QR code with value and URL
   * @throws {BadRequestException} If required parameters are missing
   */
  async createQrcode(params: {
    userId: string;
    barId: string;
    offerId: string;
    label?: string;
  }) {
    const { userId, barId, offerId, label } = params;

    if (!userId) throw new BadRequestException("Missing userId");
    if (!barId) throw new BadRequestException("Missing barId");
    if (!offerId) throw new BadRequestException("Missing offerId");

    const qr = await this.prisma.qRCode.create({
      data: {
        userId,
        barId,
        offerId,
        label: label ?? `QR for bar=${barId} product=${offerId}`,
      },
      select: {
        id: true,
        used: true,
        userId: true,
        barId: true,
        offerId: true,
        label: true,
        createdAt: true,
      },
    });

    return {
      id: qr.id,
      used: qr.used,
      createdAt: qr.createdAt,
      barId: qr.barId,
      offerId: qr.offerId,
      label: qr.label,
      value: this.qrValue(qr.id),
      url: `/qrcodes/${qr.id}.png`,
    };
  }

  /**
   * Retrieves all active (non-consumed) QR codes for a user
   * @param userId - ID of the user
   * @returns Array of active QR codes with their details
   * @throws {BadRequestException} If userId is missing
   */
  async getMyQrcodes(userId: string) {
    if (!userId) throw new BadRequestException("Missing userId");

    return this.prisma.qRCode.findMany({
      where: {
        userId,
        consumedAt: null, // Only active QR codes
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Removes a QR code (deletes it from the database)
   * @param userId - ID of the user requesting deletion
   * @param id - ID of the QR code to delete
   * @returns Confirmation object
   * @throws {BadRequestException} If userId is missing
   * @throws {NotFoundException} If QR code doesn't exist
   * @throws {ForbiddenException} If user is not the owner of the QR code
   */
  async removeQrcode(userId: string, id: string) {
    if (!userId) throw new BadRequestException("Missing userId");

    const qr = await this.prisma.qRCode.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!qr) throw new NotFoundException("QR code not found");
    if (qr.userId !== userId) throw new ForbiddenException("Not your QR code");

    await this.prisma.qRCode.delete({ where: { id } });
    return { ok: true };
  }

  /**
   * Generates a PNG image of the QR code
   * @param id - ID of the QR code to render
   * @returns PNG buffer of the QR code image
   * @throws {NotFoundException} If QR code doesn't exist
   */
  async renderPng(id: string) {
    const qr = await this.prisma.qRCode.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!qr) throw new NotFoundException("QR code not found");

    const value = this.qrValue(id);
    const png = await QRCode.toBuffer(value, {
      type: "png",
      width: 360,
      margin: 1,
      errorCorrectionLevel: "M",
    });

    return png;
  }

  /**
   * Consumes a QR code by marking it as consumed
   * @param id - QR code ID to consume
   * @param currentUserId - ID of the user consuming the QR
   * @param userRole - Role of the current user
   * @param userBarIds - Array of bar IDs owned by the user (for PROFESSIONAL)
   * @returns Consumption confirmation with QR code details
   * @throws {NotFoundException} If QR code doesn't exist
   * @throws {BadRequestException} If QR code is already consumed or user tries to scan own QR
   * @throws {ForbiddenException} If user doesn't have permission to scan this QR
   */
  async consumeQrCode(
    id: string,
    currentUserId: string,
    userRole: UserRole,
    userBarIds: string[],
  ) {
    if (!id) throw new BadRequestException("Missing QR code ID");

    const qr = await this.prisma.qRCode.findUnique({
      where: { id },
      select: {
        id: true,
        barId: true,
        offerId: true,
        label: true,
        userId: true,
        createdAt: true,
        consumedAt: true,
      },
    });

    if (!qr) throw new NotFoundException("QR code not found");
    if (qr.consumedAt)
      throw new BadRequestException("QR code already consumed");

    // Check if user is trying to scan their own QR code
    if (qr.userId === currentUserId) {
      throw new BadRequestException("Cannot scan your own QR code");
    }

    // Role-based permissions using switch for better readability
    switch (userRole) {
      case UserRole.CUSTOMER:
        throw new ForbiddenException("Customers cannot scan QR codes");

      case UserRole.PROFESSIONAL:
        // PROFESSIONAL can only scan QR codes from their own bars
        if (!userBarIds.includes(qr.barId)) {
          throw new ForbiddenException(
            "You can only scan QR codes from your bars",
          );
        }
        break;

      case UserRole.ADMIN:
        // ADMIN can scan all QR codes (no restrictions)
        break;

      default:
        throw new ForbiddenException("Invalid user role");
    }

    // Mark as consumed
    const updatedQr = await this.prisma.qRCode.update({
      where: { id },
      data: { consumedAt: new Date() },
    });

    // Notify the QR code owner via WebSocket
    this.qrCodeGateway.notifyQrCodeConsumed(qr.userId, qr.id);

    return {
      message: "QR code consumed successfully",
      qrCode: {
        id: qr.id,
        barId: qr.barId,
        offerId: qr.offerId,
        label: qr.label,
        createdAt: qr.createdAt,
      },
    };
  }

  /**
   * Retrieves the history of consumed QR codes for a user
   * @param userId - ID of the user
   * @returns Array of consumed QR codes (limited to 50 most recent)
   * @throws {BadRequestException} If userId is missing
   */
  async getHistory(userId: string) {
    if (!userId) throw new BadRequestException("Missing userId");

    return this.prisma.qRCode.findMany({
      where: {
        userId,
        consumedAt: { not: null },
      },
      orderBy: { consumedAt: "desc" },
      take: MAX_HISTORY_RECORDS,
      select: {
        id: true,
        barId: true,
        offerId: true,
        label: true,
        consumedAt: true,
        createdAt: true,
      },
    });
  }

  /**
   * Deletes QR codes older than 48 hours
   * Intended for scheduled cleanup (e.g., cron job)
   * @returns Object containing the number of deleted QR codes
   */
  async deleteExpiredQrCodes() {
    const expirationDate = new Date();
    expirationDate.setHours(
      expirationDate.getHours() - QR_CODE_EXPIRATION_HOURS,
    );

    const result = await this.prisma.qRCode.deleteMany({
      where: {
        createdAt: {
          lt: expirationDate,
        },
      },
    });

    return { deleted: result.count };
  }
}
