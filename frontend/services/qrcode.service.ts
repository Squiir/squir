import { Qrcode } from "@app-types/qrcode";
import { api } from "@services/api.service";

export interface QrcodeDto {
  barId: string;
  productId: string;
  label?: string;
}

export const qrcodeService = {
  async createQrcode(qrcodeDto: QrcodeDto) {
    const { data } = await api.post<Qrcode>("/qrcodes", qrcodeDto);
    return data;
  },

  async getMyQrcodes() {
    const { data } = await api.get<Qrcode[]>("/qrcodes/me");
    return data;
  },

  async deleteQrcode(id: string) {
    return api.delete<void>(`/qrcodes/${id}`);
  },
};
