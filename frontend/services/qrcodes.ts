import { apiFetch } from "@services/api";

export type QRCodeDto = {
  id: string;
  value: string;
  imageUrl: string;
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
  return apiFetch<QRCodeDto>("/qrcodes/generate", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function fetchMyQrCodes() {
  return apiFetch<QRCodeDto[]>("/qrcodes");
}

export function deleteQrCode(qrId: string) {
  return apiFetch<any>(`/qrcodes/${qrId}`, {
    method: "DELETE",
  });
}