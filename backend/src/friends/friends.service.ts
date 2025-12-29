import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Add a friend connection (bidirectional)
   * @param userId - User ID
   * @param friendId - Friend's user ID
   * @returns Confirmation of friend addition
   * @throws BadRequestException if trying to add yourself as friend
   */
  async add(userId: string, friendId: string) {
    if (userId === friendId)
      throw new BadRequestException("Cannot add yourself");

    await this.prisma.friend.createMany({
      data: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
      skipDuplicates: true,
    });

    return { ok: true };
  }

  /**
   * Remove a friend connection (bidirectional)
   * @param userId - User ID
   * @param friendId - Friend's user ID
   * @returns Confirmation of friend removal
   */
  async remove(userId: string, friendId: string) {
    await this.prisma.friend.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
    return { ok: true };
  }
}
