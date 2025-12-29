import { Offer, OfferFilters } from "@app-types/offer";
import { api } from "@services/api.service";

export const offerService = {
	async getOffers(filters?: OfferFilters) {
		const { data } = await api.get<Offer[]>("/offers", {
			params: filters,
		});
		return data;
	},
};
