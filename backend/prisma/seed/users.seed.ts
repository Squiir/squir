import { PrismaClient, User } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient): Promise<User[]> {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        email: "maxence@gmail.com",
        username: "maxou",
        password,
        status: "Sortir c'est vomir",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        loyaltyPoints: 70,
      },
      {
        email: "noe@gmail.com",
        username: "poe",
        password,
        status: "caps ?",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
        loyaltyPoints: 50,
      },
      {
        email: "romain@gmail.com",
        username: "romanodu35",
        password,
        status: "si tu bois, je bois",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        loyaltyPoints: 30,
      },
      {
        email: "dylan@gmail.com",
        username: "dydou",
        password,
        status: "Dyd u (dydyou) come tonight ?",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        loyaltyPoints: 90,
      },
    ],
  });

  return prisma.user.findMany();
}
