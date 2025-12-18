import {
  Injectable,
  ConflictException,
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
      where: { OR: [{ userId }, { friendId: userId }] },
    });
    await this.prisma.groupMember.deleteMany({ where: { userId } });

    await this.prisma.user.delete({ where: { id: userId } });
    return { ok: true };
  }

  async updateUser(
    userId: string,
    avatarUrl?: string,
    status?: string,
    username?: string,
  ) {
    const updates = {};
    if (avatarUrl !== undefined) updates["avatarUrl"] = avatarUrl;
    if (status !== undefined) updates["status"] = status;
    if (username !== undefined) {
      const existing = await this.prisma.user.findUnique({
        where: { username },
      });
      if (existing) throw new ConflictException("Username already used");
      updates["username"] = username;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updates,
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
