import { Bar } from "@app-types/bar";
import { QrCode } from "@app-types/qrcode";
import { useCreateQrCode } from "@hooks/qrcode/use-create-qr-code";
import { useGetMyQrCodes } from "@hooks/qrcode/use-get-qr-codes";
import { QrCodeDto } from "@services/qrcode.service";
import { useEffect, useState } from "react";

export function useQrCodeFlow() {
	const { mutate: createQrCode, isPending: isCreateQrCodePending } =
		useCreateQrCode();
	const { data: qrcodes, isPending: isGetMyQrCodesPending } = useGetMyQrCodes();

	const [selectedBar, setSelectedBar] = useState<Bar>();
	const [offerOpen, setOfferOpen] = useState(false);
	const [previewedQrCode, setPreviewedQrCode] = useState<QrCode>();
	const [previewOpen, setPreviewOpen] = useState(false);

	// Ouvre le modal de choix d'offre pour un bar donné
	const handleSelectBar = (bar: Bar) => {
		setSelectedBar(bar);
		setOfferOpen(true);
	};

	// Crée le QR code et ouvre le modal de preview
	const handleCreateQrCode = (qrCodeDto: QrCodeDto) => {
		if (!selectedBar) return;
		setOfferOpen(false);
		createQrCode(qrCodeDto, {
			onSuccess: (data) => {
				setPreviewedQrCode(data);
			},
		});
	};

	// Effet pour ouvrir automatiquement le preview quand un QR code est généré
	useEffect(() => {
		if (previewedQrCode) {
			setPreviewOpen(true);
		}
	}, [previewedQrCode]);

	return {
		// Data
		qrcodes,
		selectedBar,
		previewedQrCode,

		// Loading states
		isCreateQrCodePending,
		isGetMyQrCodesPending,

		// UI states
		offerOpen,
		setOfferOpen, // Nécessaire pour le onRequestClose du Modal
		previewOpen,
		setPreviewOpen, // Nécessaire pour le onClose du Modal

		// Handlers
		handleSelectBar,
		handleCreateQrCode,
		setSelectedBar, // Exposé au cas où besoin de reset manuel
	};
}
