import { PrismaClient, User } from "@prisma/client";

export async function seedPurchases(prisma: PrismaClient, users: User[]) {
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loyaltyPoints: { increment: Math.floor(Math.random() * 50) },
      },
    });
  }
}
