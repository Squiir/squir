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

  /**
   * Get current user profile with related data
   * @param userId - User ID
   * @returns User profile with QR codes, friends, groups, and bar
   */
  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        qrCodes: true,
        groupMemberships: true,
        bar: true,
      },
    });
    if (!user) throw new NotFoundException("User not found");

    const { password: _password, ...userWithoutPassword } = user;
    void _password;

    return userWithoutPassword;
  }

  /**
   * Get user with their owned bar (for PROFESSIONAL role)
   * @param userId - User ID
   * @returns User with bar
   */
  async getUserWithBars(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        bar: { select: { id: true } },
      },
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  /**
   * Delete current user account and all related data
   * @param userId - User ID
   * @returns Confirmation of deletion
   */
  async deleteMe(userId: string) {
    await this.prisma.qRCode.deleteMany({ where: { userId } });
    await this.prisma.friend.deleteMany({
      where: { OR: [{ requesterId: userId }, { receiverId: userId }] },
    });
    await this.prisma.groupMember.deleteMany({ where: { userId } });

    await this.prisma.user.delete({ where: { id: userId } });
    return { ok: true };
  }

  /**
   * Update user avatar URL
   * @param userId - User ID
   * @param avatarUrl - New avatar URL
   * @returns Updated user profile
   */
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

  /**
   * Update user status message
   * @param userId - User ID
   * @param status - New status message
   * @returns Updated user profile
   */
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

  /**
   * Update username (must be unique)
   * @param userId - User ID
   * @param username - New username
   * @returns Updated user profile
   * @throws ConflictException if username already exists
   */
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

  /**
   * Update user password
   * @param userId - User ID
   * @param oldPassword - Current password for verification
   * @param newPassword - New password to set
   * @returns Confirmation of password change
   * @throws UnauthorizedException if old password is incorrect
   */
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

  /**
   * Get user profile by username for sharing
   * @param username - Username to look up
   * @returns User public profile with share URL
   * @throws NotFoundException if user not found
   */
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
