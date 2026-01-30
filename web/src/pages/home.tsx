import { FilterBar } from "@/components/home/FilterBar";
import { HomeBarCard } from "@/components/home/HomeBarCard";
import { HomeCarouselSection } from "@/components/home/HomeCarouselSection";
import { SearchBar } from "@/components/home/SearchBar";
import { useBars } from "@/hooks/bars/use-bars";
import { useCollections } from "@/hooks/offers/use-collections";
import { useState } from "react";

export default function HomePage() {
  const { bestSelling, nearby, recommendations, isLoading } = useCollections();
  const { data: bars, isLoading: isLoadingBars } = useBars();
  const [city, setCity] = useState("Paris");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-20 bg-background py-4 px-4 shadow-sm space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
        <SearchBar />
        <div className="md:w-auto overflow-hidden">
          <FilterBar city={city} setCity={setCity} date={date} setDate={setDate} />
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {!isLoading && (
          <>
            <HomeCarouselSection title="BEST-SELLERS" offers={bestSelling} />
            <HomeCarouselSection title="À PROXIMITÉ" offers={nearby} />
            <HomeCarouselSection title="POUR TOI" offers={recommendations} />

            <div className="py-6 space-y-4 px-4 md:px-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary">
                TOUS LES ÉTABLISSEMENTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bars?.map((bar) => (
                  <HomeBarCard key={bar.id} bar={bar} />
                ))}
              </div>
            </div>
          </>
        )}

        {(isLoading || isLoadingBars) && (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
