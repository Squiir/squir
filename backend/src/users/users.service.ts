import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import * as bcrypt from "bcrypt";
import {
  UserWalletDto,
  WalletActiveItemDto,
  WalletHistoryItemDto,
} from "./dto/user-wallet.dto";
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
      shareUrl: `${process.env.FRONTEND_URL}/users/${user.username}/share`,
    };
  }

  /**
   * Toggle favorite venue (Bar) for a user
   * @param userId - User ID
   * @param barId - Bar ID
   * @returns Object identifying if it is now favorite
   */
  async toggleFavoriteVenue(userId: string, barId: string) {
    const existing = await this.prisma.userFavoriteVenue.findUnique({
      where: { userId_barId: { userId, barId } },
    });

    if (existing) {
      await this.prisma.userFavoriteVenue.delete({
        where: { userId_barId: { userId, barId } },
      });
      return { isFavorite: false };
    } else {
      await this.prisma.userFavoriteVenue.create({
        data: { userId, barId },
      });
      return { isFavorite: true };
    }
  }

  /**
   * Toggle saved offer (Wishlist) for a user
   * @param userId - User ID
   * @param offerId - Offer ID
   * @returns Object identifying if it is now saved
   */
  async toggleSavedOffer(userId: string, offerId: string) {
    const existing = await this.prisma.userSavedOffer.findUnique({
      where: { userId_offerId: { userId, offerId } },
    });

    if (existing) {
      await this.prisma.userSavedOffer.delete({
        where: { userId_offerId: { userId, offerId } },
      });
      return { isSaved: false };
    } else {
      await this.prisma.userSavedOffer.create({
        data: { userId, offerId },
      });
      return { isSaved: true };
    }
  }

  /**
   * Get user favorites and saved offers populated
   * @param userId - User ID
   * @returns Object with favoriteVenues and savedOffers
   */
  async getFavorites(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        userFavoriteVenues: {
          include: {
            bar: {
              select: {
                id: true,
                name: true,
                address: true,
                arrondissement: true,
              },
            },
          },
        },
        userSavedOffers: {
          include: {
            offer: {
              select: {
                id: true,
                name: true,
                squirPrice: true,
                originalPrice: true,
                validUntil: true,
                imageUrl: true,
                description: true,
                bar: {
                  select: {
                    name: true,
                    address: true,
                    arrondissement: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) throw new NotFoundException("User not found");

    const favoriteVenues = user.userFavoriteVenues.map((fv) => ({
      ...fv.bar,
    }));

    const savedOffers = user.userSavedOffers.map((so) => ({
      ...so.offer,
      venueName: so.offer.bar.name,
      venueAddress: so.offer.bar.address,
      venueArrondissement: so.offer.bar.arrondissement,
    }));

    return {
      favoriteVenues,
      savedOffers,
    };
  }

  /**
   * Get user wallet with active tickets and history
   * @param userId - User ID
   * @returns Object with active and history tickets
   */
  async getWallet(userId: string): Promise<UserWalletDto> {
    const qrCodes = await this.prisma.qRCode.findMany({
      where: { userId },
      include: {
        offer: {
          include: {
            bar: { select: { name: true, address: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    type QRCodeWithRelations = Prisma.QRCodeGetPayload<{
      include: {
        offer: {
          include: {
            bar: { select: { name: true; address: true } };
          };
        };
      };
    }>;

    const activeTickets: WalletActiveItemDto[] = [];
    const historyTickets: WalletHistoryItemDto[] = [];

    const activeGroups = new Map<
      string,
      {
        offer: QRCodeWithRelations["offer"];
        count: number;
        qrCodes: QRCodeWithRelations[];
      }
    >();

    for (const qr of qrCodes as QRCodeWithRelations[]) {
      if (qr.used || qr.consumedAt) {
        historyTickets.push({
          id: qr.id,
          offerName: qr.offer.name,
          offerDescription: qr.offer.description || undefined,
          offerImageUrl: qr.offer.imageUrl || undefined,
          squirPrice: qr.offer.squirPrice,
          barName: qr.offer.bar.name,
          barAddress: qr.offer.bar.address,
          usedAt: qr.consumedAt!,
          status: `Utilisé le ${qr.consumedAt ? new Date(qr.consumedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }) : "N/A"}`,
        });
      } else {
        if (!activeGroups.has(qr.offerId)) {
          activeGroups.set(qr.offerId, {
            offer: qr.offer,
            count: 0,
            qrCodes: [],
          });
        }
        const group = activeGroups.get(qr.offerId)!;
        group.count++;
        group.qrCodes.push(qr);
      }
    }

    for (const group of activeGroups.values()) {
      activeTickets.push({
        offerId: group.offer.id,
        offerName: group.offer.name,
        offerDescription: group.offer.description || undefined,
        offerImageUrl: group.offer.imageUrl || undefined,
        squirPrice: group.offer.squirPrice,
        barName: group.offer.bar.name,
        barAddress: group.offer.bar.address,
        quantity: group.count,
        qrCodes: group.qrCodes,
      });
    }

    historyTickets.sort((a, b) => {
      const dateA = a.usedAt ? new Date(a.usedAt).getTime() : 0;
      const dateB = b.usedAt ? new Date(b.usedAt).getTime() : 0;
      return dateB - dateA;
    });

    return {
      active: activeTickets,
      history: historyTickets,
    };
  }
}
