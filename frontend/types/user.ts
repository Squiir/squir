import type { QrCode } from "@app-types/qrcode";

export interface User {
	id: string;
	email: string;
	username: string;
	avatarUrl?: string;
	status?: string;
	loyaltyPoints: number;

	qrCodes: QrCode[];

	refreshToken?: string;

	createdAt: string;
	updatedAt: string;
}
