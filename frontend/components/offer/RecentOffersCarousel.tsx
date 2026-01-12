import { OfferCard } from "@components/offer/OfferCard";
import { Carousel } from "@components/ui/Carousel";
import { useGetRecentOffers } from "@hooks/offer/use-get-recent-offers";

export function RecentOffersCarousel() {
	const { data: offers, isLoading, isError, refetch } = useGetRecentOffers();

	return (
		<Carousel
			title="Les nouveautés"
			isLoading={isLoading}
			isError={isError}
			onRetry={refetch}
		>
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
