import { Offer, OfferParams } from "@app-types/offer";
import { api } from "@services/api.service";
import { flattenCoordinates } from "@utils/location";
import { flattenRangeParams } from "@utils/range";

export const offerService = {
	async getOffers(params?: OfferParams) {
		const { data } = await api.get<Offer[]>("/offers", {
			params: flattenRangeParams(flattenCoordinates(params)),
		});
		return data;
	},
};
