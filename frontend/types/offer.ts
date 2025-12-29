import { Range } from "@app-types/location";

export interface Offer {
	id: string;
	name: string;
	price: number;
	createdAt: Date;
}

export type OfferFilters = Partial<Offer> & {
	category?: string;
	range?: Range;
};
