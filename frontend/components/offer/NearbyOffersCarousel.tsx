import { OfferCard } from "@components/offer/OfferCard";
import { Carousel } from "@components/ui/Carousel";
import { useGetOffers } from "@hooks/offer/use-get-offers";

export function NearbyOffersCarousel() {
	const { data: offers } = useGetOffers({
		sortBy: "distance",
		orderBy: "asc",
		distance: {
			min: 0,
			max: 1000,
		},
	});

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
