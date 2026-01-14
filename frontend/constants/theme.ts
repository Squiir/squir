/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This app uses StyleSheet.create with design tokens from constants/tokens.ts for styling.
 */

import { Platform } from "react-native";

export const Colors = {
	light: {
		background: "#FCFCFD", // Cool white
		surface: "#F5F4F9",
		textPrimary: "#0D0D18",
		textSecondary: "#6663A9",
		border: "#E8E6F0",

		primary: "#6663A9", // Purple
		tint: "#AB87BD", // Orchid accent

		icon: "#BFAAD0", // Pink-lavender
		tabIconDefault: "#BFAAD0",
		tabIconSelected: "#6663A9",
	},
	dark: {
		background: "#0D0D18", // Deep purple-black
		surface: "#1A1A28",
		textPrimary: "#FCFCFD",
		textSecondary: "#BFAAD0",
		border: "#2A2A38",

		primary: "#6663A9", // Purple
		tint: "#AB87BD", // Orchid accent

		icon: "#BFAAD0", // Pink-lavender
		tabIconDefault: "#BFAAD0",
		tabIconSelected: "#AB87BD",
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
