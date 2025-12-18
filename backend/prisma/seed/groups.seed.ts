import { PrismaClient, User } from "@prisma/client";

export async function seedGroups(prisma: PrismaClient, users: User[]) {
  const group = await prisma.group.create({
    data: {
      name: "TP la semaine, PT le week-end",
      members: {
        create: users.map((u) => ({ userId: u.id })),
      },
    },
  });

  return group;
}
