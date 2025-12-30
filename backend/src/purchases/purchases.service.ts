import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Add loyalty points to a user's account
   * @param userId - User ID
   * @param amount - Number of points to add (must be positive)
   * @returns Updated user with new loyalty points total
   * @throws BadRequestException if amount is invalid (not positive number)
   */
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
