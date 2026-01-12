import { QrCode } from "@app-types/qrcode";
import { Tokens } from "@constants/tokens";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type QrCodeHistoryCardProps = {
	item: QrCode;
};

export function QrCodeHistoryCard({ item }: QrCodeHistoryCardProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{item.label}</Text>
			<Text style={styles.date}>
				Consommé le{" "}
				{item.consumedAt &&
					new Date(item.consumedAt).toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "long",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		padding: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.lg,
		marginBottom: Tokens.spacing[3],
	},
	label: {
		fontWeight: Tokens.typography.weights.semibold,
		fontSize: Tokens.typography.sizes.base,
		color: Tokens.colors.white,
	},
	date: {
		color: "rgba(255, 255, 255, 0.7)",
		fontSize: Tokens.typography.sizes.sm,
		marginTop: Tokens.spacing[1],
	},
});
