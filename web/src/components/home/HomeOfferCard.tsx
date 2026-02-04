import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/user/use-favorites";
import type { Offer } from "@/types/offer";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Bookmark, Wine } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeOfferCardProps {
  offer: Offer;
}

export function HomeOfferCard({ offer }: HomeOfferCardProps) {
  const navigate = useNavigate();
  const { toggleOffer, isOfferSaved } = useFavorites();
  const dateLabel = offer.validUntil
    ? format(new Date(offer.validUntil), "EEE d MMM", { locale: fr })
    : "Aujourd'hui";

  const isSaved = isOfferSaved(offer.id);

  return (
    <div
      className="group cursor-pointer space-y-3 w-[240px] md:w-[280px]"
      onClick={() => navigate(`/offers/${offer.id}`)}
    >
      <div className="relative aspect-[4/5] md:aspect-square w-full overflow-hidden rounded-xl bg-muted">
        {offer.imageUrl ? (
          <img
            src={offer.imageUrl}
            alt={offer.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Wine className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        <div className="absolute top-3 left-3 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
          {dateLabel}
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-3 left-3 h-10 w-10 rounded-xl bg-background/90 text-foreground hover:bg-background/100 backdrop-blur-sm transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toggleOffer(offer.id);
          }}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}`} />
          <span className="sr-only">Sauvegarder</span>
        </Button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold leading-tight truncate text-lg flex-1">{offer.name}</h3>
          <div className="flex flex-col items-end shrink-0 text-primary">
            <span className="font-bold">{offer.squirPrice}€</span>
            {offer.originalPrice > offer.squirPrice && (
              <span className="text-xs line-through">{offer.originalPrice}€</span>
            )}
          </div>
        </div>

        {offer.description && (
          <p className="text-sm text-muted-foreground line-clamp-1">{offer.description}</p>
        )}

        <div className="pt-1">
          <p className="text-sm font-medium text-foreground truncate">{offer.bar.name}</p>
          <p className="text-xs text-muted-foreground truncate">{offer.bar.address}</p>
        </div>
      </div>
    </div>
  );
}
