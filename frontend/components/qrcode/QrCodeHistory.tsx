import { QrCode } from "@app-types/qrcode";
import { QrCodeHistoryCard } from "@components/qrcode/QrCodeHistoryCard";
import { QrSection } from "@components/qrcode/QrSection";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { useGetHistory } from "@hooks/qrcode/use-get-history";
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
		<QrSection title="Historique" style={styles.container}>
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
		</QrSection>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: Tokens.spacing[6],
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
		backgroundColor: `${Tokens.colors.pink[400]}1A`, // 10% opacity
		borderRadius: Tokens.borderRadius.xl,
		gap: Tokens.spacing[2],
	},
	emptyText: {
		color: Tokens.colors.pink[300],
		textAlign: "center",
		fontSize: Tokens.typography.sizes.sm,
	},
});
