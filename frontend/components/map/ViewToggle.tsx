import { IconSymbol, IconSymbolName } from "@components/ui/IconSymbol";
import React from "react";
import { Pressable, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export type ViewMode = "map" | "list";

interface ViewToggleProps {
	mode: ViewMode;
	onChange: (mode: ViewMode) => void;
}

interface ToggleOption {
	value: ViewMode;
	icon: IconSymbolName;
}

const OPTIONS: ToggleOption[] = [
	{ value: "map", icon: "map.fill" },
	{ value: "list", icon: "list.bullet" },
];

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
	const translateX = useSharedValue(mode === "map" ? 0 : 1);

	const handlePress = (newMode: ViewMode) => {
		translateX.value = withTiming(newMode === "map" ? 0 : 1, { duration: 200 });
		onChange(newMode);
	};

	const animatedIndicatorStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value * 44 }],
	}));

	return (
		<View className="absolute top-14 left-0 right-0 z-10 items-center">
			<View className="flex-row bg-black/60 rounded-full p-1 backdrop-blur-sm">
				{/* Animated indicator */}
				<Animated.View
					style={animatedIndicatorStyle}
					className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full"
				/>

				{/* Toggle buttons */}
				{OPTIONS.map((option) => (
					<Pressable
						key={option.value}
						onPress={() => handlePress(option.value)}
						className="w-10 h-10 items-center justify-center"
					>
						<IconSymbol
							name={option.icon}
							size={22}
							color={mode === option.value ? "#000" : "#fff"}
						/>
					</Pressable>
				))}
			</View>
		</View>
	);
}
