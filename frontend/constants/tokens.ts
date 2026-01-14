/**
 * Design Tokens
 * Valeurs centralisées pour remplacer Tailwind
 */

export const Tokens = {
	colors: {
		// Primary: Emerald (Green Forest)
		primary: {
			50: "#ECFDF5",
			100: "#D1FAE5",
			200: "#A7F3D0",
			300: "#6EE7B7",
			400: "#34D399",
			500: "#10B981",
			600: "#059669",
			700: "#047857",
			800: "#065F46",
			900: "#064E3B",
		},

		// Accent: Gold (for CTAs, badges, special elements)
		accent: {
			50: "#FFFBEB",
			100: "#FEF3C7",
			200: "#FDE68A",
			300: "#FCD34D",
			400: "#FBBF24",
			500: "#F59E0B",
			600: "#D97706",
			700: "#B45309",
		},

		// Gray (neutral scale)
		gray: {
			50: "#F9FAFB",
			100: "#F3F4F6",
			200: "#E5E7EB",
			300: "#D1D5DB",
			400: "#9CA3AF",
			500: "#6B7280",
			600: "#4B5563",
			700: "#374151",
			800: "#1F2937",
			900: "#111827",
		},

		// Red (Danger)
		red: {
			50: "#FEF2F2",
			100: "#FEE2E2",
			500: "#EF4444",
			600: "#DC2626",
			700: "#B91C1C",
		},

		// Green (Success) - using lighter emerald
		green: {
			50: "#F0FDF4",
			100: "#DCFCE7",
			500: "#22C55E",
			600: "#16A34A",
		},

		// Nature-Lavender palette
		// Olive green primary, soft blue secondary, lavender accent
		pink: {
			text: "#161910", // rgb(22, 25, 16)
			background: "#F7F8F4", // rgb(247, 248, 244)
			50: "#F7F8F4", // Background
			100: "#ECEEE8", // Light surface
			200: "#D9DDD2", // Light border
			300: "#889B65", // Primary - Olive green
			400: "#A6B2C5", // Secondary - Soft blue
			500: "#9D8EB5", // Accent - Lavender
			600: "#8A7BA2",
			700: "#77688F",
			800: "#64557C",
			900: "#161910", // Text
		},

		// Semantic colors
		link: "#059669", // emerald-600
		transparent: "transparent",
		white: "#FFFFFF",
		black: "#000000",
	},

	spacing: {
		0: 0,
		1: 4,
		2: 8,
		3: 12,
		4: 16,
		5: 20,
		6: 24,
		8: 32,
		10: 40,
		12: 48,
		16: 64,
	},

	borderRadius: {
		none: 0,
		sm: 4,
		md: 6,
		lg: 8,
		xl: 12,
		"2xl": 16,
		"3xl": 24,
		full: 9999,
	},

	typography: {
		sizes: {
			xs: 12,
			sm: 14,
			base: 16,
			lg: 18,
			xl: 20,
			"2xl": 24,
			"3xl": 30,
			"4xl": 32,
		},
		lineHeights: {
			tight: 20,
			normal: 24,
			relaxed: 30,
			loose: 32,
		},
		weights: {
			normal: "400" as const,
			medium: "500" as const,
			semibold: "600" as const,
			bold: "700" as const,
		},
	},

	shadows: {
		sm: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
			elevation: 1,
		},
		md: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 2,
		},
		lg: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.15,
			shadowRadius: 8,
			elevation: 4,
		},
	},
} as const;
