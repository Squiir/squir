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

	// Gradient colors based on theme - indigo to sage
	const gradientColors =
		colorScheme === "dark"
			? (["#0B0B12", "#16161F", "#12141A"] as const) // Deep indigo gradient
			: ([Tokens.colors.pink[50], Tokens.colors.pink[100]] as const); // Light cool gradient

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
