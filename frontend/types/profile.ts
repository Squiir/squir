import type { QRCode } from "./qrcode";

export type ProfileHeaderProps = {
  username: string;
  avatarUrl?: string | null;
  status?: string | null;
};

export type QRCodeCarouselProps = {
  qrCodes: QRCode[];
};
