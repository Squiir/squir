/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This app uses StyleSheet.create with design tokens from constants/tokens.ts for styling.
 */

import { Platform } from "react-native";

export const Colors = {
	light: {
		background: "#F7F7FA", // Cool off-white
		surface: "#EDEDF2",
		textPrimary: "#0B0B12",
		textSecondary: "#62639D",
		border: "#DDDDE6",

		primary: "#62639D", // Indigo
		tint: "#B0B98F", // Sage accent

		icon: "#CCB9AD", // Beige
		tabIconDefault: "#CCB9AD",
		tabIconSelected: "#62639D",
	},
	dark: {
		background: "#0B0B12", // Deep indigo-black
		surface: "#16161F",
		textPrimary: "#F7F7FA",
		textSecondary: "#CCB9AD",
		border: "#25252F",

		primary: "#62639D", // Indigo
		tint: "#B0B98F", // Sage accent

		icon: "#CCB9AD", // Beige
		tabIconDefault: "#CCB9AD",
		tabIconSelected: "#B0B98F",
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
