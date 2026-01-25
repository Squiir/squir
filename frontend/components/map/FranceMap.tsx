import { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Bar } from "@app-types/bar";
import { Offer } from "@app-types/offer";
import { BarOffersModal } from "@components/offer/BarOffersModal";
import { OfferConfirmModal } from "@components/offer/OfferConfirmModal";
import { Tokens } from "@constants/tokens";
import { useGetBars } from "@hooks/bars/use-get-bars";
import { useCreateQrCode } from "@hooks/qrcode/use-create-qr-code";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { formatPrice } from "@utils/format";
import { MapMarker } from "./MapMarker";

export type Coordinate = {
	latitude?: number;
	longitude?: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
};

export default function FranceMap({ latitude, longitude }: Coordinate) {
	const { mutate: createQrCode, isPending: isCreateQrCodePending } =
		useCreateQrCode();
	const { data: qrcodes, isPending: isGetMyQrCodesPending } = useGetMyQrCodes();
	const { data: bars, isPending: isGetBarsPending } = useGetBars();

	// Bar selection modal
	const [barModalOpen, setBarModalOpen] = useState(false);
	const [selectedBar, setSelectedBar] = useState<Bar>();

	// Offer confirmation modal
	const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleBarSelect = (bar: Bar) => {
		setSelectedBar(bar);
		setBarModalOpen(true);
	};

	const handleOfferSelect = (offer: Offer) => {
		// Close bar modal and open confirmation modal
		setBarModalOpen(false);
		setIsSuccess(false);
		// Add bar info to offer for display
		const offerWithBar = { ...offer, bar: selectedBar };
		setSelectedOffer(offerWithBar);
	};

	const handleConfirm = () => {
		if (!selectedOffer || !selectedBar) return;

		createQrCode(
			{
				offerId: selectedOffer.id,
				label: `${selectedBar.name} • ${selectedOffer.name}${
					typeof selectedOffer.squirPrice === "number"
						? ` • ${formatPrice(selectedOffer.squirPrice)}`
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

	const handleCloseConfirmModal = () => {
		setSelectedOffer(null);
		setIsSuccess(false);
	};

	const initialRegion = useMemo(
		() => ({
			latitude: latitude ?? 48.8566,
			longitude: longitude ?? 2.3522,
			latitudeDelta: 0.12,
			longitudeDelta: 0.12,
		}),
		[latitude, longitude],
	);

	return (
		<View style={styles.container}>
			<MapView style={styles.map} initialRegion={initialRegion}>
				{!!latitude && !!longitude && (
					<Marker
						coordinate={{ latitude, longitude }}
						title="Moi"
						pinColor="#4D96FF"
					/>
				)}

				{(bars ?? []).map((bar) => (
					<MapMarker key={bar.id} bar={bar} onSelect={handleBarSelect} />
				))}
			</MapView>

			{isGetBarsPending && (
				<View style={styles.loading}>
					<ActivityIndicator size="large" color={Tokens.colors.white} />
				</View>
			)}

			{/* Modal : Bar offers list */}
			<BarOffersModal
				visible={barModalOpen}
				bar={selectedBar}
				qrcodes={qrcodes ?? null}
				onClose={() => setBarModalOpen(false)}
				onSelectOffer={handleOfferSelect}
				isPending={isCreateQrCodePending || isGetMyQrCodesPending}
			/>

			{/* Modal : Offer confirmation */}
			<OfferConfirmModal
				offer={selectedOffer}
				visible={!!selectedOffer}
				onClose={handleCloseConfirmModal}
				onConfirm={handleConfirm}
				isPending={isCreateQrCodePending}
				isSuccess={isSuccess}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	loading: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});
