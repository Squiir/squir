import { QrCode } from "@app-types/qrcode";
import { api } from "@services/api.service";

export interface QrCodeDto {
	barId: string;
	offerId: string;
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

	async consumeQrCode(id: string) {
		const { data } = await api.post<{
			message: string;
			qrCode: QrCode;
		}>(`/qrcodes/${id}/consume`);
		return data;
	},

	async getHistory() {
		const { data } = await api.get<QrCode[]>("/qrcodes/history");
		return data;
	},
};
