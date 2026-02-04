import { ErrorLayout } from "@/components/error/ErrorLayout";
import { CustomerOfferCard } from "@/components/offer/CustomerOfferCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCollections } from "@/hooks/offers/use-collections";
import type { Offer } from "@/types/offer";
import { Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotFoundPageProps {
  type?: "offer" | "bar" | "resource";
}

export default function NotFoundPage({ type = "resource" }: NotFoundPageProps) {
  const navigate = useNavigate();

  const { bestSelling } = useCollections();

  const title =
    type === "offer"
      ? "Cette offre n'existe plus"
      : type === "bar"
        ? "Ce bar n'existe plus"
        : "Contenu introuvable";

  const description =
    type === "offer"
      ? "L'offre que vous recherchez a été retirée ou n'est plus disponible."
      : type === "bar"
        ? "Le bar que vous recherchez n'est plus disponible sur Squir."
        : "La page que vous recherchez n'existe pas ou a été déplacée.";

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container mx-auto px-4 py-8">
        <ErrorLayout
          icon={<SearchX className="w-16 h-16 text-muted-foreground/50" />}
          title={title}
          description={description}
          className="min-h-[40vh]"
        >
          <Button onClick={() => navigate("/home")} size="lg" className="shadow-lg rounded-full">
            <Home className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </ErrorLayout>

        {bestSelling && bestSelling.length > 0 && (
          <div className="mt-8 max-w-6xl mx-auto space-y-6 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards delay-300">
            <div className="flex flex-col items-center md:items-start space-y-1">
              <h2 className="text-xl font-bold">Découvrez d'autres offres</h2>
              <p className="text-sm text-muted-foreground">
                Voici une sélection des meilleures offres du moment
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full select-none"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {bestSelling.slice(0, 6).map((offer: Offer) => (
                  <CarouselItem
                    key={offer.id}
                    className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <CustomerOfferCard offer={offer} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
