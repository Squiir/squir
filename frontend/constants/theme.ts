/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This app uses StyleSheet.create with design tokens from constants/tokens.ts for styling.
 */

import { Platform } from "react-native";

export const Colors = {
	light: {
		background: "#F6FAF4", // Natural white
		surface: "#EBF5E8",
		textPrimary: "#121A0D",
		textSecondary: "#579C3A",
		border: "#D4EACD",

		primary: "#7EBE59", // Fresh green
		tint: "#93D26D", // Lime accent

		icon: "#A9D88E", // Light green
		tabIconDefault: "#A9D88E",
		tabIconSelected: "#7EBE59",
	},
	dark: {
		background: "#121A0D", // Deep forest
		surface: "#1C2816",
		textPrimary: "#F6FAF4",
		textSecondary: "#A9D88E",
		border: "#283620",

		primary: "#7EBE59", // Fresh green
		tint: "#93D26D", // Lime accent

		icon: "#A9D88E", // Light green
		tabIconDefault: "#A9D88E",
		tabIconSelected: "#93D26D",
	},
};

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: "system-ui",
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: "ui-serif",
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: "ui-rounded",
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});
