import { CreateEstablishmentDto } from "@bars/dto/create-establishment.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { StripeService } from "@stripe/stripe.service";

@Injectable()
export class BarsService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
  ) {}

  /**
   * Create a new bar with provided coordinates
   * @param dto - Bar creation data including manual coordinates
   * @returns Created bar
   */
  async create(dto: CreateEstablishmentDto) {
    return this.prisma.bar.create({
      data: {
        name: dto.name,
        address: dto.address,
        arrondissement: dto.arrondissement,
        latitude: dto.latitude,
        longitude: dto.longitude,
        color: "",
      },
    });
  }

  /**
   * Get all bars with their offers
   * @returns List of all bars ordered by arrondissement
   */
  async findAll() {
    return await this.prisma.bar.findMany({
      include: { offers: true },
      orderBy: { arrondissement: "asc" },
    });
  }

  /**
   * Get a specific bar by ID with its offers
   * @param id - Bar ID
   * @returns Bar with offers
   * @throws NotFoundException if bar not found
   */
  async findOne(id: string) {
    const bar = await this.prisma.bar.findUnique({
      where: { id },
      include: { offers: true },
    });

    if (!bar) throw new NotFoundException("Bar not found");

    return bar;
  }
  /**
   * Get dashboard statistics for a specific bar
   * @param barId - Bar ID
   * @returns Dashboard stats including daily revenue, scan counts, and popular offers
   */
  async getDashboardStats(barId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allConsumedQRs = await this.prisma.qRCode.findMany({
      where: {
        offer: { barId },
        consumedAt: { not: null },
      },
      include: {
        offer: true,
      },
    });

    const todayQRs = allConsumedQRs.filter((qr) => qr.consumedAt! >= today);

    const dailyRevenue = todayQRs.reduce(
      (sum, qr) => sum + qr.offer.squirPrice,
      0,
    );

    const offerCounts: Record<string, { name: string; count: number }> = {};
    allConsumedQRs.forEach((qr) => {
      if (!offerCounts[qr.offerId]) {
        offerCounts[qr.offerId] = { name: qr.offer.name, count: 0 };
      }
      offerCounts[qr.offerId].count++;
    });

    const mostPopularOffer =
      Object.values(offerCounts).sort((a, b) => b.count - a.count)[0] || null;

    const uniqueUsers = new Set(allConsumedQRs.map((qr) => qr.userId)).size;

    const revenueHistory: { date: string; revenue: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];

      const daysQRs = allConsumedQRs.filter((qr) => {
        const qrDate = qr.consumedAt!.toISOString().split("T")[0];
        return qrDate === dateString;
      });

      const revenue = daysQRs.reduce((sum, qr) => sum + qr.offer.squirPrice, 0);

      revenueHistory.push({
        date: dateString,
        revenue,
      });
    }

    return {
      dailyRevenue,
      scannedKnownCount: todayQRs.length,
      mostPopularOffer: mostPopularOffer ? mostPopularOffer.name : "Aucune",
      uniqueUsers,
      revenueHistory,
    };
  }

  async getStripeDashboardLink(barId: string) {
    return this.stripeService.createLoginLink(barId);
  }
}
