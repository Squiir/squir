import { userService } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: userService.getFavorites,
  });

  const toggleVenueMutation = useMutation({
    mutationFn: userService.toggleFavoriteVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const toggleOfferMutation = useMutation({
    mutationFn: userService.toggleSavedOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isVenueFavorite = (barId: string) => {
    return favorites?.favoriteVenues.some((venue) => venue.id === barId) ?? false;
  };

  const isOfferSaved = (offerId: string) => {
    return favorites?.savedOffers.some((offer) => offer.id === offerId) ?? false;
  };

  return {
    favoriteVenues: favorites?.favoriteVenues ?? [],
    savedOffers: favorites?.savedOffers ?? [],
    isLoading,
    toggleVenue: toggleVenueMutation.mutate,
    toggleOffer: toggleOfferMutation.mutate,
    isVenueFavorite,
    isOfferSaved,
  };
};
