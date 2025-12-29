import { Carousel } from "@components/ui/Carousel";
import { useGetOffers } from "@hooks/offer/use-get-offers";
import { OfferCardFromMap } from "../map/OfferCardFromMap";

export function NearbyOffersCarousel() {
	const { data: offers } = useGetOffers();

	return (
		<Carousel title="A proximité">
			{offers?.map((offer) => (
				<OfferCardFromMap key={offer.id} offer={offer} />
			))}
		</Carousel>
	);
}
