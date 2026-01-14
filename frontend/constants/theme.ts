/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This app uses StyleSheet.create with design tokens from constants/tokens.ts for styling.
 */

import { Platform } from "react-native";

export const Colors = {
	light: {
		background: "#FEF5FA", // Warm pink-white
		surface: "#FDEAF3",
		textPrimary: "#0F0207",
		textSecondary: "#E43087",
		border: "#FAD4E5",

		primary: "#E43087", // Hot pink
		tint: "#CEE957", // Lime accent

		icon: "#F0DE8D", // Yellow
		tabIconDefault: "#F0DE8D",
		tabIconSelected: "#E43087",
	},
	dark: {
		background: "#0F0207", // Deep pink-black
		surface: "#1F0A14",
		textPrimary: "#FEF5FA",
		textSecondary: "#F0DE8D",
		border: "#2F1220",

		primary: "#E43087", // Hot pink
		tint: "#CEE957", // Lime accent

		icon: "#F0DE8D", // Yellow
		tabIconDefault: "#F0DE8D",
		tabIconSelected: "#E43087",
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
