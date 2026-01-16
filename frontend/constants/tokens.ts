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

		// Modern Pink palette
		// Soft pink accents for minimalist design
		pink: {
			text: "#1A1A1A", // Almost black
			background: "#FAFAF9", // Warm off-white
			50: "#FDF2F8", // Lightest pink tint
			100: "#FCE7F3", // Very light pink
			200: "#FBCFE8", // Light pink
			300: "#F9A8D4", // Soft pink
			400: "#EC4899", // Vibrant pink (main)
			500: "#DB2777", // Deep pink
			600: "#BE185D",
			700: "#9D174D",
			800: "#831843",
			900: "#1A1A1A", // Text
		},

		// Semantic colors
		link: "#059669", // emerald-600
		transparent: "transparent",
		white: "#FFFFFF",
		black: "#000000",
	},

	// ========================================
	// APP THEME COLORS - CENTRALIZED
	// Modern Minimalist - Off-white with Pink Accents
	// ========================================
	appColors: {
		light: {
			// Backgrounds - Off-white base
			background: "#FAFAF9", // Warm off-white
			surface: "#FFFFFF", // Pure white for cards
			surfaceSecondary: "#F5F5F4", // Subtle gray for secondary surfaces

			// Text - High contrast
			textPrimary: "#1A1A1A", // Almost black
			textSecondary: "#737373", // Medium gray
			textTertiary: "#A3A3A3", // Light gray

			// Borders - Very subtle
			border: "#E7E5E4", // Subtle border
			borderLight: "#F5F5F4", // Very light border

			// Brand colors - Pink accents
			primary: "#EC4899", // Vibrant pink
			primaryLight: "#F9A8D4", // Light pink
			tint: "#FDF2F8", // Very light pink tint

			// Icons
			icon: "#EC4899", // Pink
			tabIconDefault: "#EC4899", // Gray when inactive
			tabIconSelected: "#EC4899", // Pink when active
		},
		dark: {
			// Backgrounds - Dark theme
			background: "#1A1A1A", // Dark gray
			surface: "#262626", // Lighter dark
			surfaceSecondary: "#171717", // Darker

			// Text
			textPrimary: "#FAFAFA", // Off-white
			textSecondary: "#A3A3A3", // Medium gray
			textTertiary: "#737373", // Darker gray

			// Borders
			border: "#404040", // Subtle dark border
			borderLight: "#262626",

			// Brand colors
			primary: "#F472B6", // Brighter pink for dark mode
			primaryLight: "#F9A8D4",
			tint: "#3F1728", // Dark pink tint

			// Icons
			icon: "#F472B6", // Bright pink
			tabIconDefault: "#A3A3A3",
			tabIconSelected: "#F472B6",
		},
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
