import { PrismaClient, User } from "@prisma/client";

export async function seedQrCodes(prisma: PrismaClient, users: User[]) {
  for (const user of users) {
    await prisma.qRCode.createMany({
      data: [
        { userId: user.id, label: "Entrée" },
        { userId: user.id, label: "Boisson" },
      ],
    });
  }
}
