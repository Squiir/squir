import { CreateGroupDto } from "@groups/dto/groups.dto";
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
// import { SocialGateway } from "@social/social.gateway";

@Injectable()
export class GroupsService {
  constructor(
    private prisma: PrismaService,
    // private socket: SocialGateway,
  ) {}

  async create(userId: string, dto: CreateGroupDto) {
    const uniqueMemberIds = Array.from(new Set(dto.memberIds));

    if (uniqueMemberIds.length < 2) {
      throw new BadRequestException(
        "Un groupe doit contenir au moins 3 membres",
      );
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: uniqueMemberIds },
      },
      select: { id: true },
    });

    if (users.length !== uniqueMemberIds.length) {
      throw new BadRequestException(
        "Un ou plusieurs utilisateurs sont invalides",
      );
    }
    const group = await this.prisma.group.create({
      data: {
        name: dto.name,
        members: {
          create: [
            { userId: userId },
            ...uniqueMemberIds.map((id) => ({ userId: id })),
          ],
        },
      },
      include: {
        members: {
          include: {
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
      },
    });

    // const creator = group.members.find((m) => m.userId === userId)!.user;

    for (const member of group.members) {
      if (member.userId === userId) continue;

      // this.socket.notifyGroupInvite(member.userId, {
      //   groupId: group.id,
      //   groupName: group.name,
      //   invitedBy: creator,
      // });
    }

    return group;
  }

  async addMember(actorId: string, groupId: string, memberIds: string[]) {
    const actor = await this.prisma.groupMember.findUnique({
      where: { userId_groupId: { userId: actorId, groupId } },
    });
    if (!actor) throw new ForbiddenException("Not a member");

    if (memberIds.includes(actorId)) {
      throw new BadRequestException("Impossible de s'ajouter soi-même");
    }

    const existingMembers = await this.prisma.groupMember.findMany({
      where: {
        groupId,
        userId: { in: memberIds },
      },
      select: { userId: true },
    });

    const existingIds = new Set(existingMembers.map((m) => m.userId));
    const newMemberIds = memberIds.filter((id) => !existingIds.has(id));

    if (newMemberIds.length === 0) {
      return { groupId, memberIds: [] };
    }

    const users = await this.prisma.user.findMany({
      where: { id: { in: newMemberIds } },
      select: { id: true },
    });

    if (users.length !== newMemberIds.length) {
      throw new BadRequestException(
        "Un ou plusieurs utilisateurs sont invalides",
      );
    }

    await this.prisma.groupMember.createMany({
      data: newMemberIds.map((id) => ({
        userId: id,
        groupId,
      })),
    });

    return {
      groupId,
      memberIds: newMemberIds,
    };
  }

  /**
   * Update group name (member only)
   * @param userId - User ID
   * @param groupId - Group ID
   * @param name - New group name
   * @returns Updated group
   * @throws ForbiddenException if user is not a member
   */
  async updateName(userId: string, groupId: string, name: string) {
    const member = await this.prisma.groupMember.findUnique({
      where: { userId_groupId: { groupId, userId } },
    });
    if (!member) throw new ForbiddenException("Not a member");

    return this.prisma.group.update({ where: { id: groupId }, data: { name } });
  }

  async leave(userId: string, groupId: string) {
    const member = await this.prisma.groupMember.findUnique({
      where: { userId_groupId: { userId, groupId } },
    });
    if (!member) throw new NotFoundException("Not a member");

    const memberCount = await this.prisma.groupMember.count({
      where: { groupId },
    });
    if (memberCount <= 2) {
      await this.prisma.group.delete({ where: { id: groupId } });
      return;
    } else {
      await this.prisma.groupMember.delete({
        where: { userId_groupId: { userId, groupId } },
      });
    }
  }

  /**
   * Get shareable group information
   * @param groupId - Group ID
   * @returns Group info with share URL
   * @throws NotFoundException if group not found
   */
  async share(groupId: string) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      select: { id: true, name: true },
    });
    if (!group) throw new NotFoundException("Group not found");

    return {
      groupId: group.id,
      name: group.name,
      shareUrl: `app://group/${group.id}`,
    };
  }

  async listUserGroups(userId: string) {
    const groups = await this.prisma.group.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
        members: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return groups.map((group) => ({
      id: group.id,
      name: group.name,
      members: group.members.map((member) => ({
        id: member.user.id,
        username: member.user.username,
        avatarUrl: member.user.avatarUrl ?? null,
      })),
    }));
  }
}
