import { offerService } from "@/services/offer.service";
import type { CreateOfferInput, UpdateOfferInput } from "@/types/offer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBarOffers(barId: string) {
  return useQuery({
    queryKey: ["offers", "bar", barId],
    queryFn: () => offerService.getBarOffers(barId),
    enabled: !!barId,
  });
}

export function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateOfferInput) => offerService.createOffer(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
}

export function useUpdateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateOfferInput }) =>
      offerService.updateOffer(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
}

export function useDeleteOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => offerService.deleteOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
}
