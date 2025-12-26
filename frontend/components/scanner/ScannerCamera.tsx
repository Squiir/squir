import { BarcodeScanningResult, CameraView } from "expo-camera";
import React from "react";
import { View } from "react-native";

import { SCAN_AREA_SIZE } from "@constants/scanner";

type ScannerCameraProps = {
	scanned: boolean;
	onBarCodeScanned: (result: BarcodeScanningResult) => void;
};

export function ScannerCamera({
	scanned,
	onBarCodeScanned,
}: ScannerCameraProps) {
	return (
		<View
			className="rounded-3xl overflow-hidden border-4 border-blue-500 bg-white shadow-lg"
			style={{
				width: SCAN_AREA_SIZE + 8,
				height: SCAN_AREA_SIZE + 8,
				elevation: 8,
			}}
		>
			<CameraView
				style={{
					width: SCAN_AREA_SIZE,
					height: SCAN_AREA_SIZE,
				}}
				facing="back"
				onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
			/>
		</View>
	);
}
