import type { Bar } from "@app-types/bar";
import type { QrCode } from "@app-types/qrcode";

export enum UserRole {
	ADMIN = "ADMIN",
	PROFESSIONAL = "PROFESSIONAL",
	CUSTOMER = "CUSTOMER",
}

export interface User {
	id: string;
	email: string;
	username: string;
	avatarUrl?: string;
	status?: string;
	loyaltyPoints: number;
	role: UserRole;

	qrCodes: QrCode[];
	bars?: Bar[];

	refreshToken?: string;

	createdAt: string;
	updatedAt: string;
}
