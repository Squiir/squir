import { Button } from "@/components/ui/button";
import { useBarOffers } from "@/hooks/offers/use-offers";
import { userService } from "@/services/user.service";
import type { Offer } from "@/types/offer";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { CreateOfferDialog } from "./CreateOfferDialog";
import { OfferCard } from "./OfferCard";
import { UpdateOfferDialog } from "./UpdateOfferDialog";

export function ProOffersView() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser(),
  });

  const { data: offers, isLoading: isLoadingOffers, error } = useBarOffers(user?.barId || "");

  const isLoading = isLoadingUser || isLoadingOffers;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h3 className="text-lg font-semibold text-destructive">Erreur de chargement</h3>
        <p className="text-muted-foreground mt-2">
          Impossible de charger vos offres. Veuillez réessayer.
        </p>
      </div>
    );
  }

  if (!user?.barId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h3 className="text-lg font-semibold">Aucun bar associé</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Vous devez être associé à un bar pour gérer des offres. Contactez un administrateur.
        </p>
      </div>
    );
  }

  const hasOffers = offers && offers.length > 0;

  return (
    <>
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mes Offres</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gérez les offres de votre établissement
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Créer une offre
          </Button>
        </div>

        {hasOffers ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} onEdit={(offer) => setEditingOffer(offer)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center border-2 border-dashed rounded-lg border-muted-foreground/25">
            <div className="p-4 mb-4 bg-muted rounded-full">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Aucune offre pour le moment</h3>
            <p className="text-muted-foreground max-w-sm mt-2 mb-6">
              Créez votre première offre pour commencer à attirer des clients vers votre
              établissement.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Créer ma première offre
            </Button>
          </div>
        )}
      </div>

      <CreateOfferDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        barId={user.barId}
      />

      <UpdateOfferDialog
        open={!!editingOffer}
        onClose={() => setEditingOffer(null)}
        offer={editingOffer}
      />
    </>
  );
}
