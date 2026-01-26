import { SavedOffersList } from "@/components/saved/SavedOffersList";
import { SavedVenuesList } from "@/components/saved/SavedVenuesList";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/hooks/useFavorites";
import { Bookmark } from "lucide-react";

export function SavedItemsDropdown() {
  const { favoriteVenues, savedOffers, isLoading, toggleVenue, toggleOffer } = useFavorites();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground relative"
        >
          <Bookmark className="w-5 h-5" />
          {(favoriteVenues.length > 0 || savedOffers.length > 0) && (
            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] p-0">
        <Tabs defaultValue="establishments" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-0">
            <TabsTrigger
              value="establishments"
              className="flex-1 rounded-none border-b-2 border-transparent py-2 font-medium text-muted-foreground ring-offset-background transition-none focus-visible:outline-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-muted/10"
            >
              Établissements
              {favoriteVenues.length > 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({favoriteVenues.length})
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="offers"
              className="flex-1 rounded-none border-b-2 border-transparent py-2 font-medium text-muted-foreground ring-offset-background transition-none focus-visible:outline-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-muted/10"
            >
              Offres
              {savedOffers.length > 0 && (
                <span className="ml-2 text-xs text-muted-foreground">({savedOffers.length})</span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="establishments" className="p-0 max-h-[300px] overflow-y-auto w-full">
            <SavedVenuesList
              venues={favoriteVenues}
              isLoading={isLoading}
              onToggleVenue={toggleVenue}
            />
          </TabsContent>

          <TabsContent value="offers" className="p-0 max-h-[300px] overflow-y-auto w-full">
            <SavedOffersList
              offers={savedOffers}
              isLoading={isLoading}
              onToggleOffer={toggleOffer}
            />
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
