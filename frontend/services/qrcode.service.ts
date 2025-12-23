import { QrCode } from "@app-types/qrcode";
import { api } from "@services/api.service";

export interface QrCodeDto {
  barId: string;
  productId: string;
  label?: string;
}

export const qrCodeService = {
  async createQrCode(qrCodeDto: QrCodeDto) {
    const { data } = await api.post<QrCode>("/qrcodes", qrCodeDto);
    return data;
  },

  async getMyQrCodes() {
    const { data } = await api.get<QrCode[]>("/qrcodes/me");
    return data;
  },

  async deleteQrCode(id: string) {
    return api.delete<void>(`/qrcodes/${id}`);
  },
};
