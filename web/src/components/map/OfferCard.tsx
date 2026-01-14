import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Bar } from "@/types/bar";
import type { Offer } from "@/types/offer";
import type { QrCode } from "@/types/qrcode";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface OfferCardProps {
  offerOpen: boolean;
  setOfferOpen: (open: boolean) => void;
  selectedBar: Bar | null | undefined;
  qrcodes: QrCode[] | null;
  onSelectOffer: (offer: Offer) => void;
  isCreateQrCodePending: boolean;
  isGetMyQrCodesPending: boolean;
}

export function OfferCard({
  offerOpen,
  setOfferOpen,
  selectedBar,
  qrcodes,
  onSelectOffer,
  isCreateQrCodePending,
  isGetMyQrCodesPending,
}: OfferCardProps) {
  const offers = selectedBar?.offers ?? [];

  return (
    <Dialog open={offerOpen} onOpenChange={setOfferOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedBar?.name ?? "Offres"}</DialogTitle>
          <DialogDescription>Choisis une offre pour générer le QR code</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {offers.map((offer) => {
            const alreadyHas =
              qrcodes?.some((qr) => qr.barId === selectedBar?.id && qr.offerId === offer.id) ??
              false;

            return (
              <div
                key={offer.id}
                className={clsx(
                  "p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-colors",
                  alreadyHas
                    ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "bg-blue-50 border-blue-200 hover:bg-blue-100",
                  isCreateQrCodePending && "opacity-50 pointer-events-none",
                )}
                onClick={() => {
                  if (alreadyHas || isCreateQrCodePending) return;
                  if (!selectedBar) return;
                  onSelectOffer(offer);
                }}
              >
                <div>
                  <h4 className="font-semibold">{offer.name}</h4>
                  {typeof offer.price === "number" && (
                    <p className="text-sm text-gray-500">{offer.price} €</p>
                  )}
                </div>
                {alreadyHas && (
                  <span className="text-xs font-medium text-gray-500">Déjà en stock</span>
                )}
              </div>
            );
          })}
          {offers.length === 0 && (
            <p className="text-center text-gray-500">Aucune offre disponible.</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          {(isCreateQrCodePending || isGetMyQrCodesPending) && (
            <div className="flex items-center text-sm text-gray-500">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isCreateQrCodePending ? "Génération..." : "Chargement..."}
            </div>
          )}
          <Button variant="secondary" onClick={() => setOfferOpen(false)} className="ml-auto">
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
