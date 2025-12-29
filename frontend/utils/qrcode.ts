import type { QrCode } from "@app-types/qrcode";

export type ParsedQrLabel = {
	barName?: string;
	offerName?: string;
	priceText?: string;
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

export function formatPrice(price?: number) {
	if (typeof price !== "number") return null;
	return `${price.toFixed(2)} €`;
}
