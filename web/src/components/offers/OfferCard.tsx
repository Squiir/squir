import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useDeleteOffer } from "@/hooks/offers/use-offers";
import type { Offer } from "@/types/offer";
import { Calendar, Edit2, Package, Tag, Trash2 } from "lucide-react";
import { useState } from "react";

interface OfferCardProps {
  offer: Offer;
  onEdit?: (offer: Offer) => void;
}

export function OfferCard({ offer, onEdit }: OfferCardProps) {
  const deleteOffer = useDeleteOffer();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) return;

    setIsDeleting(true);
    try {
      await deleteOffer.mutateAsync(offer.id);
    } catch (error) {
      console.error("Failed to delete offer:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const discount = Math.round(
    ((offer.originalPrice - offer.squirPrice) / offer.originalPrice) * 100,
  );

  const hasDiscount = discount > 0;

  const isExpired = offer.validUntil ? new Date(offer.validUntil) < new Date() : false;

  const isLowStock = offer.stock && offer.stock < 10;

  return (
    <Card className={isExpired ? "opacity-60" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-1">{offer.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-primary">
                {offer.squirPrice.toFixed(2)}€
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {offer.originalPrice.toFixed(2)}€
                  </span>
                  <Badge variant="destructive" className="ml-auto">
                    -{discount}%
                  </Badge>
                </>
              )}
            </div>
          </div>
          {offer.imageUrl && (
            <img src={offer.imageUrl} alt={offer.name} className="w-16 h-16 object-cover rounded" />
          )}
        </div>
      </CardHeader>

      <CardContent className="py-3 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Package className="w-4 h-4 text-muted-foreground" />
          {offer.stock !== null && offer.stock !== undefined ? (
            <span className={isLowStock ? "text-orange-600 font-medium" : ""}>
              {offer.stock > 0 ? `${offer.stock} en stock` : "Rupture de stock"}
            </span>
          ) : (
            <span className="text-muted-foreground italic">Stock non défini</span>
          )}
        </div>

        {offer.validUntil && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className={isExpired ? "text-destructive" : ""}>
              {isExpired ? "Expiré" : "Valide jusqu'au"}{" "}
              {new Date(offer.validUntil).toLocaleDateString("fr-FR")}
            </span>
          </div>
        )}

        {offer.promotionRule && (
          <div className="flex items-center gap-2 text-sm">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">
              {offer.promotionRule.type === "BUY_X_GET_Y" &&
                `Achetez ${offer.promotionRule.buyQuantity}, obtenez ${offer.promotionRule.getQuantity}`}
              {offer.promotionRule.type === "PERCENTAGE_OFF" &&
                `${offer.promotionRule.percentageOff}% de réduction`}
              {offer.promotionRule.type === "FIXED_AMOUNT_OFF" &&
                `${offer.promotionRule.amountOff}€ de réduction`}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit?.(offer)}>
          <Edit2 className="w-4 h-4 mr-2" />
          Modifier
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
}
