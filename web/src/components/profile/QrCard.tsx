import { Badge } from "@/components/ui/badge";
import { parseQrLabel } from "@/lib/qrcode";
import type { QrCode } from "@/types/qrcode";
import clsx from "clsx";

interface QrCardProps {
  qr: QrCode;
  onClick: () => void;
}

export function QrCard({ qr, onClick }: QrCardProps) {
  const { barName, offerName, priceText } = parseQrLabel(qr);

  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex-none w-[260px] rounded-2xl border p-4 cursor-pointer transition-colors",
        qr.used
          ? "border-muted bg-muted/20 opacity-70 hover:bg-muted/40"
          : "border-border bg-card hover:bg-accent/50 hover:border-accent",
      )}
    >
      <div className="flex flex-row items-start justify-between mb-4">
        <div className="flex-1 pr-2 overflow-hidden">
          <h3 className="font-extrabold text-foreground truncate" title={offerName}>
            {offerName || qr.label || "Offre"}
          </h3>
          <p className="text-muted-foreground text-xs mt-1 truncate" title={barName}>
            Chez {barName}
          </p>
        </div>
        <Badge variant={qr.used ? "secondary" : "green"}>{qr.used ? "Utilisé" : "Prêt"}</Badge>
      </div>

      <div className="space-y-1 mb-4">
        <p className="text-muted-foreground text-xs">
          {priceText ? `Prix: ${priceText}` : "Prix: —"}
        </p>
        <p className="text-muted-foreground text-xs">
          {qr.used ? "Statut: utilisé" : "Statut: disponible"}
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/10 p-2 text-center">
        <span className="text-muted-foreground text-xs font-medium">Afficher QR Code</span>
      </div>
    </div>
  );
}
