import { PrismaClient, User } from "@prisma/client";

export async function seedFriends(prisma: PrismaClient, users: User[]) {
  const [a, b, c, d] = users;

  await prisma.friend.createMany({
    data: [
      { userId: a.id, friendId: b.id },
      { userId: b.id, friendId: a.id },
      { userId: a.id, friendId: c.id },
      { userId: c.id, friendId: a.id },
      { userId: d.id, friendId: a.id },
      { userId: a.id, friendId: d.id },
      { userId: d.id, friendId: b.id },
      { userId: b.id, friendId: d.id },
      { userId: d.id, friendId: c.id },
      { userId: c.id, friendId: d.id },
    ],
    skipDuplicates: true,
  });
}
