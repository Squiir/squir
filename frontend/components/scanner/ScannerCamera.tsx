import { SCAN_AREA_SIZE } from "@constants/scanner";
import { Tokens } from "@constants/tokens";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import React from "react";
import { StyleSheet, View } from "react-native";

type ScannerCameraProps = {
	scanned: boolean;
	onBarCodeScanned: (result: BarcodeScanningResult) => void;
};

export function ScannerCamera({
	scanned,
	onBarCodeScanned,
}: ScannerCameraProps) {
	return (
		<View style={styles.container}>
			<CameraView
				style={styles.camera}
				facing="back"
				onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: SCAN_AREA_SIZE + 8,
		height: SCAN_AREA_SIZE + 8,
		borderRadius: Tokens.borderRadius["3xl"],
		overflow: "hidden",
		borderWidth: 4,
		borderColor: Tokens.colors.primary[500],
		backgroundColor: Tokens.colors.white,
		...Tokens.shadows.lg,
	},
	camera: {
		width: SCAN_AREA_SIZE,
		height: SCAN_AREA_SIZE,
	},
});
