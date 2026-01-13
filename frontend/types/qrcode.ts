// QR Code types
export interface QrCode {
	id: string;
	label: string;
	used: boolean;
	userId: string;
	offerId: string;
	offer?: {
		id: string;
		barId: string;
		bar?: {
			id: string;
			name: string;
		};
	};
	consumedAt?: string; // ISO date string, present only if consumed
	createdAt: string;
	updatedAt: string;
	url?: string; // QR code image URL
	value?: string; // squir://redeem?qr=...
}
