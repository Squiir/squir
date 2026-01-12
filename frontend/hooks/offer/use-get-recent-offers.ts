import { useGetOffers } from "@hooks/offer/use-get-offers";

const paginationParams = {
	limit: 10,
} as const;

const sortingParams = {
	sortBy: "createdAt",
	orderBy: "desc",
} as const;

export function useGetRecentOffers() {
	return useGetOffers({
		...sortingParams,
		...paginationParams,
	});
}
