import FranceMap from "@components/map/FranceMap";
import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { Tokens } from "@constants/tokens";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

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
		<SwipeableTabWrapper currentRoute="map" edgeSwipeOnly>
			<View style={styles.container}>
				<Stack.Screen options={{ title: "Ma localisation" }} />

				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator color={Tokens.colors.primary[600]} />
					</View>
				) : (
					<FranceMap latitude={latitude} longitude={longitude} />
				)}
			</View>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loadingContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
});
