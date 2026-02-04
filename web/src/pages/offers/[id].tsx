import { OfferHostedByCard } from "@/components/offers/OfferHostedByCard";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { OfferDetailSkeleton } from "@/components/skeleton/OfferDetailSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/use-auth";
import { useOffer } from "@/hooks/offers/use-offer";
import { useCreateQrCode } from "@/hooks/qrcode/use-create-qr-code";
import { useFavorites } from "@/hooks/user/use-favorites";
import { cn } from "@/lib/utils";
import type { QrCodeDto } from "@/services/qrcode.service";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Bookmark, MapPin, Wine } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function OfferDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: offer, isLoading, error } = useOffer(id);
  const { toggleOffer, isOfferSaved } = useFavorites();
  const { mutate: createQrCode } = useCreateQrCode();
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isExpired = offer?.validUntil ? new Date(offer.validUntil) < new Date() : false;
  const isOutOfStock = (offer?.stock ?? 0) <= 0;
  const isAvailable = !isExpired && !isOutOfStock;

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      toast.info("Veuillez vous connecter pour ajouter aux favoris");
      return;
    }
    if (offer) {
      toggleOffer(offer.id);
    }
  };

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      toast.info("Veuillez vous connecter pour acheter cette offre");
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const onCreateQrCode = (qrCodeDto: QrCodeDto) => {
      if (!offer.bar.id) return;
      createQrCode(qrCodeDto, {
        onError: (err) => {
          console.error(err);
          toast.error("Erreur lors de la génération de votre Qr code");
        },
        onSuccess: () => {
          toast.success("Paiement réussi !");
          navigate("/wallet");
        }
      });
    };

  if (isLoading) {
    return <OfferDetailSkeleton />;
  }

  if (error || !offer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-4">
        <h2 className="text-xl font-semibold">Offre introuvable</h2>
        <Button onClick={() => navigate(-1)}>Retour</Button>
      </div>
    );
  }

  const discountPercentage = offer.originalPrice > 0
  ? Math.round(((offer.originalPrice - offer.squirPrice) / offer.originalPrice) * 100)
  : 0;

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b sm:hidden">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <span className="font-semibold truncate max-w-[200px]">{offer.name}</span>
        <div className="w-10" />
      </div>

      <div className="max-w-3xl mx-auto sm:pt-8 w-full">
        <div className="hidden sm:flex items-center gap-4 mb-6 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Détails de l'offre</h1>
        </div>

        <div className="relative aspect-video w-full overflow-hidden sm:rounded-xl bg-muted">
          {!imageLoaded && (
            <div className="w-full h-full flex items-center justify-center">
              <Wine className="w-16 h-16 text-muted-foreground/50" />
            </div>
          )}
          {offer.imageUrl && (
            <img
              src={offer.imageUrl}
              alt={offer.name}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setImageLoaded(true)}
            />
          )}
          {(isExpired || isOutOfStock) && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-[2px]">
              <Badge variant="destructive" className="text-lg py-2 px-4 shadow-lg">
                {isExpired ? "Expiré" : "Rupture de stock"}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl font-bold leading-tight">{offer.name}</h1>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-primary">
                  {offer.squirPrice.toFixed(2)}€
                </span>
                {offer.originalPrice > offer.squirPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {offer.originalPrice.toFixed(2)}€
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {discountPercentage > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-green-200 text-md"
                >
                  -{discountPercentage}%
                </Badge>
              )}
              {offer.validUntil && (
                <Badge variant="outline" className="text-muted-foreground text-md">
                  Valide jusqu'au{" "}
                  {format(new Date(offer.validUntil), "d MMMM yyyy", { locale: fr })}
                </Badge>
              )}
            </div>
          </div>

          {offer.description && (
            <div className="space-y-2">
              <h3 className="font-semibold text-xl">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-md">
                {offer.description}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold text-xl">Proposé par</h3>
            <OfferHostedByCard bar={offer.bar} />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-xl">Localisation</h3>
            <div className="bg-muted h-48 rounded-xl flex items-center justify-center text-muted-foreground border">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-8 w-8 opacity-50" />
                <span className="text-md">Carte indisponible pour le moment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t z-50 safe-area-bottom">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full shrink-0"
            onClick={handleFavoriteClick}
          >
            <Bookmark
              className={cn("h-5 w-5", isOfferSaved(offer?.id) && "fill-primary text-primary")}
            />
          </Button>
          <Button
            className="flex-1 h-12 rounded-full text-lg font-semibold shadow-lg shadow-primary/20"
            onClick={handleBuyClick}
            disabled={!isAvailable}
          >
            {isExpired ? "Offre expirée" : isOutOfStock ? "Rupture de stock" : "Acheter maintenant"}
          </Button>
        </div>
      </div>

      {offer && offer.barId && (
        <PaymentModal
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          barId={offer.barId}
          offerId={offer.id}
          amount={offer.squirPrice}
          onSuccess={() => {
            setIsPaymentModalOpen(false);
            onCreateQrCode({
              offerId: offer.id,
              label: `${offer.bar.name} • ${offer.name}`,
            });
            queryClient.invalidateQueries({ queryKey: ["qrcodes"] });
          }}
        />
      )}
    </div>
  );
}
