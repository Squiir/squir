import { QrCode } from "@app-types/qrcode";
import { QrCodeHistoryCard } from "@components/qrcode/QrCodeHistoryCard";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { useGetHistory } from "@hooks/qrcode/use-get-history";
import React from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

export function QrCodeHistory() {
	const { data: history, isLoading } = useGetHistory();

	return (
		<View style={styles.container}>
			{/* Section Header */}
			<View style={styles.headerRow}>
				<View style={styles.sectionDot} />
				<Text style={styles.title}>Historique</Text>
			</View>

			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator color={Tokens.colors.pink[400]} />
				</View>
			) : history && history.length > 0 ? (
				<ScrollView style={styles.scrollView}>
					{history.map((item: QrCode) => (
						<QrCodeHistoryCard key={item.id} item={item} />
					))}
				</ScrollView>
			) : (
				<View style={styles.emptyContainer}>
					<IconSymbol
						name="clock.arrow.circlepath"
						size={32}
						color={Tokens.colors.pink[300]}
					/>
					<Text style={styles.emptyText}>Aucun historique</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: Tokens.spacing[8],
		paddingHorizontal: Tokens.spacing[4],
		paddingBottom: Tokens.spacing[6],
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	sectionDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Tokens.colors.pink[400],
		marginRight: Tokens.spacing[2],
	},
	title: {
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.white,
	},
	loadingContainer: {
		paddingVertical: Tokens.spacing[6],
		alignItems: "center",
	},
	scrollView: {
		maxHeight: 384,
	},
	emptyContainer: {
		alignItems: "center",
		paddingVertical: Tokens.spacing[6],
		backgroundColor: "rgba(192, 145, 243, 0.1)",
		borderRadius: Tokens.borderRadius.xl,
		gap: Tokens.spacing[2],
	},
	emptyText: {
		color: Tokens.colors.pink[300],
		textAlign: "center",
		fontSize: Tokens.typography.sizes.sm,
	},
});
