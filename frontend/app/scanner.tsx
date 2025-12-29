import { useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { ScannerCamera } from "@components/scanner/ScannerCamera";
import { ScannerInstructions } from "@components/scanner/ScannerInstructions";
import { ScannerPermission } from "@components/scanner/ScannerPermission";
import { useQrScanner } from "@hooks/scanner/use-qr-scanner";

export default function ScannerScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const router = useRouter();
	const { scanned, isPending, handleBarCodeScanned } = useQrScanner();

	useEffect(() => {
		if (!permission || permission.granted) return;
		requestPermission();
	}, [permission]);

	// Écrans de permission
	if (!permission || !permission.granted) {
		return (
			<>
				<Stack.Screen options={{ headerShown: false }} />
				<ScannerPermission
					loading={!permission}
					granted={permission?.granted || false}
					onRequestPermission={requestPermission}
				/>
			</>
		);
	}

	// Écran de scan
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
				<Text className="text-gray-800 text-2xl font-bold mb-8">
					Scanner un QR code
				</Text>

				<ScannerCamera
					scanned={scanned}
					onBarCodeScanned={handleBarCodeScanned}
				/>

				<ScannerInstructions isPending={isPending} scanned={scanned} />
			</View>
		</LinearGradient>
	);
}
