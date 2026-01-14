import { Prisma } from "@prisma/client";

export type ExtendedOfferWithParams = Prisma.OfferGetPayload<{
  include: { bar: true; qrCodes: true };
}> & {
  distance?: number;
  numberOfQrCodes?: number;
};
