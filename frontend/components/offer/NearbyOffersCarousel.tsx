import { Offer } from "@app-types/offer";
import { OfferCard } from "@components/offer/OfferCard";
import { Carousel } from "@components/ui/Carousel";
import { useGetNearbyOffers } from "@hooks/offer/use-get-nearby-offers";

interface Props {
	onOfferPress?: (offer: Offer) => void;
}

export function NearbyOffersCarousel({ onOfferPress }: Props) {
	const { data: offers, isLoading, isError, refetch } = useGetNearbyOffers();

	return (
		<Carousel
			title="A proximité"
			isLoading={isLoading}
			isError={isError}
			onRetry={refetch}
		>
			<Carousel.Title />
			<Carousel.Scroll>
				{offers?.map((offer) => (
					<OfferCard
						key={offer.id}
						offer={offer}
						onPress={() => onOfferPress?.(offer)}
					>
						<OfferCard.Name />
						<OfferCard.Price />
						<OfferCard.CreatedAt />
					</OfferCard>
				))}
			</Carousel.Scroll>
		</Carousel>
	);
}
