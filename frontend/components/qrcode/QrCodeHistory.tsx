import { QrCode } from "@app-types/qrcode";
import { QrCodeHistoryCard } from "@components/qrcode/QrCodeHistoryCard";
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
			<Text style={styles.title}>Historique des consommations</Text>

			{isLoading ? (
				<ActivityIndicator color={Tokens.colors.white} />
			) : history && history.length > 0 ? (
				<ScrollView style={styles.scrollView}>
					{history.map((item: QrCode) => (
						<QrCodeHistoryCard key={item.id} item={item} />
					))}
				</ScrollView>
			) : (
				<Text style={styles.emptyText}>Aucun historique</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: Tokens.spacing[8],
		paddingHorizontal: Tokens.spacing[6],
		paddingBottom: Tokens.spacing[6],
	},
	title: {
		fontSize: Tokens.typography.sizes["2xl"],
		fontWeight: Tokens.typography.weights.bold,
		marginBottom: Tokens.spacing[4],
		color: Tokens.colors.white,
	},
	scrollView: {
		maxHeight: 384,
	},
	emptyText: {
		color: "rgba(255, 255, 255, 0.5)",
		textAlign: "center",
	},
});
