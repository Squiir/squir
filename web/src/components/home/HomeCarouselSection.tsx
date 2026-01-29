import { HomeOfferCard } from "@/components/home/HomeOfferCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Offer } from "@/types/offer";

interface HomeCarouselSectionProps {
  title: string;
  offers: Offer[];
}

export function HomeCarouselSection({ title, offers }: HomeCarouselSectionProps) {
  if (!offers.length) return null;

  return (
    <div className="py-6 space-y-4">
      <div className="px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 px-4 md:px-8 pb-4">
            {offers.map((offer) => (
              <CarouselItem key={offer.id} className="pl-2 md:pl-4 basis-auto">
                <HomeOfferCard offer={offer} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute left-2 top-[40%] -translate-y-1/2">
              <CarouselPrevious className="relative left-0 translate-x-0 disabled:hidden" />
            </div>
            <div className="pointer-events-auto absolute right-2 top-[40%] -translate-y-1/2">
              <CarouselNext className="relative right-0 translate-x-0 disabled:hidden" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
