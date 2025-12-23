import React from "react";
import { View, Text } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Bar } from "@app-types/bar";

type MapMarkerProps = {
	key?: string;
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
				<View className="rounded-2xl border border-white/15 bg-black/95 px-3 py-2 min-w-[170px]">
					<Text className="text-white font-extrabold text-[14px]">
						{bar.name}
					</Text>
					<Text className="text-white/75 mt-1 text-[12px]">
						Paris {bar.arrondissement}e
					</Text>
					<Text className="text-white/60 mt-2 text-[11px]">
						Voir les offres
					</Text>
				</View>
			</Callout>
		</Marker>
	);
}
