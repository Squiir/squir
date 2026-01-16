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
			>
				{/* Overlay with white corners */}
				<View style={styles.overlay}>
					<View style={[styles.corner, styles.topLeft]} />
					<View style={[styles.corner, styles.topRight]} />
					<View style={[styles.corner, styles.bottomLeft]} />
					<View style={[styles.corner, styles.bottomRight]} />
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: SCAN_AREA_SIZE,
		height: SCAN_AREA_SIZE,
		borderRadius: Tokens.borderRadius.xl, // Less rounded? Or keep 3xl? Let's use xl for a tighter look
		overflow: "hidden",
		backgroundColor: Tokens.colors.black, // Background while loading
		...Tokens.shadows.lg,
		elevation: 10,
		borderWidth: 4,
		borderColor: Tokens.colors.pink[300],
	},
	camera: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	overlay: {
		flex: 1,
		position: "relative",
	},
	corner: {
		position: "absolute",
		width: 40,
		height: 40,
		borderColor: "white",
		borderWidth: 4,
	},
	topLeft: {
		top: 20,
		left: 20,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderTopLeftRadius: 12,
	},
	topRight: {
		top: 20,
		right: 20,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
		borderTopRightRadius: 12,
	},
	bottomLeft: {
		bottom: 20,
		left: 20,
		borderRightWidth: 0,
		borderTopWidth: 0,
		borderBottomLeftRadius: 12,
	},
	bottomRight: {
		bottom: 20,
		right: 20,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		borderBottomRightRadius: 12,
	},
});
