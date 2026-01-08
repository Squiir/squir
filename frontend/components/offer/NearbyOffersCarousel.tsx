import { OfferCard } from "@components/offer/OfferCard";
import { Carousel } from "@components/ui/Carousel";
import { useLocation } from "@contexts/LocationContext";
import { useGetOffers } from "@hooks/offer/use-get-offers";

const sortingParams = {
	sortBy: "distance",
	orderBy: "asc",
} as const;

const paginationParams = {
	limit: 10,
} as const;

export function NearbyOffersCarousel() {
	const { coordinates } = useLocation();
	const {
		data: offers,
		isLoading,
		isError,
		refetch,
	} = useGetOffers(
		coordinates
			? {
					...paginationParams,
					...sortingParams,
					distance: {
						min: 0,
						max: 1000,
					},
					coordinates,
				}
			: paginationParams,
	);

	if (isLoading) {
		return (
			<Carousel title="A proximité">
				<Carousel.Skeleton />
			</Carousel>
		);
	}

	if (isError) {
		return (
			<Carousel title="A proximité">
				<Carousel.Error onPress={() => refetch()} />
			</Carousel>
		);
	}

	return (
		<Carousel title="A proximité">
			<Carousel.Title />
			<Carousel.Scroll>
				{offers?.map((offer) => (
					<OfferCard key={offer.id} offer={offer}>
						<OfferCard.Name />
						<OfferCard.Price />
						<OfferCard.CreatedAt />
					</OfferCard>
				))}
			</Carousel.Scroll>
		</Carousel>
	);
}
