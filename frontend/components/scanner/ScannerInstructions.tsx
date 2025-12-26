import React from "react";
import { Text, View } from "react-native";

type ScannerInstructionsProps = {
	isPending: boolean;
	scanned: boolean;
};

export function ScannerInstructions({
	isPending,
	scanned,
}: ScannerInstructionsProps) {
	return (
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
	);
}
