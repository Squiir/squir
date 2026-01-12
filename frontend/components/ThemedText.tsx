import { Tokens } from "@constants/tokens";
import { useThemeColor } from "@hooks/color/use-theme-color";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const color = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"textPrimary",
	);

	return <Text style={[{ color }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
	default: {
		fontSize: Tokens.typography.sizes.base,
		lineHeight: Tokens.typography.lineHeights.normal,
		fontWeight: Tokens.typography.weights.normal,
	},
	title: {
		fontSize: Tokens.typography.sizes["4xl"],
		lineHeight: Tokens.typography.lineHeights.loose,
		fontWeight: Tokens.typography.weights.bold,
	},
	defaultSemiBold: {
		fontSize: Tokens.typography.sizes.base,
		lineHeight: Tokens.typography.lineHeights.normal,
		fontWeight: Tokens.typography.weights.semibold,
	},
	subtitle: {
		fontSize: Tokens.typography.sizes.xl,
		fontWeight: Tokens.typography.weights.bold,
	},
	link: {
		fontSize: Tokens.typography.sizes.base,
		lineHeight: Tokens.typography.lineHeights.relaxed,
		color: Tokens.colors.link,
	},
});
