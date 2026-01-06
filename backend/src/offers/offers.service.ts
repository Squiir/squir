import { Injectable, NotFoundException } from "@nestjs/common";
import { OfferParamsDto } from "@offers/dto/offers.dto";
import { OfferWithDistance } from "@offers/offers.type";
import { PrismaService } from "@prisma/prisma.service";
import { haversineDistance } from "@utils/distance";

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all offers
   * @returns List of all offers
   */
  async findAll(params: OfferParamsDto = {}) {
    const {
      sortBy,
      orderBy = "asc",
      minDistance,
      maxDistance,
      latitude,
      longitude,
    } = params;

    // 1. Récupération DB (Sans filtres de prix)
    const offers = await this.prisma.offer.findMany({
      include: { bar: true },
    });

    // 2. Calcul des distances
    let results: OfferWithDistance[] = offers.map((offer) => {
      let distance: number | undefined;

      if (
        latitude !== undefined &&
        longitude !== undefined &&
        offer.bar.latitude !== undefined &&
        offer.bar.longitude !== undefined
      ) {
        distance = haversineDistance(
          latitude,
          longitude,
          offer.bar.latitude,
          offer.bar.longitude,
        );
      }

      return { ...offer, distance };
    });

    // 3. Filtrage par distance
    if (minDistance !== undefined || maxDistance !== undefined) {
      results = results.filter((o): o is OfferWithDistance => {
        if (o.distance === undefined) return false;
        const minOk =
          minDistance !== undefined ? o.distance >= minDistance : true;
        const maxOk =
          maxDistance !== undefined ? o.distance <= maxDistance : true;
        return minOk && maxOk;
      });
    }

    // 4. Tri final
    if (sortBy) {
      results.sort((a, b) => {
        const valA = a[sortBy as keyof OfferWithDistance];
        const valB = b[sortBy as keyof OfferWithDistance];

        if (valA === undefined || valB === undefined) return 0;
        if (valA < valB) return orderBy === "asc" ? -1 : 1;
        if (valA > valB) return orderBy === "asc" ? 1 : -1;
        return 0;
      });
    }

    return results;
  }

  /**
   * Get a specific offer by ID
   * @param id - Offer ID
   * @returns Offer
   * @throws NotFoundException if offer not found
   */
  async findOne(id: string) {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) throw new NotFoundException("Offer not found");

    return offer;
  }
}
