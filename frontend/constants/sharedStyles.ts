/**
 * Shared Styles
 * Styles réutilisables à travers l'app
 */

import { StyleSheet } from "react-native";
import { Tokens } from "./tokens";

export const SharedStyles = StyleSheet.create({
	// ========== Layouts ==========
	flex1: {
		flex: 1,
	},
	flexRow: {
		flexDirection: "row",
	},
	flexColumn: {
		flexDirection: "column",
	},
	flexCenter: {
		alignItems: "center",
		justifyContent: "center",
	},
	itemsCenter: {
		alignItems: "center",
	},
	justifyCenter: {
		justifyContent: "center",
	},
	justifyBetween: {
		justifyContent: "space-between",
	},

	// ========== Spacing ==========
	// Padding
	p1: { padding: Tokens.spacing[1] },
	p2: { padding: Tokens.spacing[2] },
	p3: { padding: Tokens.spacing[3] },
	p4: { padding: Tokens.spacing[4] },
	p5: { padding: Tokens.spacing[5] },
	p6: { padding: Tokens.spacing[6] },

	px1: { paddingHorizontal: Tokens.spacing[1] },
	px2: { paddingHorizontal: Tokens.spacing[2] },
	px3: { paddingHorizontal: Tokens.spacing[3] },
	px4: { paddingHorizontal: Tokens.spacing[4] },
	px5: { paddingHorizontal: Tokens.spacing[5] },
	px6: { paddingHorizontal: Tokens.spacing[6] },

	py1: { paddingVertical: Tokens.spacing[1] },
	py2: { paddingVertical: Tokens.spacing[2] },
	py3: { paddingVertical: Tokens.spacing[3] },
	py4: { paddingVertical: Tokens.spacing[4] },
	py5: { paddingVertical: Tokens.spacing[5] },
	py6: { paddingVertical: Tokens.spacing[6] },

	// Margin
	mt1: { marginTop: Tokens.spacing[1] },
	mt2: { marginTop: Tokens.spacing[2] },
	mt3: { marginTop: Tokens.spacing[3] },
	mt4: { marginTop: Tokens.spacing[4] },

	mb2: { marginBottom: Tokens.spacing[2] },
	mb4: { marginBottom: Tokens.spacing[4] },

	// ========== Border Radius ==========
	roundedSm: { borderRadius: Tokens.borderRadius.sm },
	roundedMd: { borderRadius: Tokens.borderRadius.md },
	roundedLg: { borderRadius: Tokens.borderRadius.lg },
	roundedXl: { borderRadius: Tokens.borderRadius.xl },
	rounded2xl: { borderRadius: Tokens.borderRadius["2xl"] },
	roundedFull: { borderRadius: Tokens.borderRadius.full },

	// ========== Borders ==========
	border: { borderWidth: 1 },
	border2: { borderWidth: 2 },

	borderGray200: { borderColor: Tokens.colors.gray[200] },
	borderGray300: { borderColor: Tokens.colors.gray[300] },
	borderBlue200: { borderColor: Tokens.colors.primary[200] },
	borderBlue600: { borderColor: Tokens.colors.primary[600] },

	// ========== Backgrounds ==========
	bgWhite: { backgroundColor: Tokens.colors.white },
	bgTransparent: { backgroundColor: Tokens.colors.transparent },

	bgGray50: { backgroundColor: Tokens.colors.gray[50] },
	bgGray100: { backgroundColor: Tokens.colors.gray[100] },
	bgGray200: { backgroundColor: Tokens.colors.gray[200] },
	bgGray700: { backgroundColor: Tokens.colors.gray[700] },

	bgBlue50: { backgroundColor: Tokens.colors.primary[50] },
	bgBlue600: { backgroundColor: Tokens.colors.primary[600] },

	bgRed600: { backgroundColor: Tokens.colors.red[600] },

	// ========== Typography ==========
	textXs: { fontSize: Tokens.typography.sizes.xs },
	textSm: { fontSize: Tokens.typography.sizes.sm },
	textBase: { fontSize: Tokens.typography.sizes.base },
	textLg: { fontSize: Tokens.typography.sizes.lg },
	textXl: { fontSize: Tokens.typography.sizes.xl },
	text2xl: { fontSize: Tokens.typography.sizes["2xl"] },
	text4xl: { fontSize: Tokens.typography.sizes["4xl"] },

	leadingTight: { lineHeight: Tokens.typography.lineHeights.tight },
	leadingNormal: { lineHeight: Tokens.typography.lineHeights.normal },
	leadingRelaxed: { lineHeight: Tokens.typography.lineHeights.relaxed },
	leadingLoose: { lineHeight: Tokens.typography.lineHeights.loose },

	fontNormal: { fontWeight: Tokens.typography.weights.normal },
	fontMedium: { fontWeight: Tokens.typography.weights.medium },
	fontSemibold: { fontWeight: Tokens.typography.weights.semibold },
	fontBold: { fontWeight: Tokens.typography.weights.bold },

	textWhite: { color: Tokens.colors.white },
	textBlack: { color: Tokens.colors.black },
	textGray500: { color: Tokens.colors.gray[500] },
	textGray600: { color: Tokens.colors.gray[600] },
	textGray900: { color: Tokens.colors.gray[900] },
	textBlue600: { color: Tokens.colors.primary[600] },
	textLink: { color: Tokens.colors.link },

	// ========== Opacity ==========
	opacity50: { opacity: 0.5 },
	opacity75: { opacity: 0.75 },

	// ========== Shadows ==========
	shadowSm: Tokens.shadows.sm,
	shadowMd: Tokens.shadows.md,
	shadowLg: Tokens.shadows.lg,
});
