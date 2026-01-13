import { Tokens } from "@constants/tokens";
import { parseQrLabel, QrCodeGroup } from "@utils/qrcode";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	group: QrCodeGroup;
	onPress: () => void;
};

export function QrCard({ group, onPress }: Props) {
	const { representativeQr, totalCount, availableCount, usedCount } = group;
	const { barName, offerName, priceText } = parseQrLabel(representativeQr);

	return (
		<Pressable onPress={onPress} style={styles.container}>
			{/* Counter Badge */}
			{totalCount > 1 && (
				<View style={styles.countBadge}>
					<Text style={styles.countText}>x{totalCount}</Text>
				</View>
			)}

			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<Text style={styles.title} numberOfLines={1}>
						{offerName || representativeQr.label || "Offre"}
					</Text>
					<Text style={styles.subtitle} numberOfLines={1}>
						{barName
							? `Chez ${barName}`
							: representativeQr.offer?.bar?.name
								? `Chez ${representativeQr.offer.bar.name}`
								: "Bar inconnu"}
					</Text>
				</View>
			</View>

			{/* Infos */}
			<View style={styles.infoContainer}>
				<Text style={styles.infoText}>
					{priceText ? `Prix: ${priceText}` : "Prix: —"}
				</Text>
				<Text style={styles.infoText}>
					{`${availableCount} disponible${availableCount > 1 ? "s" : ""}`}
				</Text>
			</View>

			{/* CTA */}
			<View style={styles.cta}>
				<Text style={styles.ctaText}>
					{totalCount > 1 ? "Voir les QR codes" : "Afficher le QR"}
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 260,
		borderRadius: Tokens.borderRadius["2xl"],
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.1)",
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		padding: Tokens.spacing[4],
		position: "relative",
	},
	countBadge: {
		position: "absolute",
		top: -8,
		right: -8,
		backgroundColor: Tokens.colors.primary[500],
		borderRadius: Tokens.borderRadius.full,
		minWidth: 28,
		height: 28,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: Tokens.spacing[2],
		zIndex: 1,
	},
	countText: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.sm,
		fontWeight: "800",
	},
	header: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	headerContent: {
		flex: 1,
		paddingRight: Tokens.spacing[2],
	},
	title: {
		color: Tokens.colors.white,
		fontWeight: "800",
		fontSize: Tokens.typography.sizes.base,
	},
	subtitle: {
		color: "rgba(255, 255, 255, 0.7)",
		fontSize: Tokens.typography.sizes.xs,
		marginTop: Tokens.spacing[1],
	},
	infoContainer: {
		marginTop: Tokens.spacing[3],
		gap: 4,
	},
	infoText: {
		color: "rgba(255, 255, 255, 0.6)",
		fontSize: Tokens.typography.sizes.xs,
	},
	cta: {
		marginTop: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.1)",
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		padding: Tokens.spacing[4],
		alignItems: "center",
	},
	ctaText: {
		color: "rgba(255, 255, 255, 0.7)",
		fontSize: Tokens.typography.sizes.xs,
	},
});
