import { PrismaClient, User } from "@prisma/client";

export async function seedQrCodes(prisma: PrismaClient, users: User[]) {
  for (const user of users) {
    await prisma.qRCode.createMany({
      data: [
        { userId: user.id, label: "Entrée", barId: "bar-123", productId: "prod-abc" },
        { userId: user.id, label: "Boisson", barId: "bar-456", productId: "prod-def" },
      ],
    });
  }
}
