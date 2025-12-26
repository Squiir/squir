import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { GroupMessagePayload, GroupReadPayload } from "@social/types/message";

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserGroupIds(userId: string): Promise<string[]> {
    const memberships = await this.prisma.groupMember.findMany({
      where: { userId },
      select: { groupId: true },
    });

    return memberships.map((m) => m.groupId);
  }

  async createGroupMessage(
    userId: string,
    groupId: string,
    text: string,
  ): Promise<GroupMessagePayload> {
    const membership = await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: { userId, groupId },
      },
    });

    if (!membership) {
      throw new ForbiddenException("Not a group member");
    }

    const message = await this.prisma.groupMessage.create({
      data: {
        authorId: userId,
        groupId,
        text,
      },
    });

    return {
      id: message.id,
      groupId: message.groupId,
      authorId: message.authorId,
      text: message.text,
      createdAt: message.createdAt.toISOString(),
    };
  }

  async getGroupMessages(
    userId: string,
    groupId: string,
    limit = 30,
    cursor?: string,
  ): Promise<{
    messages: GroupMessagePayload[];
    nextCursor?: string;
  }> {
    const membership = await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: { userId, groupId },
      },
    });

    if (!membership) {
      throw new ForbiddenException("Not a group member");
    }

    const messages = await this.prisma.groupMessage.findMany({
      where: { groupId },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
    });

    const hasNextPage = messages.length > limit;
    const items = hasNextPage ? messages.slice(0, limit) : messages;

    return {
      messages: items.map((m) => ({
        id: m.id,
        groupId: m.groupId,
        authorId: m.authorId,
        text: m.text,
        createdAt: m.createdAt.toISOString(),
      })),
      nextCursor: hasNextPage ? items[items.length - 1].id : undefined,
    };
  }

  async markMessageRead(
    userId: string,
    groupId: string,
    messageId: string,
  ): Promise<GroupReadPayload> {
    const membership = await this.prisma.groupMember.findUnique({
      where: {
        userId_groupId: { userId, groupId },
      },
    });

    if (!membership) {
      throw new ForbiddenException("Not a group member");
    }

    await this.prisma.groupMessageRead.upsert({
      where: {
        messageId_userId: { messageId, userId },
      },
      update: {},
      create: { messageId, userId },
    });

    const readAt = new Date();

    await this.prisma.groupMember.update({
      where: {
        userId_groupId: { userId, groupId },
      },
      data: { lastReadAt: readAt },
    });

    return {
      groupId,
      messageId,
      userId,
      readAt: readAt.toISOString(),
    };
  }
}
