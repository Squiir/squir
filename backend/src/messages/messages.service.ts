import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(senderId: string, receiverId: string, content: string) {
    if (senderId === receiverId) {
      throw new ForbiddenException("Cannot message yourself");
    }

    return this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
  }

  async getConversation(userId: string, friendId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async markAsRead(userId: string, friendId: string) {
    return this.prisma.message.updateMany({
      where: {
        senderId: friendId,
        receiverId: userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  }

  async getLastMessagesForUser(userId: string) {
    const friends = await this.prisma.friend.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ requesterId: userId }, { receiverId: userId }],
      },
      include: {
        requester: {
          select: { id: true, username: true, avatarUrl: true, status: true },
        },
        receiver: {
          select: { id: true, username: true, avatarUrl: true, status: true },
        },
      },
    });

    const friendUsers = friends.map((f) =>
      f.requesterId === userId ? f.receiver : f.requester,
    );

    const conversations = await Promise.all(
      friendUsers.map(async (friend) => {
        const lastMessage = await this.prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, receiverId: friend.id },
              { senderId: friend.id, receiverId: userId },
            ],
          },
          orderBy: { createdAt: "desc" },
        });

        const unreadCount = await this.prisma.message.count({
          where: {
            senderId: friend.id,
            receiverId: userId,
            readAt: null,
          },
        });

        return {
          friend,
          lastMessage: lastMessage?.content ?? null,
          createdAt: lastMessage?.createdAt ?? null,
          unreadCount,
          isSender: lastMessage ? lastMessage.senderId === userId : null,
        };
      }),
    );

    return conversations;
  }
}
