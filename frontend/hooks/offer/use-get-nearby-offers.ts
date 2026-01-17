import { useLocation } from "@contexts/LocationContext";
import { useGetOffers } from "@hooks/offer/use-get-offers";

const paginationParams = {
	limit: 10,
} as const;

const sortingParams = {
	sortBy: "distance",
	orderBy: "asc",
} as const;

export function useGetNearbyOffers() {
	const { coordinates } = useLocation();
	return useGetOffers(
		coordinates
			? {
					...paginationParams,
					...sortingParams,
				}
			: paginationParams,
	);
}
