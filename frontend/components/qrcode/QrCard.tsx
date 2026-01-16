import { Tokens } from "@constants/tokens";
import { parseQrLabel, QrCodeGroup } from "@utils/qrcode";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	group: QrCodeGroup;
	onPress: () => void;
};

export function QrCard({ group, onPress }: Props) {
	const { representativeQr, totalCount, availableCount } = group;
	const { barName, offerName, priceText } = parseQrLabel(representativeQr);

	return (
		<Pressable onPress={onPress} style={styles.container}>
			{/* Counter Badge - positioned relative to container */}
			{totalCount > 1 && (
				<View style={styles.countBadge}>
					<Text style={styles.countText}>x{totalCount}</Text>
				</View>
			)}

			<LinearGradient
				colors={[Tokens.colors.pink[50], Tokens.colors.pink[100]]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.card}
			>
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
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Prix</Text>
						<Text style={styles.infoValue}>{priceText ? priceText : "—"}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Disponibles</Text>
						<Text style={styles.infoValue}>{availableCount}</Text>
					</View>
				</View>

				{/* CTA */}
				<View style={styles.cta}>
					<Text style={styles.ctaText}>
						{totalCount > 1 ? "Voir les QR codes" : "Afficher le QR"}
					</Text>
				</View>
			</LinearGradient>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 260,
		paddingTop: 16, // Space for badge above the card
		position: "relative",
	},
	countBadge: {
		position: "absolute",
		top: 0,
		right: 8,
		backgroundColor: Tokens.colors.pink[500],
		borderRadius: Tokens.borderRadius.full,
		minWidth: 36,
		height: 36,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: Tokens.spacing[3],
		zIndex: 10,
		borderWidth: 3,
		borderColor: Tokens.colors.pink[50],
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 4,
	},
	countText: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.sm,
		fontWeight: "800",
	},
	card: {
		borderRadius: Tokens.borderRadius["2xl"],
		borderWidth: 1,
		borderColor: Tokens.colors.pink[200],
		padding: Tokens.spacing[4],
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 6,
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
		color: Tokens.colors.pink[900],
		fontWeight: "800",
		fontSize: Tokens.typography.sizes.base,
	},
	subtitle: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.xs,
		marginTop: Tokens.spacing[1],
	},
	infoContainer: {
		marginTop: Tokens.spacing[4],
		backgroundColor: `${Tokens.colors.pink[400]}26`, // 15% opacity
		borderRadius: Tokens.borderRadius.lg,
		padding: Tokens.spacing[3],
		gap: Tokens.spacing[2],
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	infoLabel: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.xs,
	},
	infoValue: {
		color: Tokens.colors.pink[900],
		fontSize: Tokens.typography.sizes.xs,
		fontWeight: "600",
	},
	cta: {
		marginTop: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.lg,
		backgroundColor: Tokens.colors.pink[500],
		paddingVertical: Tokens.spacing[3],
		alignItems: "center",
	},
	ctaText: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.sm,
		fontWeight: "600",
	},
});
