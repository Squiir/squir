import type { Bar } from "@/types/bar";
import type { Offer } from "@/types/offer";
import { Map, SlidersHorizontal, Wine } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmptyState } from "./EmptyState";
import { ExploreCard } from "./ExploreCard";
import { FavoriteBarCard } from "./FavoriteBarCard";
import { SavedOfferCard } from "./SavedOfferCard";

interface ProfileTabsProps {
  favoriteVenues: Pick<Bar, "id" | "name" | "address" | "arrondissement">[];
  savedOffers: (Pick<
    Offer,
    | "id"
    | "name"
    | "squirPrice"
    | "validUntil"
    | "imageUrl"
    | "barId"
    | "originalPrice"
    | "description"
  > & {
    venueName: string;
    venueAddress: string;
    venueArrondissement: number;
  })[];
}

export function ProfileTabs({ favoriteVenues, savedOffers }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"bars" | "offers">("bars");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <div className="flex items-center gap-8 border-b border-border/50 pb-1">
        <button
          onClick={() => setActiveTab("bars")}
          className={`pb-3 text-lg font-semibold transition-all relative ${
            activeTab === "bars" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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
            activeTab === "offers"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
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
            {favoriteVenues.length > 0 ? (
              favoriteVenues.map((bar) => <FavoriteBarCard key={bar.id} bar={bar} />)
            ) : (
              <EmptyState
                icon={Map}
                title="Aucun bar favori"
                description="Explorez la carte pour découvrir les meilleurs bars de Paris."
                actionLabel="Explorer la carte"
                onAction={() => navigate("/map")}
              />
            )}

            {favoriteVenues.length > 0 && (
              <ExploreCard
                icon={Map}
                label="Découvrir plus de lieux"
                onClick={() => navigate("/map")}
              />
            )}
          </>
        )}

        {activeTab === "offers" && (
          <>
            {savedOffers.length > 0 ? (
              savedOffers.map((offer) => <SavedOfferCard key={offer.id} offer={offer} />)
            ) : (
              <EmptyState
                icon={Wine}
                title="Aucune offre sauvegardée"
                description="Découvrez des offres exclusives dans les meilleurs bars."
                actionLabel="Trouver des offres"
                onAction={() => navigate("/home")}
              />
            )}

            {savedOffers.length > 0 && (
              <ExploreCard
                icon={SlidersHorizontal}
                label="Explorer plus d'offres"
                onClick={() => navigate("/home")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
