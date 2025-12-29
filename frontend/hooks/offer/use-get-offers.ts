import { OfferFilters } from "@app-types/offer";
import { offerService } from "@services/offer.service";
import { useQuery } from "@tanstack/react-query";

export function useGetOffers(filters?: OfferFilters) {
	return useQuery({
		queryKey: ["offers", filters],
		queryFn: () => offerService.getOffers(filters),
	});
}
