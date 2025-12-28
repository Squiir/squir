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
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        status: true,
        loyaltyPoints: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        qrCodes: true,
        friends: true,
        groups: true,
        bars: true,
      },
    });
    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  /**
   * Get user with their owned bars (for PROFESSIONAL role)
   * @param userId - User ID
   * @returns User with bars array
   */
  async getUserWithBars(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        bars: { select: { id: true } },
      },
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async deleteMe(userId: string) {
    await this.prisma.qRCode.deleteMany({ where: { userId } });
    await this.prisma.friend.deleteMany({
      where: { OR: [{ userId }, { friendId: userId }] },
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
