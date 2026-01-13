import type { Bar } from "@/types/bar";
import type { QrCode } from "@/types/qrcode";

export const UserRole = {
  ADMIN: "ADMIN",
  PROFESSIONAL: "PROFESSIONAL",
  CUSTOMER: "CUSTOMER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  status?: string;
  loyaltyPoints: number;
  role: UserRole;

  qrCodes: QrCode[];
  bars?: Bar[];

  refreshToken?: string;

  createdAt: string;
  updatedAt: string;
}
