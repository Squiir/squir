import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedViewProps) {
	const colorScheme = useColorScheme() ?? "dark";

	// Get background color from centralized theme
	const backgroundColor =
		lightColor ??
		darkColor ??
		(colorScheme === "dark"
			? Tokens.appColors.dark.background
			: Tokens.appColors.light.background);

	return <View style={[{ flex: 1, backgroundColor }, style]} {...otherProps} />;
}
