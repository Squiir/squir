import { useConsumeQrCode } from "@hooks/qrcode/use-consume-qr-code";
import { BarcodeScanningResult } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert } from "react-native";

import { QR_HOSTNAME, QR_PROTOCOL, SCAN_DEBOUNCE_MS } from "@constants/scanner";

export function useQrScanner() {
	const [scanned, setScanned] = useState(false);
	const router = useRouter();
	const { mutateAsync: consumeQrCode, isPending } = useConsumeQrCode();
	const lastScanTime = useRef<number>(0);

	const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
		const { data } = result;
		// Debounce: éviter les scans multiples rapides
		const now = Date.now();
		if (now - lastScanTime.current < SCAN_DEBOUNCE_MS) {
			return;
		}

		if (scanned || isPending) return;

		setScanned(true);
		lastScanTime.current = now;

		try {
			// Extraire l'ID du QR code depuis l'URL squir://redeem?qr=<id>
			const url = new URL(data);
			if (url.protocol !== QR_PROTOCOL || url.hostname !== QR_HOSTNAME) {
				throw new Error("QR code invalide");
			}

			const qrId = url.searchParams.get("qr");
			if (!qrId) {
				throw new Error("QR code invalide");
			}

			// Consommer le QR code
			const result = await consumeQrCode(qrId);

			// Vibration de succès
			await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

			Alert.alert(
				"✅ Succès !",
				result.message || "QR code scanné et consommé avec succès !",
				[
					{
						text: "OK",
						onPress: () => {
							setScanned(false);
							router.back();
						},
					},
				],
			);
		} catch (error: any) {
			let errorMessage = "Impossible de scanner le QR code";

			if (error?.response?.data?.message) {
				errorMessage = error.response.data.message;
			} else if (error?.message) {
				errorMessage = error.message;
			}

			// Vibration d'erreur
			await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

			Alert.alert("❌ Erreur", errorMessage, [
				{
					text: "Réessayer",
					onPress: () => {
						setScanned(false);
					},
				},
				{
					text: "Annuler",
					onPress: () => {
						setScanned(false);
						router.back();
					},
					style: "cancel",
				},
			]);
		}
	};

	return {
		scanned,
		isPending,
		handleBarCodeScanned,
	};
}
