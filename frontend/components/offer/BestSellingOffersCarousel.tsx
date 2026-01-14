import { OfferCard } from "@components/offer/OfferCard";
import { Carousel } from "@components/ui/Carousel";
import { useGetBestSellingOffers } from "@hooks/offer/use-get-best-selling-offers";

export function BestSellingOffersCarousel() {
	const {
		data: offers,
		isLoading,
		isError,
		refetch,
	} = useGetBestSellingOffers();

	return (
		<Carousel
			title="Best-Sellers"
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
