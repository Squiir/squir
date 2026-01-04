import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import FranceMap from "@components/map/FranceMap";

export default function MapScreen() {
	const [coords, setCoords] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					Alert.alert(
						"Permission refusée",
						"Autorise la localisation pour afficher ta position.",
					);
					return;
				}

				const pos = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Balanced,
				});

				setCoords({
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
				});
			} catch {
				Alert.alert("Erreur", "Impossible de récupérer la localisation.");
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const latitude = coords?.latitude ?? 48.8566; // fallback Paris
	const longitude = coords?.longitude ?? 2.3522;

	return (
		<View className="flex-1">
			<Stack.Screen options={{ title: "Ma localisation" }} />

			{loading ? (
				<View className="items-center justify-center flex-1">
					<ActivityIndicator />
				</View>
			) : (
				<FranceMap latitude={latitude} longitude={longitude} />
			)}
		</View>
	);
}
