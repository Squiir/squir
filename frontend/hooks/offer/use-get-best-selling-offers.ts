import { useGetOffers } from "@hooks/offer/use-get-offers";

const paginationParams = {
	limit: 10,
} as const;

const sortingParams = {
	sortBy: "numberOfQrCodes",
	orderBy: "desc",
} as const;

export function useGetBestSellingOffers() {
	return useGetOffers({
		...sortingParams,
		...paginationParams,
	});
}
