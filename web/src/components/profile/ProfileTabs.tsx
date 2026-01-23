import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

// Mock Data
const FAVORITE_BARS = [
  {
    id: "1",
    name: "Le Perchoir",
    type: "Rooftop Bar",
    location: "Paris 11e",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Danico",
    type: "Cocktail Club",
    location: "Paris 2e",
    imageUrl:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const SAVED_OFFERS = [
  {
    id: "1",
    title: "Little Red Door",
    description: "Speakeasy",
    location: "Paris 3e",
    imageUrl:
      "https://images.unsplash.com/photo-1572116469696-9a25771d97f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<"bars" | "offers">("bars");

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <div className="flex items-center gap-8 border-b border-white/5 pb-1">
        <button
          onClick={() => setActiveTab("bars")}
          className={`pb-3 text-lg font-semibold transition-all relative ${
            activeTab === "bars" ? "text-white" : "text-muted-foreground hover:text-white"
          }`}
        >
          Bars Favoris
          {activeTab === "bars" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full layout-id-active-tab" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("offers")}
          className={`pb-3 text-lg font-semibold transition-all relative ${
            activeTab === "offers" ? "text-white" : "text-muted-foreground hover:text-white"
          }`}
        >
          Offres Sauvegardées
          {activeTab === "offers" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full layout-id-active-tab" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-300">
        {activeTab === "bars" && (
          <>
            {FAVORITE_BARS.map((bar) => (
              <Card
                key={bar.id}
                className="group relative overflow-hidden flex items-center p-0 gap-4 border-none bg-card/40 hover:bg-card/60 transition-all cursor-pointer hover:border-primary/50 hover:ring-1 hover:ring-primary/50"
              >
                <div className="w-24 h-24 shrink-0">
                  <img src={bar.imageUrl} alt={bar.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-4 pr-4">
                  <h3 className="text-lg font-bold leading-none mb-1 group-hover:text-primary transition-colors">
                    {bar.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{bar.type}</p>
                  <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    {bar.location}
                  </p>
                </div>
                <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                  <ChevronRight className="w-5 h-5 text-primary" />
                </div>
              </Card>
            ))}
            {/* Empty State / Explore Card - Placeholder */}
            <Card className="flex flex-col items-center justify-center p-6 border border-dashed border-white/10 bg-transparent text-center h-24 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
            </Card>
          </>
        )}

        {activeTab === "offers" && (
          <>
            {SAVED_OFFERS.map((offer) => (
              <Card
                key={offer.id}
                className="group relative overflow-hidden flex items-center p-0 gap-4 border-none bg-card/40 hover:bg-card/60 transition-all cursor-pointer hover:border-primary/50 hover:ring-1 hover:ring-primary/50"
              >
                <div className="w-24 h-24 shrink-0">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 py-4 pr-4">
                  <h3 className="text-lg font-bold leading-none mb-1 group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                  <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    {offer.location}
                  </p>
                </div>
                <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                  <ChevronRight className="w-5 h-5 text-primary" />
                </div>
              </Card>
            ))}
            {/* Explore Offers Placeholder */}
            <div className="border border-dashed border-white/10 rounded-xl flex items-center justify-center p-6 text-center h-24 hover:bg-white/5 transition-colors cursor-pointer group col-span-1 md:col-span-2">
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <span className="text-xl">🗺️</span>
                </div>
                <p className="text-sm text-muted-foreground font-medium group-hover:text-white transition-colors">
                  Explorer la carte
                </p>
                <p className="text-xs text-muted-foreground/50">Trouver de nouveaux lieux</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
