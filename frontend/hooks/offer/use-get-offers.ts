import { OfferParams } from "@app-types/offer";
import { offerService } from "@services/offer.service";
import { useQuery } from "@tanstack/react-query";

export function useGetOffers(params?: OfferParams) {
	return useQuery({
		queryKey: ["offers", params],
		queryFn: () => offerService.getOffers(params),
	});
}
