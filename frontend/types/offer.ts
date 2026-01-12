import { DefaultFilter } from "@app-types/filter";
import { Coordinates } from "@app-types/location";
import { Range } from "@app-types/range";

export interface Offer {
	id: string;
	name: string;
	price: number;
	createdAt: Date;
}

type OfferRangeParams = {
	distance: Range<number>;
	coordinates: Coordinates;
};

export type OfferParams = Partial<DefaultFilter<Offer & OfferRangeParams>> &
	(
		| OfferRangeParams
		| {
				distance?: never;
				coordinates?: never;
		  }
	);
