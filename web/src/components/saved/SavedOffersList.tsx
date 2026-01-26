import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Offer } from "@/types/offer";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface SavedOffersListProps {
  offers: (Pick<
    Offer,
    "id" | "name" | "squirPrice" | "validUntil" | "imageUrl" | "barId" | "originalPrice"
  > & {
    venueName: string;
  })[];
  isLoading: boolean;
  onToggleOffer: (id: string) => void;
}

export function SavedOffersList({ offers, isLoading, onToggleOffer }: SavedOffersListProps) {
  if (isLoading) {
    return <div className="p-4 text-center text-sm text-muted-foreground">Chargement...</div>;
  }

  if (offers.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">Aucune offre sauvegardée</div>
    );
  }

  return (
    <div className="grid gap-0">
      {offers.map((offer) => {
        const hasPromotion = offer.originalPrice > offer.squirPrice;
        return (
          <Link
            key={offer.id}
            to={`/bar/${offer.barId}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b last:border-0 group"
          >
            <div className="flex flex-col gap-1 overflow-hidden flex-1 mr-2">
              <span className="font-semibold text-sm truncate">{offer.name}</span>
              <span className="text-xs text-muted-foreground truncate">À {offer.venueName}</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end">
                {hasPromotion && (
                  <span className="text-xs text-muted-foreground line-through decoration-destructive/60">
                    {offer.originalPrice}€
                  </span>
                )}
                <span
                  className={cn(
                    "font-bold text-sm whitespace-nowrap",
                    hasPromotion ? "text-primary" : "text-foreground",
                  )}
                >
                  {offer.squirPrice}€
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-yellow-500 hover:text-yellow-600 hover:bg-transparent shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleOffer(offer.id);
                }}
              >
                <Star className="w-5 h-5 fill-yellow-500" />
              </Button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
