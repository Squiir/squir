import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/use-auth";
import { useFavorites } from "@/hooks/user/use-favorites";
import { cn } from "@/lib/utils";
import type { Offer } from "@/types/offer";
import { Calendar, Heart, Package, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerOfferCardProps {
  offer: Offer;
}

export function CustomerOfferCard({ offer }: CustomerOfferCardProps) {
  const navigate = useNavigate();
  const { isOfferSaved, toggleOffer } = useFavorites();
  const { isLoggedIn } = useAuth();

  const isExpired = offer.validUntil ? new Date(offer.validUntil) < new Date() : false;
  const isLowStock =
    offer.stock !== null && offer.stock !== undefined && offer.stock < 10 && offer.stock > 0;
  const isOutOfStock = offer.stock === 0;

  const discount =
    offer.originalPrice > 0
      ? Math.round(((offer.originalPrice - offer.squirPrice) / offer.originalPrice) * 100)
      : 0;
  const hasDiscount = discount > 0;

  const isFav = isOfferSaved(offer.id);

  const handleCardClick = () => {
    navigate(`/offers/${offer.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    toggleOffer(offer.id);
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-full overflow-hidden cursor-pointer transition-all hover:shadow-md",
        isExpired || isOutOfStock ? "opacity-60" : "",
      )}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {offer.imageUrl ? (
          <img
            src={offer.imageUrl}
            alt={offer.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
            <Package className="h-10 w-10 opacity-20" />
          </div>
        )}

        {hasDiscount && (
          <Badge variant="destructive" className="absolute top-2 left-2 z-10">
            -{discount}%
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full h-8 w-8"
          onClick={handleFavoriteClick}
          disabled={!isLoggedIn}
          title={!isLoggedIn ? "Connectez-vous pour ajouter aux favoris" : ""}
        >
          <Heart
            className={cn("h-4 w-4", isFav ? "fill-red-500 text-red-500" : "text-foreground")}
          />
        </Button>
      </div>

      <CardContent className="flex-1 p-3 space-y-2">
        <div>
          <h3 className="font-semibold text-base line-clamp-1">{offer.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-primary">{offer.squirPrice.toFixed(2)}€</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {offer.originalPrice.toFixed(2)}€
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          {offer.promotionRule && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Tag className="w-3.5 h-3.5" />
              <span className="line-clamp-1">
                {offer.promotionRule.type === "BUY_X_GET_Y" &&
                  `Achetez ${offer.promotionRule.buyQuantity}, obtenez ${offer.promotionRule.getQuantity}`}
                {offer.promotionRule.type === "PERCENTAGE_OFF" &&
                  `${offer.promotionRule.percentageOff}% de réduction`}
                {offer.promotionRule.type === "FIXED_AMOUNT_OFF" &&
                  `${offer.promotionRule.amountOff}€ de réduction`}
              </span>
            </div>
          )}

          {offer.validUntil && !isExpired && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Jusqu'au {new Date(offer.validUntil).toLocaleDateString("fr-FR")}</span>
            </div>
          )}

          {isExpired && (
            <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>Expiré</span>
            </div>
          )}

          {isOutOfStock ? (
            <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
              <Package className="w-3.5 h-3.5" />
              <span>Rupture de stock</span>
            </div>
          ) : isLowStock ? (
            <div className="flex items-center gap-1.5 text-xs text-orange-600 font-medium">
              <Package className="w-3.5 h-3.5" />
              <span>Plus que {offer.stock} !</span>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
