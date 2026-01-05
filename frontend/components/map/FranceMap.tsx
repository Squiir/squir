import React, { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useGetBars } from "@hooks/bars/use-get-bars";
import { useQrCodeFlow } from "@hooks/qrcode/use-qr-code-flow";
import { MapMarker } from "./MapMarker";
import { ModalQrPreview } from "./ModalQrPreview";
import { OfferCard } from "./OfferCard";

export type Coordinate = {
	latitude?: number;
	longitude?: number;
	latitudeDelta?: number;
	longitudeDelta?: number;
};

export default function FranceMap({ latitude, longitude }: Coordinate) {
	const {
		qrcodes,
		selectedBar,
		previewedQrCode,
		isCreateQrCodePending,
		isGetMyQrCodesPending,
		offerOpen,
		setOfferOpen,
		previewOpen,
		setPreviewOpen,
		handleSelectBar,
		handleCreateQrCode,
	} = useQrCodeFlow();

	const { data: bars, isPending: isGetBarsPending } = useGetBars();

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
		<View className="flex-1">
			<MapView className="flex-1" initialRegion={initialRegion}>
				{!!latitude && !!longitude && (
					<Marker
						coordinate={{ latitude, longitude }}
						title="Moi"
						pinColor="#4D96FF"
					/>
				)}

				{(bars ?? []).map((bar) => (
					<MapMarker key={bar.id} bar={bar} onSelect={handleSelectBar} />
				))}
			</MapView>

			{isGetBarsPending && (
				<View className="absolute inset-0 items-center justify-center">
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}

			{/* ✅ Modal : Choix d'offre */}
			<OfferCard
				offerOpen={offerOpen}
				setOfferOpen={setOfferOpen}
				selectedBar={selectedBar}
				qrcodes={qrcodes ?? null}
				onCreateQrCode={handleCreateQrCode}
				isCreateQrCodePending={isCreateQrCodePending}
				isGetMyQrCodesPending={isGetMyQrCodesPending}
			/>

			{/* ✅ Modal : Preview QR (après génération) */}
			<ModalQrPreview
				visible={previewOpen}
				onClose={() => setPreviewOpen(false)}
				qrcode={previewedQrCode}
			/>
		</View>
	);
}
