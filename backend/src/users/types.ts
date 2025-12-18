import { Prisma } from "@prisma/client";

export type UserWithQrCodes = Prisma.UserGetPayload<{
  include: {
    qrCodes: true;
  };
}>;
