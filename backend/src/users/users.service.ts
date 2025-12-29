import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { qrCodes: true },
    });
    if (!user) throw new NotFoundException("User not found");

    const { password: _password, ...userWithoutPassword } = user;
    void _password;
    return userWithoutPassword;
  }

  async deleteMe(userId: string) {
    await this.prisma.qRCode.deleteMany({ where: { userId } });
    await this.prisma.friend.deleteMany({
      where: { OR: [{ requesterId: userId }, { receiverId: userId }] },
    });
    await this.prisma.groupMember.deleteMany({ where: { userId } });

    await this.prisma.user.delete({ where: { id: userId } });
    return { ok: true };
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        status: true,
        loyaltyPoints: true,
      },
    });
  }

  async updateStatus(userId: string, status: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { status },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        status: true,
        loyaltyPoints: true,
      },
    });
  }

  async updateUsername(userId: string, username: string) {
    const existing = await this.prisma.user.findUnique({ where: { username } });
    if (existing) throw new ConflictException("Username already used");

    return this.prisma.user.update({
      where: { id: userId },
      data: { username },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        status: true,
        loyaltyPoints: true,
      },
    });
  }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) throw new UnauthorizedException("Invalid password");

    const hashed = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { ok: true };
  }

  async shareByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { username: true, avatarUrl: true, status: true },
    });
    if (!user) throw new NotFoundException("User not found");

    return {
      ...user,
      shareUrl: `app://user/${user.username}`,
    };
  }
}
