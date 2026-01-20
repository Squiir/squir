import { Offer } from "@app-types/offer";
import { HomeHeader } from "@components/home/HomeHeader";
import { BestSellingOffersCarousel } from "@components/offer/BestSellingOffersCarousel";
import { NearbyOffersCarousel } from "@components/offer/NearbyOffersCarousel";
import { OfferConfirmModal } from "@components/offer/OfferConfirmModal";
import { RecentOffersCarousel } from "@components/offer/RecentOffersCarousel";
import { ThemedScreenWrapper } from "@components/ThemedScreenWrapper";
import { useCreateQrCode } from "@hooks/qrcode/use-create-qr-code";
import { formatPrice } from "@utils/format";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
	const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const { mutate: createQrCode, isPending } = useCreateQrCode();

	const handleOfferPress = (offer: Offer) => {
		setIsSuccess(false);
		setSelectedOffer(offer);
	};

	const handleConfirm = () => {
		if (!selectedOffer) return;

		createQrCode(
			{
				offerId: selectedOffer.id,
				label: `${selectedOffer.bar?.name ?? "Offre"} • ${selectedOffer.name}${
					typeof selectedOffer.price === "number"
						? ` • ${formatPrice(selectedOffer.price)}`
						: ""
				}`,
			},
			{
				onSuccess: () => {
					setIsSuccess(true);
				},
			},
		);
	};

	const handleClose = () => {
		setSelectedOffer(null);
		setIsSuccess(false);
	};

	return (
		<ThemedScreenWrapper>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<HomeHeader />
				<NearbyOffersCarousel onOfferPress={handleOfferPress} />
				<BestSellingOffersCarousel onOfferPress={handleOfferPress} />
				<RecentOffersCarousel onOfferPress={handleOfferPress} />
			</ScrollView>

			<OfferConfirmModal
				offer={selectedOffer}
				visible={!!selectedOffer}
				onClose={handleClose}
				onConfirm={handleConfirm}
				isPending={isPending}
				isSuccess={isSuccess}
			/>
		</ThemedScreenWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
