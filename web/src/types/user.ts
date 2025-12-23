import type { QRcode } from "@/types/qrcode";

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  status?: string;
  loyaltyPoints: number;

  qrCodes: QRcode[];

  refreshToken?: string;

  createdAt: string;
  updatedAt: string;
}
