import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFavorites } from "@/hooks/user/use-favorites";
import type { Bar } from "@/types/bar";
import clsx from "clsx";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OfferCardProps {
  offerOpen: boolean;
  setOfferOpen: (open: boolean) => void;
  selectedBar: Bar | null | undefined;
}

export function OfferCard({
  offerOpen,
  setOfferOpen,
  selectedBar,
}: OfferCardProps) {
  const navigate = useNavigate();
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
          <DialogDescription>Choisis une offre pour voir les détails</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {offers.map((offer) => {
            return (
              <div
                key={offer.id}
                className={clsx(
                  "p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-colors",
                  "bg-card border-border hover:bg-accent/50",
                  "text-card-foreground",
                )}
                onClick={() => {
                  navigate(`/offers/${offer.id}`);
                }}
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{offer.name}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={clsx(
                        "h-8 w-8 -mt-1 -mr-2 transition-colors",
                        isOfferSaved(offer.id)
                          ? "text-yellow-400 fill-yellow-400 hover:text-yellow-500"
                          : "text-muted-foreground hover:text-foreground",
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
                    <p className="text-sm text-muted-foreground">{offer.squirPrice} €</p>
                  )}
                </div>
              </div>
            );
          })}
          {offers.length === 0 && (
            <p className="text-center text-gray-500">Aucune offre disponible.</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="secondary" onClick={() => setOfferOpen(false)} className="ml-auto">
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
