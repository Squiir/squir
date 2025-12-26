import {
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

  async create(userId: string, name: string, memberIds: string[]) {
    const group = await this.prisma.group.create({
      data: {
        name,
        members: {
          create: [
            { userId: userId },
            ...memberIds.map((id) => ({ userId: id })),
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

  // TODO : update member list
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

    return await this.prisma.groupMember.create({
      data: { userId, groupId },
    });
  }

  async leave(userId: string, groupId: string) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException("Group not found");

    return await this.prisma.groupMember.deleteMany({
      where: { userId, groupId },
    });
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
