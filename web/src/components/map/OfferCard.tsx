import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFavorites } from "@/hooks/useFavorites";
import type { Bar } from "@/types/bar";
import type { Offer } from "@/types/offer";
import type { QrCode } from "@/types/qrcode";
import clsx from "clsx";
import { Loader2, Star } from "lucide-react";

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
  const { isOfferSaved, toggleOffer, isVenueFavorite, toggleVenue } = useFavorites();

  return (
    <Dialog open={offerOpen} onOpenChange={setOfferOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between pr-8">
            <DialogTitle>{selectedBar?.name ?? "Offres"}</DialogTitle>
            {selectedBar && (
              <Button
                variant="ghost"
                size="icon"
                className={clsx(
                  "hover:text-yellow-400 transition-colors",
                  isVenueFavorite(selectedBar.id)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400",
                )}
                onClick={() => toggleVenue(selectedBar.id)}
              >
                <Star
                  className={clsx("h-5 w-5", isVenueFavorite(selectedBar.id) && "fill-current")}
                />
              </Button>
            )}
          </div>
          <DialogDescription>Choisis une offre pour générer le QR code</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {offers.map((offer) => {
            const alreadyHas =
              qrcodes?.some((qr) => qr.bar?.id === selectedBar?.id && qr.offerId === offer.id) ??
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
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{offer.name}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={clsx(
                        "h-8 w-8 -mt-1 -mr-2 hover:text-yellow-400 transition-colors",
                        isOfferSaved(offer.id)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400",
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOffer(offer.id);
                      }}
                    >
                      <Star className={clsx("h-5 w-5", isOfferSaved(offer.id) && "fill-current")} />
                    </Button>
                  </div>
                  {typeof offer.squirPrice === "number" && (
                    <p className="text-sm text-gray-500">{offer.squirPrice} €</p>
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
