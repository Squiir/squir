import { useGetMyQrCodes } from "@/hooks/qrcode/use-get-qr-codes";
import type { QrCode } from "@/types/qrcode";
import type { User } from "@/types/user";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { QrCard } from "./QrCard";
import { QrModal } from "./QrModal";

interface ProfileQrCodesProps {
  user?: User | null;
  isLoading?: boolean;
}

export function ProfileQrCodes({ user }: ProfileQrCodesProps) {
  const { data: qrcodes, isLoading, error } = useGetMyQrCodes();
  const [selectedQr, setSelectedQr] = useState<QrCode | undefined>();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Mes QR codes</h2>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Chargement...</span>
        </div>
      ) : error ? (
        <p className="text-destructive text-sm">Erreur de chargement des QR codes.</p>
      ) : !qrcodes || qrcodes.length === 0 ? (
        <div className="p-4 rounded-xl border border-dashed bg-muted/20 text-center">
          <p className="text-muted-foreground text-sm">Aucun QR code pour l'instant.</p>
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 scrollbar-none">
          {qrcodes.map((qr) => (
            <QrCard key={qr.id} qr={qr} onClick={() => setSelectedQr(qr)} />
          ))}
        </div>
      )}

      <QrModal qr={selectedQr} onClose={() => setSelectedQr(undefined)} />
    </div>
  );
}
