import type { QRCode } from "@types/qrcode";

export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
  status?: string | null;
  loyaltyPoints: number;
  qrCodes: QRCode[];
};
