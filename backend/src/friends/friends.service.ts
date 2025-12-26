import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { FriendStatus } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
// import { SocialGateway } from "@social/social.gateway";

@Injectable()
export class FriendsService {
  constructor(
    private prisma: PrismaService,
    // private socket: SocialGateway,
  ) {}

  async sendRequest(requesterId: string, receiverId: string) {
    if (requesterId === receiverId) {
      throw new BadRequestException("Cannot add yourself");
    }

    const request = await this.prisma.friend.create({
      data: {
        requesterId,
        receiverId,
        status: FriendStatus.PENDING,
      },
      include: {
        requester: {
          select: { id: true, username: true, avatarUrl: true },
        },
      },
    });

    // this.socket.notifyFriendRequest(receiverId, request.requester);

    return request;
  }

  async respondToRequest(
    userId: string,
    friendRequestId: string,
    status: FriendStatus,
  ) {
    const request = await this.prisma.friend.findUnique({
      where: { id: friendRequestId },
    });

    if (!request || request.receiverId !== userId) {
      throw new NotFoundException("Friend request not found");
    }

    const updatedRequest = await this.prisma.friend.update({
      where: { id: request.id },
      data: { status },
      include: {
        requester: { select: { id: true, username: true, avatarUrl: true } },
        receiver: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    if (status === FriendStatus.ACCEPTED) {
      // this.socket.notifyFriendAccepted(
      //   updatedRequest.requesterId,
      //   updatedRequest.receiver,
      // );
    }

    return updatedRequest;
  }

  async listPending(userId: string) {
    const pendingRequests = await this.prisma.friend.findMany({
      where: {
        receiverId: userId,
        status: FriendStatus.PENDING,
      },
      include: {
        requester: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return pendingRequests.map((request) => {
      return { ...request.requester, id: request.id };
    });
  }

  async listFriends(userId: string) {
    const friends = await this.prisma.friend.findMany({
      where: {
        status: FriendStatus.ACCEPTED,
        OR: [{ requesterId: userId }, { receiverId: userId }],
      },
      include: {
        requester: { select: { id: true, username: true, avatarUrl: true } },
        receiver: { select: { id: true, username: true, avatarUrl: true } },
      },
    });

    return friends.map((friend) => {
      return friend.requesterId === userId ? friend.receiver : friend.requester;
    });
  }

  async deleteFriend(userId: string, friendId: string) {
    const friendship = await this.prisma.friend.findFirst({
      where: {
        status: FriendStatus.ACCEPTED,
        OR: [
          { requesterId: userId, receiverId: friendId },
          { requesterId: friendId, receiverId: userId },
        ],
      },
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    return this.prisma.friend.update({
      where: { id: friendship.id },
      data: { status: FriendStatus.REJECTED },
    });
  }

  async searchUsers(userId: string, query: string) {
    const q = query.trim();
    if (!q) return [];

    const relations = await this.prisma.friend.findMany({
      where: {
        OR: [{ requesterId: userId }, { receiverId: userId }],
      },
      select: {
        requesterId: true,
        receiverId: true,
        status: true,
      },
    });

    const relationMap = new Map<string, { status: FriendStatus }>();

    for (const r of relations) {
      const otherUserId =
        r.requesterId === userId ? r.receiverId : r.requesterId;

      relationMap.set(otherUserId, {
        status: r.status,
      });
    }

    const excludedUserIds = new Set<string>([userId]);

    for (const [otherUserId, rel] of relationMap.entries()) {
      if (rel.status === FriendStatus.ACCEPTED) {
        excludedUserIds.add(otherUserId);
      }
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          notIn: Array.from(excludedUserIds),
        },
        username: {
          contains: q,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        status: true,
      },
      take: 10,
      orderBy: {
        username: "asc",
      },
    });

    return users.map((user) => {
      const relation = relationMap.get(user.id);

      return {
        ...user,
        friendshipStatus: relation?.status ?? "NONE",
      };
    });
  }
}
