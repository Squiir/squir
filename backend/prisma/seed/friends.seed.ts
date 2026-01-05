import { FriendStatus, PrismaClient, User } from "@prisma/client";

export async function seedFriends(prisma: PrismaClient, users: User[]) {
  if (users.length < 4) {
    throw new Error("At least 4 users are required to seed friends");
  }

  const [a, b, c, d] = users;

  await prisma.friend.createMany({
    data: [
      // A ↔ B
      {
        requesterId: a.id,
        receiverId: b.id,
        status: FriendStatus.ACCEPTED,
      },

      // A ↔ C
      {
        requesterId: a.id,
        receiverId: c.id,
        status: FriendStatus.ACCEPTED,
      },

      // B ↔ D
      {
        requesterId: b.id,
        receiverId: d.id,
        status: FriendStatus.ACCEPTED,
      },

      // C ↔ D
      {
        requesterId: c.id,
        receiverId: d.id,
        status: FriendStatus.ACCEPTED,
      },

      // D → A
      {
        requesterId: d.id,
        receiverId: a.id,
        status: FriendStatus.PENDING,
      },

      // C → B
      {
        requesterId: c.id,
        receiverId: b.id,
        status: FriendStatus.PENDING,
      },
    ],
    skipDuplicates: true,
  });
}
