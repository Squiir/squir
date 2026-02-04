import { offerService } from "@/services/offer.service";
import { useQuery } from "@tanstack/react-query";

export const useOffer = (id: string | undefined) => {
  return useQuery({
    queryKey: ["offer", id],
    queryFn: () => {
      if (!id) throw new Error("Offer ID is required");
      return offerService.getOffer(id);
    },
    enabled: !!id,
  });
};
