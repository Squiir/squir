/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
	light: {
		background: "#FFFFFF",
		surface: "#F8F9FA",
		textPrimary: "#0A0A0A",
		textSecondary: "#6B7280",
		border: "#E5E7EB",

		primary: "#111827",
		tint: "#111827",

		icon: "#6B7280",
		tabIconDefault: "#9CA3AF",
		tabIconSelected: "#111827",
	},
	dark: {
		background: "#0A0A0A",
		surface: "#161616",
		textPrimary: "#FFFFFF",
		textSecondary: "#9CA3AF",
		border: "#262626",

		primary: "#FFFFFF",
		tint: "#FFFFFF",

		icon: "#9CA3AF",
		tabIconDefault: "#6B7280",
		tabIconSelected: "#FFFFFF",
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
