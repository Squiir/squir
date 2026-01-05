import { BarListView } from "@components/map/BarListView";
import { ModalQrPreview } from "@components/map/ModalQrPreview";
import { OfferCard } from "@components/map/OfferCard";
import { useGetBars } from "@hooks/bars/use-get-bars";
import { useQrCodeFlow } from "@hooks/qrcode/use-qr-code-flow";
import React from "react";
import { View } from "react-native";

interface BarsListScreenProps {
	latitude: number;
	longitude: number;
}

export function BarsListScreen({ latitude, longitude }: BarsListScreenProps) {
	const { data: bars, isPending: isGetBarsPending } = useGetBars();

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

	return (
		<View className="flex-1 bg-[#0f0f23]">
			<BarListView
				bars={bars}
				isLoading={isGetBarsPending}
				userLatitude={latitude}
				userLongitude={longitude}
				onSelectBar={handleSelectBar}
			/>

			{/* Modal : Choix d'offre */}
			<OfferCard
				offerOpen={offerOpen}
				setOfferOpen={setOfferOpen}
				selectedBar={selectedBar}
				qrcodes={qrcodes ?? null}
				onCreateQrCode={handleCreateQrCode}
				isCreateQrCodePending={isCreateQrCodePending}
				isGetMyQrCodesPending={isGetMyQrCodesPending}
			/>

			{/* Modal : Preview QR (après génération) */}
			<ModalQrPreview
				visible={previewOpen}
				onClose={() => setPreviewOpen(false)}
				qrcode={previewedQrCode}
			/>
		</View>
	);
}
