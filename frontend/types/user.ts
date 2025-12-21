import type { QRCode } from "./qrcode";

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string | null;
  status?: string | null;
  loyaltyPoints: number;
  qrCodes: QRCode[];
};
