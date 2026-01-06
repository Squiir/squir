import { DefaultFilter } from "@app-types/filter";
import { Range } from "@app-types/range";

export interface Offer {
	id: string;
	name: string;
	price: number;
	createdAt: Date;
}

type OfferRangeParams = {
	distance?: Range<number>;
};

export type OfferParams = Partial<DefaultFilter<Offer & OfferRangeParams>> &
	Partial<OfferRangeParams>;
