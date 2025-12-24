import { CameraView } from "expo-camera";
import React from "react";
import { Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SCAN_AREA_SIZE = 250;

type ScannerCameraProps = {
	scanned: boolean;
	onBarCodeScanned: ({ data }: { data: string }) => void;
};

export function ScannerCamera({
	scanned,
	onBarCodeScanned,
}: ScannerCameraProps) {
	return (
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
				onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
			/>
		</View>
	);
}
