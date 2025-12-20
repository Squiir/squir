import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import QRCode from "qrcode";

@Injectable()
export class QrCodesService {
  constructor(private prisma: PrismaService) {}

  // ✅ Ce que le QR encode
  private qrValue(qrId: string) {
    return `squir://redeem?qr=${encodeURIComponent(qrId)}`;
  }

  async generate(params: {
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
      imageUrl: `/qr-codes/${qr.id}.png`,
    };
  }

  async listMine(userId: string) {
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
      imageUrl: `/qr-codes/${qr.id}.png`,
    }));
  }

  async remove(userId: string, id: string) {
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


  async renderPng(userId: string, id: string) {
    if (!userId) throw new BadRequestException("Missing userId");

    const qr = await this.prisma.qRCode.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!qr) throw new NotFoundException("QR code not found");
    if (qr.userId !== userId) throw new ForbiddenException("Not your QR code");

    const value = this.qrValue(id);

    const png = await QRCode.toBuffer(value, {
      type: "png",
      width: 360,
      margin: 1,
      errorCorrectionLevel: "M",
    });

    return png;
  }
}
