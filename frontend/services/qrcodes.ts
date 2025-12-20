import { apiGet, apiPost } from "@services/api";

export type QRCodeDto = {
  id: string;
  value: string;
  imageUrl: string; // ex: "/qrcodes/<id>.png"
  barId: string;
  productId: string;
  label: string;
  used: boolean;
  createdAt: string;
};

export type GenerateQrInput = {
  barId: string;
  productId: string;
  label?: string;
};

export function generateQrCode(input: GenerateQrInput) {
  return apiPost<QRCodeDto>("/qrcodes/generate", input);
}

export function fetchMyQrCodes() {
  return apiGet<QRCodeDto[]>("/qrcodes");
}
