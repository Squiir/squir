export interface PromotionRule {
  id: string;
  type: "BUY_X_GET_Y" | "PERCENTAGE_OFF" | "FIXED_AMOUNT_OFF" | undefined;
  buyQuantity?: number;
  getQuantity?: number;
  percentageOff?: number;
  amountOff?: number;
  offerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  name: string;
  originalPrice: number;
  squirPrice: number;
  imageUrl?: string;
  stock: number;
  validUntil?: string;
  promotionRule?: Partial<PromotionRule>;
  barId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOfferInput {
  name: string;
  originalPrice: number;
  imageUrl?: string;
  stock?: number;
  validUntil?: string;
  promotionRule?: Partial<PromotionRule>;
  barId: string;
}

export interface UpdateOfferInput extends Omit<
  Partial<CreateOfferInput>,
  "stock" | "promotionRule"
> {
  stock?: number | null;
  promotionRule?: Partial<PromotionRule> | null;
}
