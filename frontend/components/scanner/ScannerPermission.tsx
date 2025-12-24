import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ScannerPermissionProps = {
	loading?: boolean;
	granted: boolean;
	onRequestPermission: () => void;
};

export function ScannerPermission({
	loading,
	granted,
	onRequestPermission,
}: ScannerPermissionProps) {
	if (loading) {
		return (
			<LinearGradient colors={["#ffffff", "#60a5fa"]} className="flex-1">
				<View className="flex-1 items-center justify-center">
					<Text className="text-gray-800 text-lg">Chargement...</Text>
				</View>
			</LinearGradient>
		);
	}

	if (!granted) {
		return (
			<LinearGradient colors={["#ffffff", "#60a5fa"]} className="flex-1">
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-gray-800 text-center text-lg font-bold mb-4">
						Accès à la caméra requis
					</Text>
					<Text className="text-gray-700 text-center mb-6">
						Autorise l'accès à la caméra pour scanner les QR codes
					</Text>
					<TouchableOpacity
						onPress={onRequestPermission}
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

	return null;
}
