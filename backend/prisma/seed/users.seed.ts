import { PrismaClient, User, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { iso8601ToDateTime } from "../../src/utils/date";

export async function seedUsers(prisma: PrismaClient): Promise<User[]> {
  const password = await bcrypt.hash("password123", 10);

  // Create existing users as ADMIN
  await prisma.user.createMany({
    data: [
      {
        email: "maxence@gmail.com",
        username: "maxou",
        password,
        role: UserRole.ADMIN,
        status: "Sortir c'est vomir",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        loyaltyPoints: 70,
        birthDate: iso8601ToDateTime("2002-03-12T14:30:00Z"),
      },
      {
        email: "noe@gmail.com",
        username: "poe",
        password,
        role: UserRole.ADMIN,
        status: "caps ?",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
        loyaltyPoints: 50,
        birthDate: iso8601ToDateTime("2002-07-25T09:15:00Z"),
      },
      {
        email: "romain@gmail.com",
        username: "romanodu35",
        password,
        role: UserRole.ADMIN,
        status: "si tu bois, je bois",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        loyaltyPoints: 30,
        birthDate: iso8601ToDateTime("2002-11-02T18:45:00Z"),
      },
      {
        email: "dylan@gmail.com",
        username: "dydou",
        password,
        role: UserRole.ADMIN,
        status: "Dyd u (dydyou) come tonight ?",
        avatarUrl:
          "https://gravatar.com/avatar/e87d96a5bb1c7c49a5c4d569d862e662?s=400&d=robohash&r=x",
        loyaltyPoints: 90,
        birthDate: iso8601ToDateTime("2002-01-19T10:05:00Z"),
      },
    ],
  });

  // Create CUSTOMER user
  await prisma.user.create({
    data: {
      email: "customer@squir.com",
      username: "customer",
      password,
      role: UserRole.CUSTOMER,
      status: "J'adore Squir !",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      loyaltyPoints: 10,
      birthDate: iso8601ToDateTime("2000-01-01T12:00:00Z"),
    },
  });

  // Create PROFESSIONAL users with their bars
  await prisma.user.create({
    data: {
      email: "bar1@squir.com",
      username: "bar1er",
      password,
      role: UserRole.PROFESSIONAL,
      status: "Gérant du Bar 1er",
      avatarUrl: "https://i.pravatar.cc/150?img=6",
      loyaltyPoints: 0,
      birthDate: iso8601ToDateTime("1985-05-15T10:00:00Z"),
    },
  });

  await prisma.user.create({
    data: {
      email: "bar2@squir.com",
      username: "bar2em",
      password,
      role: UserRole.PROFESSIONAL,
      status: "Gérant du Bar 2em",
      avatarUrl: "https://i.pravatar.cc/150?img=7",
      loyaltyPoints: 0,
      birthDate: iso8601ToDateTime("1980-08-20T10:00:00Z"),
    },
  });

  return prisma.user.findMany();
}
