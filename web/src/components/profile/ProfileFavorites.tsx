import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/hooks/user/use-favorites";
import { MapPin, Star } from "lucide-react";

export function ProfileFavorites() {
  const { favoriteVenues, savedOffers, toggleVenue, toggleOffer } = useFavorites();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Mes Favoris</h2>
      <Tabs defaultValue="bars" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="bars">Bars favoris</TabsTrigger>
          <TabsTrigger value="offers">Offres enregistrées</TabsTrigger>
        </TabsList>

        <TabsContent value="bars" className="space-y-4">
          {favoriteVenues.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucun bar favori pour le moment.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favoriteVenues.map((bar) => (
                <Card key={bar.id} className="overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{bar.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {bar.address && (
                          <span className="truncate max-w-[200px]">{bar.address}</span>
                        )}
                        {bar.arrondissement && <span>, {bar.arrondissement}e</span>}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-yellow-400 hover:text-yellow-500"
                      onClick={() => toggleVenue(bar.id)}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          {savedOffers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucune offre enregistrée pour le moment.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {savedOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{offer.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        Chez <span className="font-medium ml-1">{offer.venueName}</span>
                      </p>
                      {offer.squirPrice && (
                        <p className="font-bold text-primary">{offer.squirPrice} €</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-yellow-400 hover:text-yellow-500"
                      onClick={() => toggleOffer(offer.id)}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
