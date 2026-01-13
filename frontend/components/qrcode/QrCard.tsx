import { QrCode } from "@app-types/qrcode";
import { Badge } from "@components/ui/Badge";
import { Tokens } from "@constants/tokens";
import { parseQrLabel } from "@utils/qrcode";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	qr: QrCode;
	onPress: () => void;
};

export function QrCard({ qr, onPress }: Props) {
	const { barName, offerName, priceText } = parseQrLabel(qr);

	return (
		<Pressable onPress={onPress} style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<Text style={styles.title} numberOfLines={1}>
						{offerName || qr.label || "Offre"}
					</Text>
					<Text style={styles.subtitle} numberOfLines={1}>
						{barName
							? `Chez ${barName}`
							: qr.offer?.bar?.name
								? `Chez ${qr.offer.bar.name}`
								: "Bar inconnu"}
					</Text>
				</View>

				<Badge text="QR" variant={qr.used ? "warn" : "ok"} />
			</View>

			{/* Infos */}
			<View style={styles.infoContainer}>
				<Text style={styles.infoText}>
					{priceText ? `Prix: ${priceText}` : "Prix: —"}
				</Text>
				<Text style={styles.infoText}>
					{qr.used ? "Statut: utilisé" : "Statut: disponible"}
				</Text>
			</View>

			{/* CTA */}
			<View style={styles.cta}>
				<Text style={styles.ctaText}>Afficher le QR</Text>
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
