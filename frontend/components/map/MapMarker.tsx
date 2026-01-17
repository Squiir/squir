import { Bar } from "@app-types/bar";
import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View } from "react-native";
import { Callout, Marker } from "react-native-maps";

type MapMarkerProps = {
	bar: Bar;
	onSelect: (bar: Bar) => void;
};

export function MapMarker({ bar, onSelect }: MapMarkerProps) {
	return (
		<Marker
			coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
			pinColor={bar.color}
		>
			<Callout tooltip onPress={() => onSelect(bar)}>
				<View style={styles.callout}>
					<Text style={styles.name}>{bar.name}</Text>
					<Text style={styles.location}>Paris {bar.arrondissement}e</Text>
					<Text style={styles.cta}>Voir les offres</Text>
				</View>
			</Callout>
		</Marker>
	);
}

const styles = StyleSheet.create({
	callout: {
		borderRadius: Tokens.borderRadius["2xl"],
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.15)",
		backgroundColor: "rgba(0, 0, 0, 0.95)",
		paddingHorizontal: Tokens.spacing[3],
		paddingVertical: Tokens.spacing[2],
		minWidth: 170,
	},
	name: {
		color: Tokens.colors.white,
		fontWeight: "800",
		fontSize: 14,
	},
	location: {
		color: "rgba(255, 255, 255, 0.75)",
		marginTop: Tokens.spacing[1],
		fontSize: 12,
	},
	cta: {
		color: "rgba(255, 255, 255, 0.6)",
		marginTop: Tokens.spacing[2],
		fontSize: 11,
	},
});
