import type { QrCode } from "@app-types/qrcode";

export type ParsedQrLabel = {
	barName?: string;
	offerName?: string;
	priceText?: string;
};

/**
 * Grouped QR codes by offer
 */
export type QrCodeGroup = {
	offerId: string;
	qrCodes: QrCode[];
	availableCount: number;
	usedCount: number;
	totalCount: number;
	representativeQr: QrCode; // First QR to get offer details
};

/**
 * Parse QR code information from QrCode object
 * Extracts bar name, offer name, and price from the label
 * @param qrCode - QR code object to parse
 * @returns Parsed QR code information
 */
export function parseQrLabel(qrCode?: QrCode): ParsedQrLabel {
	if (!qrCode?.label) return {};

	const label = qrCode.label;

	const parts = label
		.split("•")
		.map((s) => s.trim())
		.filter(Boolean);

	const barName = parts[0];
	const offerName = parts[1];
	const pricePart = parts.find((p) => /€/.test(p));

	return {
		barName,
		offerName,
		priceText: pricePart,
	};
}

/**
 * Group QR codes by their offer ID
 * Returns one group per unique offer, with counts
 */
export function groupQrCodesByOffer(qrCodes: QrCode[]): QrCodeGroup[] {
	const groups = new Map<string, QrCode[]>();

	// Group by offerId
	for (const qr of qrCodes) {
		const key = qr.offerId;
		const existing = groups.get(key) || [];
		existing.push(qr);
		groups.set(key, existing);
	}

	// Convert to array with counts
	return Array.from(groups.entries()).map(([offerId, qrs]) => {
		const availableCount = qrs.filter((q) => !q.used).length;
		const usedCount = qrs.filter((q) => q.used).length;

		return {
			offerId,
			qrCodes: qrs,
			availableCount,
			usedCount,
			totalCount: qrs.length,
			representativeQr: qrs[0],
		};
	});
}
