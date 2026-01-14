/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This app uses StyleSheet.create with design tokens from constants/tokens.ts for styling.
 */

import { Platform } from "react-native";

export const Colors = {
	light: {
		background: "#FFFCFA", // Warm white
		surface: "#FFF5ED",
		textPrimary: "#0B0600",
		textSecondary: "#9C35FE",
		border: "#FFE8D9",

		primary: "#FE7D13", // Orange
		tint: "#9C35FE", // Purple accent

		icon: "#7CBDFE", // Sky blue
		tabIconDefault: "#7CBDFE",
		tabIconSelected: "#FE7D13",
	},
	dark: {
		background: "#0B0600", // Deep warm black
		surface: "#1A1408",
		textPrimary: "#FFFCFA",
		textSecondary: "#7CBDFE",
		border: "#2A2210",

		primary: "#FE7D13", // Orange
		tint: "#9C35FE", // Purple accent

		icon: "#7CBDFE", // Sky blue
		tabIconDefault: "#7CBDFE",
		tabIconSelected: "#FE7D13",
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
