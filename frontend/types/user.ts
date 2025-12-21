import type { Qrcode } from "./qrcode";

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  status?: string;
  loyaltyPoints: number;

  qrCodes: Qrcode[];

  refreshToken?: string;

  createdAt: string;
  updatedAt: string;
}
