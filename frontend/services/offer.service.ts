import { Offer, OfferParams } from "@app-types/offer";
import { api } from "@services/api.service";
import { flattenRangeParams } from "@utils/range";

export const offerService = {
	async getOffers(params?: OfferParams) {
		const { data } = await api.get<Offer[]>("/offers", {
			params: flattenRangeParams(params),
		});
		return data;
	},
};
