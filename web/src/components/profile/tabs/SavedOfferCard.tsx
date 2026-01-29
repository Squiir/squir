import { Card } from "@/components/ui/card";
import type { Offer } from "@/types/offer";
import { Wine } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  offer: Pick<
    Offer,
    | "id"
    | "name"
    | "squirPrice"
    | "validUntil"
    | "imageUrl"
    | "bar"
    | "originalPrice"
    | "description"
  > & {
    venueName: string;
    venueAddress: string;
    venueArrondissement: number;
  };
}

export function SavedOfferCard({ offer }: Props) {
  const navigate = useNavigate();
  const hasDiscount = offer.squirPrice < offer.originalPrice;

  return (
    <Card
      className="group relative overflow-hidden flex p-4 gap-4 border-none bg-card hover:bg-card/80 transition-all cursor-pointer hover:border-primary/50 hover:ring-1 hover:ring-primary/50 shadow-md"
      onClick={() => navigate(`/offers/${offer.id}`)}
    >
      <div className="w-24 h-24 shrink-0 bg-muted/20 rounded-xl overflow-hidden">
        {offer.imageUrl ? (
          <img
            src={offer.imageUrl}
            alt={offer.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Wine className="w-8 h-8 text-muted-foreground/50" />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1">
          <h3 className="text-lg font-bold leading-none group-hover:text-primary transition-colors text-foreground truncate">
            {offer.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{offer.description}</p>
        </div>

        <div className="space-y-2 mt-2">
          <p className="text-xs text-muted-foreground/80 flex items-center gap-1.5 truncate">
            <span className="font-medium text-foreground/80">{offer.venueName}</span>
            <span className="w-1 h-1 bg-muted-foreground/40 rounded-full shrink-0" />
            <span className="truncate">
              {offer.venueAddress} {offer.venueArrondissement}e
            </span>
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                {offer.squirPrice.toFixed(2)} €
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
                  {offer.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
