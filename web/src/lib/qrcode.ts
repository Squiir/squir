import type { QrCode } from "@/types/qrcode";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function parseQrLabel(qr: QrCode) {
  if (qr.offer && qr.bar) {
    return {
      barName: qr.bar.name,
      offerName: qr.offer.name,
      priceText: formatPrice(qr.offer.price),
    };
  }

  const parts = qr.label?.split(" • ") ?? [];
  const barName = parts[0] || "Bar inconnu";
  const offerName = parts[1] || "Offre inconnue";
  const priceText = parts[2] || "";

  return {
    barName,
    offerName,
    priceText,
  };
}
