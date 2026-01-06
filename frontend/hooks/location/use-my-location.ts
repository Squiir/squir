import { Coordinates, LocationState } from "@app-types/location";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useMyLocation(defaultLocation?: Coordinates) {
	const [location, setLocation] = useState<LocationState>({
		coordinates: defaultLocation,
		loading: true,
	});

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== "granted") {
				setLocation({
					coordinates: defaultLocation,
					errorMsg: "Permission de localisation refusée",
					loading: false,
				});
				return;
			}

			try {
				let currentLocation = await Location.getCurrentPositionAsync({});
				setLocation({
					coordinates: currentLocation.coords,
					loading: false,
				});
			} catch (error) {
				setLocation((prev) => ({
					...prev,
					errorMsg: "Impossible de récupérer la position",
					loading: false,
				}));
			}
		})();
	}, []);

	return location;
}
