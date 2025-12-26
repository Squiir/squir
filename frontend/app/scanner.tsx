import { useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { UserRole } from "@app-types/user";
import { ScannerCamera } from "@components/scanner/ScannerCamera";
import { ScannerInstructions } from "@components/scanner/ScannerInstructions";
import { ScannerPermission } from "@components/scanner/ScannerPermission";
import { useQrScanner } from "@hooks/scanner/use-qr-scanner";
import { useMe } from "@hooks/use-me";

export default function ScannerScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const router = useRouter();
	const { scanned, isPending, handleBarCodeScanned } = useQrScanner();
	const { data: user, isLoading } = useMe(); // ✅ Use API call instead of store

	useEffect(() => {
		if (!permission || permission.granted) return;
		requestPermission();
	}, [permission]);

	// Show loading while fetching user
	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-blue-950">
				<Text className="text-white">Chargement...</Text>
			</View>
		);
	}

	// 🔒 ACCESS CONTROL: Only BAR_STAFF and ADMIN can scan
	if (!user || user.role === UserRole.CUSTOMER) {
		return (
			<LinearGradient colors={["#1e3a8a", "#3b82f6"]} className="flex-1">
				<Stack.Screen options={{ headerShown: false }} />

				<TouchableOpacity
					onPress={() => router.back()}
					className="absolute top-12 left-4 z-50 bg-white/90 p-3 rounded-full shadow-lg"
				>
					<X size={24} color="#000" />
				</TouchableOpacity>

				<View className="flex-1 items-center justify-center px-8">
					<Text className="text-6xl mb-6">🚫</Text>
					<Text className="text-white text-2xl font-bold text-center mb-4">
						Accès réservé
					</Text>
					<Text className="text-white/80 text-center text-base mb-6">
						Le scan de QR codes est réservé au personnel des bars.
					</Text>
					{user?.role === UserRole.CUSTOMER && (
						<Text className="text-white/60 text-sm text-center">
							Connectez-vous avec un compte personnel de bar pour accéder au
							scanner.
						</Text>
					)}
				</View>
			</LinearGradient>
		);
	}

	// Permission screens
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

	// Scan screen
	return (
		<LinearGradient colors={["#ffffff", "#60a5fa"]} className="flex-1">
			<Stack.Screen options={{ headerShown: false }} />

			{/* Back button */}
			<TouchableOpacity
				onPress={() => router.back()}
				className="absolute top-12 left-4 z-50 bg-white/90 p-3 rounded-full shadow-lg"
			>
				<X size={24} color="#000" />
			</TouchableOpacity>

			{/* Scan zone */}
			<View className="flex-1 items-center justify-center">
				<Text className="text-gray-800 text-2xl font-bold mb-2">
					Scanner un QR code
				</Text>

				{user.role === UserRole.BAR_STAFF && user.barId && (
					<Text className="text-gray-600 text-sm mb-6">
						Scanner pour votre établissement
					</Text>
				)}

				<ScannerCamera
					scanned={scanned}
					onBarCodeScanned={handleBarCodeScanned}
				/>

				<ScannerInstructions isPending={isPending} scanned={scanned} />
			</View>
		</LinearGradient>
	);
}
