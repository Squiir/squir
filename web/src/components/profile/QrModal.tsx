import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { parseQrLabel } from "@/lib/qrcode";
import type { QrCode } from "@/types/qrcode";

interface QrModalProps {
  qr?: QrCode;
  onClose: () => void;
}

export function QrModal({ qr, onClose }: QrModalProps) {
  if (!qr) return null;

  const { barName, offerName } = parseQrLabel(qr);
  const apiBase = import.meta.env.VITE_API_URL;
  const imageUrl = `${apiBase}/qrcodes/${qr.id}.png`;

  return (
    <Dialog open={!!qr} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-background to-muted">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-left">
                {offerName || qr.label}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1 text-left">
                {barName ? `Chez ${barName}` : ""}
              </p>
            </div>
            <Badge variant={qr.used ? "secondary" : "default"}>
              {qr.used ? "Utilisé" : "Ready"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm">
          <img
            src={imageUrl}
            alt="QR Code"
            className="w-64 h-64 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <p className="hidden text-sm text-gray-500 mt-2">QR Code ID: {qr.id}</p>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            {qr.used
              ? "Ce code a déjà été utilisé."
              : "Présentez ce QR Code au bar pour valider l'offre."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
