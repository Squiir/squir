import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import QRCode from "qrcode";
import { QrcodeGateway } from "./qrcode.gateway";

@Injectable()
export class QrCodesService {
  constructor(
    private prisma: PrismaService,
    private qrcodeGateway: QrcodeGateway,
  ) {}

  private qrValue(qrId: string) {
    return `squir://redeem?qr=${encodeURIComponent(qrId)}`;
  }

  async createQrcode(params: {
    userId: string;
    barId: string;
    productId: string;
    label?: string;
  }) {
    const { userId, barId, productId, label } = params;

    if (!userId) throw new BadRequestException("Missing userId");
    if (!barId) throw new BadRequestException("Missing barId");
    if (!productId) throw new BadRequestException("Missing productId");

    const qr = await this.prisma.qRCode.upsert({
      where: {
        userId_barId_productId: {
          userId,
          barId,
          productId,
        },
      },
      update: {
        label: label ?? `QR for bar=${barId} product=${productId}`,
      },
      create: {
        userId,
        barId,
        productId,
        label: label ?? `QR for bar=${barId} product=${productId}`,
      },
      select: {
        id: true,
        used: true,
        userId: true,
        barId: true,
        productId: true,
        label: true,
        createdAt: true,
      },
    });

    return {
      id: qr.id,
      used: qr.used,
      createdAt: qr.createdAt,
      barId: qr.barId,
      productId: qr.productId,
      label: qr.label,
      value: this.qrValue(qr.id),
      url: `/qrcodes/${qr.id}.png`,
    };
  }

  async getMyQrcodes(userId: string) {
    if (!userId) throw new BadRequestException("Missing userId");

    const items = await this.prisma.qRCode.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        used: true,
        barId: true,
        productId: true,
        label: true,
        createdAt: true,
      },
    });

    return items.map((qr) => ({
      id: qr.id,
      used: qr.used,
      createdAt: qr.createdAt,
      barId: qr.barId,
      productId: qr.productId,
      label: qr.label,
      value: this.qrValue(qr.id),
      url: `/qrcodes/${qr.id}.png`,
    }));
  }

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

  async consumeQrCode(id: string) {
    if (!id) throw new BadRequestException("Missing QR code ID");

    const qr = await this.prisma.qRCode.findUnique({
      where: { id },
      select: {
        id: true,
        barId: true,
        productId: true,
        label: true,
        userId: true,
        createdAt: true,
      },
    });

    if (!qr) throw new NotFoundException("QR code not found");

    // Créer entrée dans l'historique
    await this.prisma.qRCodeHistory.create({
      data: {
        userId: qr.userId,
        barId: qr.barId,
        productId: qr.productId,
        label: qr.label,
        consumedAt: new Date(),
        createdAt: qr.createdAt,
      },
    });

    // Supprimer le QR code
    await this.prisma.qRCode.delete({
      where: { id },
    });

    // Notifier le propriétaire du QR code via WebSocket
    this.qrcodeGateway.notifyQrCodeConsumed(qr.userId, {
      qrCodeId: qr.id,
      barId: qr.barId,
      productId: qr.productId,
      label: qr.label,
      timestamp: new Date(),
    });

    return {
      message: "QR code consumed successfully",
      qrCode: {
        id: qr.id,
        barId: qr.barId,
        productId: qr.productId,
        label: qr.label,
        createdAt: qr.createdAt,
      },
    };
  }

  async getHistory(userId: string) {
    if (!userId) throw new BadRequestException("Missing userId");

    return this.prisma.qRCodeHistory.findMany({
      where: { userId },
      orderBy: { consumedAt: "desc" },
      take: 50,
      select: {
        id: true,
        barId: true,
        productId: true,
        label: true,
        consumedAt: true,
        createdAt: true,
        bar: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async deleteExpiredQrCodes() {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() - 48);

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
