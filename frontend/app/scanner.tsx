import { useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ScannerCamera } from "@components/scanner/ScannerCamera";
import { ScannerInstructions } from "@components/scanner/ScannerInstructions";
import { ScannerPermission } from "@components/scanner/ScannerPermission";
import { Tokens } from "@constants/tokens";
import { useQrScanner } from "@hooks/scanner/use-qr-scanner";
import { useRequestCameraPermission } from "@hooks/scanner/use-request-camera-permission";
import { useScannerRedirect } from "@hooks/scanner/use-scanner-redirect";

export default function ScannerScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const router = useRouter();
	const { scanned, isPending, handleBarCodeScanned } = useQrScanner();

	// Redirect CUSTOMER users who try to access scanner directly
	useScannerRedirect();

	// Auto-request camera permission if not granted
	useRequestCameraPermission(permission, requestPermission);

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
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			{/* Bouton retour */}
			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<X size={24} color={Tokens.colors.pink[500]} />
			</TouchableOpacity>

			{/* Zone de scan centrée */}
			<View style={styles.content}>
				<Text style={styles.title}>Scanner un QR code</Text>

				<ScannerCamera
					scanned={scanned}
					onBarCodeScanned={handleBarCodeScanned}
				/>

				<ScannerInstructions isPending={isPending} scanned={scanned} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Tokens.colors.pink[50],
	},
	backButton: {
		position: "absolute",
		top: 48,
		left: Tokens.spacing[4],
		zIndex: 50,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: Tokens.spacing[3],
		borderRadius: Tokens.borderRadius.full,
		...Tokens.shadows.lg,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: Tokens.colors.gray[800],
		fontSize: Tokens.typography.sizes["2xl"],
		fontWeight: Tokens.typography.weights.bold,
		marginBottom: Tokens.spacing[8],
	},
});
