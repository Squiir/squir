import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async addPoints(userId: string, amount: number) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException("Invalid amount");
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { loyaltyPoints: { increment: amount } },
      select: { id: true, loyaltyPoints: true },
    });

    return user;
  }
}
