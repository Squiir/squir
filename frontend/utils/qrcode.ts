export type ParsedQrLabel = {
  barName?: string;
  offerName?: string;
  priceText?: string;
};

export function parseQrLabel(label?: string): ParsedQrLabel {
  if (!label) return {};

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