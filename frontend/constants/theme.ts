/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This app uses StyleSheet.create with design tokens from constants/tokens.ts for styling.
 */

import { Platform } from "react-native";

export const Colors = {
	light: {
		background: "#F7F8F4", // Warm off-white
		surface: "#ECEEE8",
		textPrimary: "#161910",
		textSecondary: "#64557C",
		border: "#D9DDD2",

		primary: "#889B65", // Olive green
		tint: "#9D8EB5", // Lavender accent

		icon: "#A6B2C5", // Soft blue
		tabIconDefault: "#A6B2C5",
		tabIconSelected: "#9D8EB5",
	},
	dark: {
		background: "#161910", // Deep olive
		surface: "#1F231A",
		textPrimary: "#F7F8F4",
		textSecondary: "#A6B2C5",
		border: "#2A2E24",

		primary: "#889B65", // Olive green
		tint: "#9D8EB5", // Lavender accent

		icon: "#A6B2C5", // Soft blue
		tabIconDefault: "#A6B2C5",
		tabIconSelected: "#9D8EB5",
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
