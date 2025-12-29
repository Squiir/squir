import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Bar } from "@app-types/bar";
import { QrCode } from "@app-types/qrcode";
import { useGetBars } from "@hooks/bars/use-get-bars";
import { useCreateQrCode } from "@hooks/qrcode/use-create-qr-code";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { QrCodeDto } from "@services/qrcode.service";
import { MapMarker } from "./MapMarker";
import { ModalQrPreview } from "./ModalQrPreview";
import { OfferCardFromMap } from "./OfferCardFromMap";

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
	const [previewedQrCode, setPreviewedQrCode] = useState<QrCode>();

	const [offerOpen, setOfferOpen] = useState(false);
	const [selectedBar, setSelectedBar] = useState<Bar>();

	// modal preview QR (après génération)
	const [previewOpen, setPreviewOpen] = useState(false);

	const onCreateQrCode = (qrCodeDto: QrCodeDto) => {
		if (!selectedBar) return;
		setOfferOpen(false);
		createQrCode(qrCodeDto, {
			onSuccess: (data) => {
				setPreviewedQrCode(data);
			},
		});
	};

	useEffect(() => {
		if (previewedQrCode) {
			setPreviewOpen(true);
		}
	}, [previewedQrCode]);

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
					<MapMarker
						key={bar.id}
						bar={bar}
						onSelect={(b) => {
							setSelectedBar(b);
							setOfferOpen(true);
						}}
					/>
				))}
			</MapView>

			{isGetBarsPending && (
				<View className="absolute inset-0 items-center justify-center">
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}

			{/* ✅ Modal : Choix d'offre */}
			<OfferCardFromMap
				offerOpen={offerOpen}
				setOfferOpen={setOfferOpen}
				selectedBar={selectedBar}
				qrcodes={qrcodes ?? null}
				onCreateQrCode={onCreateQrCode}
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
