import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class QrCodesService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, label: string) {
    return this.prisma.qRCode.create({
      data: { userId, label },
    });
  }
}
