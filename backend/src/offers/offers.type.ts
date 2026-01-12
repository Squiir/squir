import { Offer } from "@prisma/client";

export type OfferWithDistance = Offer & {
  distance?: number;
};
