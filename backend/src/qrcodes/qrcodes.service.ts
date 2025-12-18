import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import QRCode from "qrcode";

type QrLabelPayload = {
  v: 1;
  barId: string;
  product: string;
};

function safeParseLabel(label: string): QrLabelPayload | null {
  try {
    const obj = JSON.parse(label) as QrLabelPayload;
    if (!obj || obj.v !== 1) return null;
    if (typeof obj.barId !== "string") return null;
    if (typeof obj.product !== "string") return null;
    return obj;
  } catch {
    return null;
  }
}

@Injectable()
export class QrCodesService {
  constructor(private prisma: PrismaService) {}

  private qrValue(qrId: string) {
    return `squir://redeem?qr=${encodeURIComponent(qrId)}`;
  }

  async generate(userId: string, barId: string, product: string) {
    const labelPayload: QrLabelPayload = { v: 1, barId, product };

    const qr = await this.prisma.qRCode.create({
      data: {
        userId,
        label: JSON.stringify(labelPayload),
      },
      select: {
        id: true,
        used: true,
        label: true,
        createdAt: true,
      },
    });

    return {
      id: qr.id,
      used: qr.used,
      createdAt: qr.createdAt,
      barId,
      product,
      value: this.qrValue(qr.id),
      imageUrl: `/qrcodes/${qr.id}.png`,
    };
  }

  async listMine(userId: string) {
    const items = await this.prisma.qRCode.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, used: true, label: true, createdAt: true },
    });

    return items.map((qr) => {
      const parsed = safeParseLabel(qr.label);
      return {
        id: qr.id,
        used: qr.used,
        createdAt: qr.createdAt,
        barId: parsed?.barId ?? null,
        product: parsed?.product ?? null,
        value: this.qrValue(qr.id),
        imageUrl: `/qrcodes/${qr.id}.png`,
      };
    });
  }

  async remove(userId: string, id: string) {
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
    const qr = await this.prisma.qRCode.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!qr) throw new NotFoundException("QR code not found");
    if (qr.userId !== userId) throw new ForbiddenException("Not your QR code");

    const value = this.qrValue(qr.id);

    const png = await QRCode.toBuffer(value, {
      type: "png",
      width: 360,
      margin: 1,
      errorCorrectionLevel: "M",
    });

    return png;
  }
}
