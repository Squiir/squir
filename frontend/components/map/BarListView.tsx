import { Bar } from "@app-types/bar";
import { BarListItem } from "@components/map/BarListItem";
import { calculateDistance } from "@utils/distance";
import React, { useMemo } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

interface BarWithDistance extends Bar {
	distance: number;
}

interface BarListViewProps {
	bars: Bar[] | undefined;
	isLoading: boolean;
	userLatitude: number;
	userLongitude: number;
	onSelectBar: (bar: Bar) => void;
}

export function BarListView({
	bars,
	isLoading,
	userLatitude,
	userLongitude,
	onSelectBar,
}: BarListViewProps) {
	// Calculate distances and sort by proximity
	const sortedBars = useMemo<BarWithDistance[]>(() => {
		if (!bars) return [];

		return bars
			.map((bar) => ({
				...bar,
				distance: calculateDistance(
					userLatitude,
					userLongitude,
					bar.latitude,
					bar.longitude,
				),
			}))
			.sort((a, b) => a.distance - b.distance);
	}, [bars, userLatitude, userLongitude]);

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#fff" />
				<Text className="text-white/60 mt-3">Chargement des bars...</Text>
			</View>
		);
	}

	if (sortedBars.length === 0) {
		return (
			<View className="flex-1 items-center justify-center px-6">
				<Text className="text-white text-lg font-semibold text-center">
					Aucun bar trouvé
				</Text>
				<Text className="text-white/60 text-center mt-2">
					Il n'y a pas de bars disponibles pour le moment.
				</Text>
			</View>
		);
	}

	return (
		<ScrollView
			className="flex-1"
			contentContainerStyle={{
				paddingHorizontal: 16,
				paddingTop: 96,
				paddingBottom: 32,
			}}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View className="mb-4">
				<Text className="text-white text-2xl font-bold">Bars à proximité</Text>
				<Text className="text-white/60 mt-1">
					{sortedBars.length} bar{sortedBars.length !== 1 ? "s" : ""} trouvé
					{sortedBars.length !== 1 ? "s" : ""}
				</Text>
			</View>

			{/* Bar list */}
			{sortedBars.map((bar) => (
				<BarListItem
					key={bar.id}
					bar={bar}
					distance={bar.distance}
					onPress={() => onSelectBar(bar)}
				/>
			))}
		</ScrollView>
	);
}
