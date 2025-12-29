import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new group with the creator as first member
   * @param userId - Creator's user ID
   * @param name - Group name
   * @returns Created group with members
   */
  async create(userId: string, name: string) {
    return this.prisma.group.create({
      data: {
        name,
        members: { create: [{ userId }] },
      },
      include: { members: true },
    });
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
      where: { groupId_userId: { groupId, userId } },
    });
    if (!member) throw new ForbiddenException("Not a member");

    return this.prisma.group.update({ where: { id: groupId }, data: { name } });
  }

  /**
   * Join an existing group
   * @param userId - User ID
   * @param groupId - Group ID
   * @returns Confirmation of joining
   * @throws NotFoundException if group not found
   */
  async join(userId: string, groupId: string) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException("Group not found");

    await this.prisma.groupMember
      .create({
        data: { userId, groupId },
      })
      .catch(() => null);

    return { ok: true };
  }

  /**
   * Leave a group
   * @param userId - User ID
   * @param groupId - Group ID
   * @returns Confirmation of leaving
   */
  async leave(userId: string, groupId: string) {
    await this.prisma.groupMember.deleteMany({ where: { userId, groupId } });
    return { ok: true };
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
}
