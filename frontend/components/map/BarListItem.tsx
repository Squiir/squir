import { Bar } from "@app-types/bar";
import { formatDistance } from "@utils/distance";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface BarListItemProps {
	bar: Bar;
	distance: number; // in km
	onPress: () => void;
}

export function BarListItem({ bar, distance, onPress }: BarListItemProps) {
	const offersCount = bar.offers?.length ?? 0;

	return (
		<Pressable onPress={onPress} className="mb-3">
			<LinearGradient
				colors={["#1a1a2e", "#16213e"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className="rounded-2xl p-4 border border-white/10"
			>
				<View className="flex-row items-center justify-between">
					{/* Left: Bar color indicator + name */}
					<View className="flex-row items-center flex-1">
						<View
							className="w-3 h-3 rounded-full mr-3"
							style={{ backgroundColor: bar.color }}
						/>
						<View className="flex-1">
							<Text className="text-white font-bold text-lg" numberOfLines={1}>
								{bar.name}
							</Text>
							<Text className="text-white/60 text-sm mt-0.5">
								{offersCount} offre{offersCount !== 1 ? "s" : ""} disponible
								{offersCount !== 1 ? "s" : ""}
							</Text>
						</View>
					</View>

					{/* Right: Distance badge */}
					<View className="bg-white/10 px-3 py-1.5 rounded-full ml-3">
						<Text className="text-white font-semibold text-sm">
							{formatDistance(distance)}
						</Text>
					</View>
				</View>
			</LinearGradient>
		</Pressable>
	);
}
