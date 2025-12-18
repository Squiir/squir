import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, name: string) {
    return this.prisma.group.create({
      data: {
        name,
        members: { create: [{ userId }] },
      },
      include: { members: true },
    });
  }

  async updateName(userId: string, groupId: string, name: string) {
    const member = await this.prisma.groupMember.findUnique({
      where: { userId_groupId: { userId, groupId } },
    });
    if (!member) throw new ForbiddenException("Not a member");

    return this.prisma.group.update({ where: { id: groupId }, data: { name } });
  }

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

  async leave(userId: string, groupId: string) {
    await this.prisma.groupMember.deleteMany({ where: { userId, groupId } });
    return { ok: true };
  }

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
