import { UserRole } from "@prisma/client";

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
  barId?: string;
};
