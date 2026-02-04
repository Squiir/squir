import FranceMap from "@/components/map/FranceMap";
import { CustomerOfferCard } from "@/components/offers/CustomerOfferCard";
import { BarDetailSkeleton } from "@/components/skeleton/BarDetailSkeleton";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShareButton } from "@/components/ui/ShareButton";
import { useBar } from "@/hooks/bars/use-bar";
import { useFavorites } from "@/hooks/user/use-favorites";
import NotFoundPage from "@/pages/error/404";
import ApiErrorPage from "@/pages/error/api-error";
import type { Offer } from "@/types/offer";
import { ArrowLeft, Clock, MapPin, Store } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function BarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: bar, isLoading, error } = useBar(id);
  const { isVenueFavorite, toggleVenue } = useFavorites();

  const handleBack = () => {
    navigate(-1);
  };

  const isBarFavorite = id ? isVenueFavorite(id) : false;

  const handleFavoriteBar = () => {
    if (bar) {
      toggleVenue(bar.id);
    }
  };

  if (isLoading) {
    return <BarDetailSkeleton />;
  }

  if (error) {
    // @ts-ignore - API Error handling
    if (error.response?.status === 404) {
      return <NotFoundPage type="bar" />;
    }
    return <ApiErrorPage />;
  }

  if (!bar) {
    return <NotFoundPage type="bar" />;
  }

  // TODO: ajouter le tag & les horaires et image[] aux établissements et remplacer les mock data
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="relative">
        <div
          className="h-48 md:h-64 w-full  bg-gradient-to-br from-violet-600 to-pink-400"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm text-foreground"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <Button
            variant={isBarFavorite ? "default" : "secondary"}
            size="sm"
            onClick={handleFavoriteBar}
            className="rounded-full shadow-lg"
          >
            {isBarFavorite ? "Favori" : "Ajouter aux favoris"}
          </Button>
        </div>

        <div className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-card rounded-xl shadow-lg p-5 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center shrink-0 border-4 border-card shadow-sm">
                <Store className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{bar.name}</h1>
                <p className="text-muted-foreground">Bar</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:ml-auto text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  {bar.address}, Paris {bar.arrondissement}ème
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Lun-Sam : 18h - 2h (Horaires)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4 opacity-0 h-0 w-0 overflow-hidden">
            Localisation
          </h2>{" "}
          <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border z-0">
            <FranceMap readOnly latitude={bar.latitude} longitude={bar.longitude} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Nos offres</h2>
          {bar.offers && bar.offers.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {bar.offers.map((offer: Offer) => (
                  <CarouselItem
                    key={offer.id}
                    className="pl-2 md:pl-4 basis-3/4 md:basis-1/3 lg:basis-1/4"
                  >
                    <CustomerOfferCard offer={offer} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {bar.offers.length > 1 && (
                <div className="hidden md:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              )}
            </Carousel>
          ) : (
            <div className="text-center py-10 bg-muted/30 rounded-xl border border-dashed">
              <p className="text-muted-foreground">Aucune offre disponible pour le moment.</p>
            </div>
          )}
        </section>
      </div>
      <ShareButton path={window.location.pathname} />
    </div>
  );
}
