import { OfferCard } from "@components/offer/OfferCard";
import { Carousel } from "@components/ui/Carousel";
import { useMyLocation } from "@hooks/location/use-my-location";
import { useGetOffers } from "@hooks/offer/use-get-offers";

const baseParams = {
	sortBy: "distance",
	orderBy: "asc",
} as const;

export function NearbyOffersCarousel() {
	const { coordinates } = useMyLocation();
	const { data: offers } = useGetOffers(
		coordinates
			? {
					...baseParams,
					distance: {
						min: 0,
						max: 1000,
					},
					coordinates,
				}
			: baseParams,
	);

	return (
		<Carousel title="A proximité">
			{offers?.map((offer) => (
				<OfferCard key={offer.id} offer={offer}>
					<OfferCard.Name />
					<OfferCard.Price />
					<OfferCard.CreatedAt />
				</OfferCard>
			))}
		</Carousel>
	);
}
