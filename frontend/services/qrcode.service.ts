import { QrCode } from "@app-types/qrcode";
import { api } from "@services/api.service";

export interface QrCodeDto {
  barId: string;
  productId: string;
  label?: string;
}

export const qrcodeService = {
  async createQrcode(qrcodeDto: QrCodeDto) {
    const { data } = await api.post<QrCode>("/qrcodes", qrcodeDto);
    return data;
  },

  async getMyQrcodes() {
    const { data } = await api.get<QrCode[]>("/qrcodes/me");
    return data;
  },

  async deleteQrcode(id: string) {
    return api.delete<void>(`/qrcodes/${id}`);
  },
};
