import { useConsumeQrCode } from "@hooks/qrcode/use-consume-qr-code";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SCAN_AREA_SIZE = 250;

export default function ScannerScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const router = useRouter();
	const { mutateAsync: consumeQrCode, isPending } = useConsumeQrCode();
	const lastScanTime = useRef<number>(0);
	const SCAN_DEBOUNCE_MS = 2000; // 2 secondes de debounce

	useEffect(() => {
		if (!permission) return;
		if (!permission.granted) {
			requestPermission();
		}
	}, [permission]);

	const handleBarCodeScanned = async ({ data }: { data: string }) => {
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
			if (url.protocol !== "squir:" || url.hostname !== "redeem") {
				throw new Error("QR code invalide");
			}

			const qrId = url.searchParams.get("qr");
			if (!qrId) {
				throw new Error("QR code invalide");
			}

			// Consommer le QR code
			const result = await consumeQrCode(qrId);

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

	if (!permission) {
		return (
			<LinearGradient colors={["#ffffff", "#60a5fa"]} className="flex-1">
				<Stack.Screen options={{ headerShown: false }} />
				<View className="flex-1 items-center justify-center">
					<Text className="text-gray-800 text-lg">Chargement...</Text>
				</View>
			</LinearGradient>
		);
	}

	if (!permission.granted) {
		return (
			<LinearGradient colors={["#ffffff", "#60a5fa"]} className="flex-1">
				<Stack.Screen options={{ headerShown: false }} />
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-gray-800 text-center text-lg font-bold mb-4">
						Accès à la caméra requis
					</Text>
					<Text className="text-gray-700 text-center mb-6">
						Autorise l'accès à la caméra pour scanner les QR codes
					</Text>
					<TouchableOpacity
						onPress={requestPermission}
						className="bg-blue-600 px-8 py-4 rounded-xl"
					>
						<Text className="text-white font-semibold text-base">
							Autoriser la caméra
						</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		);
	}

	return (
		<LinearGradient colors={["#ffffff", "#60a5fa"]} className="flex-1">
			<Stack.Screen options={{ headerShown: false }} />

			{/* Bouton retour */}
			<TouchableOpacity
				onPress={() => router.back()}
				className="absolute top-12 left-4 z-50 bg-white/90 p-3 rounded-full shadow-lg"
			>
				<X size={24} color="#000" />
			</TouchableOpacity>

			{/* Zone de scan centrée */}
			<View className="flex-1 items-center justify-center">
				{/* Titre */}
				<Text className="text-gray-800 text-2xl font-bold mb-8">
					Scanner un QR code
				</Text>

				{/* Zone caméra avec bordure */}
				<View
					style={{
						width: SCAN_AREA_SIZE + 8,
						height: SCAN_AREA_SIZE + 8,
						borderRadius: 24,
						overflow: "hidden",
						borderWidth: 4,
						borderColor: "#3b82f6",
						backgroundColor: "#fff",
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 4 },
						shadowOpacity: 0.3,
						shadowRadius: 8,
						elevation: 8,
					}}
				>
					<CameraView
						style={{
							width: SCAN_AREA_SIZE,
							height: SCAN_AREA_SIZE,
						}}
						facing="back"
						onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
						barcodeScannerSettings={{
							barcodeTypes: ["qr"],
						}}
					/>
				</View>

				{/* Instructions */}
				<View className="mt-8 px-6">
					<Text className="text-gray-800 text-center text-lg font-semibold">
						{isPending
							? "⏳ Traitement en cours..."
							: scanned
								? "✓ QR code détecté !"
								: "Place le QR code dans le cadre"}
					</Text>
					{!scanned && !isPending && (
						<Text className="text-gray-600 text-center text-sm mt-2">
							Le scan se fait automatiquement
						</Text>
					)}
				</View>
			</View>
		</LinearGradient>
	);
}
