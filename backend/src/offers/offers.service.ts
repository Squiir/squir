import { AzureStorageService } from "@azure-storage/azure-storage.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOfferDto } from "@offers/dto/create-offer.dto";
import { OfferParamsDto } from "@offers/dto/offers.dto";
import { UpdateOfferDto } from "@offers/dto/update-offer.dto";
import { ExtendedOfferWithParams } from "@offers/offers.type";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import { parseValidUntil } from "@utils/date";
import { haversineDistance } from "@utils/distance";

@Injectable()
export class OffersService {
  constructor(
    private prisma: PrismaService,
    private azureStorageService: AzureStorageService,
  ) {}

  /**
   * Create a new offer
   * @param dto - Offer creation data
   * @returns Created offer
   */
  async create(dto: CreateOfferDto) {
    const { promotionRule, validUntil, ...offerData } = dto;

    let squirPrice = offerData.originalPrice;

    if (promotionRule) {
      if (
        promotionRule.type === "PERCENTAGE_OFF" &&
        promotionRule.percentageOff
      ) {
        squirPrice =
          offerData.originalPrice * (1 - promotionRule.percentageOff / 100);
      } else if (
        promotionRule.type === "FIXED_AMOUNT_OFF" &&
        promotionRule.amountOff
      ) {
        squirPrice = Math.max(
          0,
          offerData.originalPrice - promotionRule.amountOff,
        );
      }
    }

    const validUntilDate = parseValidUntil(validUntil);

    return this.prisma.offer.create({
      data: {
        ...offerData,
        stock: offerData.stock,
        squirPrice,
        validUntil: validUntilDate,
        promotionRule: promotionRule
          ? {
              create: promotionRule,
            }
          : undefined,
      },
      include: {
        bar: true,
        promotionRule: true,
      },
    });
  }

  /**
   * Update an existing offer
   * @param id - Offer ID
   * @param dto - Offer update data
   * @returns Updated offer
   */
  async update(id: string, dto: UpdateOfferDto) {
    const existingOffer = await this.findOne(id);

    const { promotionRule, ...offerData } = dto;

    if (
      offerData.imageUrl !== undefined &&
      existingOffer.imageUrl &&
      offerData.imageUrl !== existingOffer.imageUrl
    ) {
      await this.azureStorageService.deleteFile(existingOffer.imageUrl);
    }

    const filteredData = Object.fromEntries(
      Object.entries(offerData).filter(([_, value]) => value !== undefined),
    );

    let squirPrice = existingOffer.squirPrice;
    const effectiveOriginalPrice =
      typeof offerData.originalPrice === "number"
        ? offerData.originalPrice
        : existingOffer.originalPrice;

    if (promotionRule === null) {
      squirPrice = effectiveOriginalPrice;
    } else if (promotionRule) {
      if (
        promotionRule.type === "PERCENTAGE_OFF" &&
        promotionRule.percentageOff
      ) {
        squirPrice =
          effectiveOriginalPrice * (1 - promotionRule.percentageOff / 100);
      } else if (
        promotionRule.type === "FIXED_AMOUNT_OFF" &&
        promotionRule.amountOff
      ) {
        squirPrice = Math.max(
          0,
          effectiveOriginalPrice - promotionRule.amountOff,
        );
      } else {
        squirPrice = effectiveOriginalPrice;
      }
    } else if (
      offerData.originalPrice !== undefined &&
      existingOffer.promotionRule
    ) {
      const currentRule = existingOffer.promotionRule;
      if (currentRule.type === "PERCENTAGE_OFF" && currentRule.percentageOff) {
        squirPrice =
          effectiveOriginalPrice * (1 - currentRule.percentageOff / 100);
      } else if (
        currentRule.type === "FIXED_AMOUNT_OFF" &&
        currentRule.amountOff
      ) {
        squirPrice = Math.max(
          0,
          effectiveOriginalPrice - currentRule.amountOff,
        );
      } else {
        squirPrice = effectiveOriginalPrice;
      }
    } else if (offerData.originalPrice !== undefined) {
      squirPrice = effectiveOriginalPrice;
    }

    let promotionRuleUpdate:
      | Prisma.PromotionRuleUpdateOneWithoutOfferNestedInput
      | undefined = undefined;
    if (promotionRule === null) {
      if (existingOffer.promotionRule) {
        promotionRuleUpdate = {
          delete: true,
        };
      }
    } else if (promotionRule) {
      promotionRuleUpdate = {
        upsert: {
          create: promotionRule,
          update: promotionRule,
        },
      };
    }

    return this.prisma.offer.update({
      where: { id },
      data: {
        ...filteredData,
        squirPrice,
        promotionRule: promotionRuleUpdate,
      },
      include: {
        bar: true,
        promotionRule: true,
      },
    });
  }

  /**
   * Delete an offer
   * @param id - Offer ID
   */
  async delete(id: string) {
    const offer = await this.findOne(id);

    if (offer.imageUrl) {
      await this.azureStorageService.deleteFile(offer.imageUrl);
    }

    await this.prisma.offer.delete({
      where: { id },
    });

    return { message: "Offer deleted successfully" };
  }

  /**
   * Get all offers for a specific bar
   * @param barId - Bar ID
   * @returns List of offers for the bar
   */
  async findByBar(barId: string) {
    return this.prisma.offer.findMany({
      where: { barId },
      include: {
        bar: true,
        promotionRule: true,
        qrCodes: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Get all offers
   * @param params - Offer parameters
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
      limit,
    } = params;

    // DB query
    const offers = await this.prisma.offer.findMany({
      include: { bar: true, qrCodes: true, promotionRule: true },
      take: limit,
    });

    // Distance calculation
    let results: ExtendedOfferWithParams[] = offers
      .map((offer) => {
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
      })
      .map((offer) => {
        return {
          ...offer,
          numberOfQrCodes: offer.qrCodes.length,
        };
      });

    // Distance filtering
    if (minDistance !== undefined || maxDistance !== undefined) {
      results = results.filter((o) => {
        if (o.distance === undefined) return false;
        const minOk =
          minDistance !== undefined ? o.distance >= minDistance : true;
        const maxOk =
          maxDistance !== undefined ? o.distance <= maxDistance : true;
        return minOk && maxOk;
      });
    }

    // Final sorting
    if (sortBy) {
      results.sort((a, b) => {
        const valA = a[sortBy as keyof ExtendedOfferWithParams];
        const valB = b[sortBy as keyof ExtendedOfferWithParams];

        if (valA === undefined || valB === undefined) return 0;
        if (valA === null || valB === null) return 0;
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
      include: {
        bar: true,
        promotionRule: true,
      },
    });

    if (!offer) throw new NotFoundException("Offer not found");

    return offer;
  }
}
