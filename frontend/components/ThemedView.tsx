import { View, type ViewProps } from "react-native";

import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { LinearGradient } from "expo-linear-gradient";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
	gradient?: boolean;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	gradient = true,
	...otherProps
}: ThemedViewProps) {
	const colorScheme = useColorScheme() ?? "dark";

	// Gradient colors based on theme - warm orange to purple
	const gradientColors =
		colorScheme === "dark"
			? (["#0B0600", "#1A1408", "#150A18"] as const) // Warm dark to purple-tint gradient
			: ([Tokens.colors.pink[50], Tokens.colors.pink[100]] as const); // Warm light gradient

	if (gradient) {
		return (
			<LinearGradient
				colors={gradientColors}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={[{ flex: 1 }, style]}
				{...otherProps}
			/>
		);
	}

	const backgroundColor =
		colorScheme === "dark"
			? (darkColor ?? "#1A0A2E")
			: (lightColor ?? "#FAF7FD");

	return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
