import { QrCode } from "@app-types/qrcode";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { useLocaleDateString } from "@hooks/formatter/use-locale-date-string";
import { StyleSheet, Text, View } from "react-native";

type QrCodeHistoryCardProps = {
	item: QrCode;
};

export function QrCodeHistoryCard({ item }: QrCodeHistoryCardProps) {
	const formattedDate = useLocaleDateString(
		item.consumedAt ? new Date(item.consumedAt) : new Date(),
		{
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		},
	);

	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<IconSymbol
					name="checkmark.circle.fill"
					size={20}
					color={Tokens.colors.pink[500]}
				/>
			</View>
			<View style={styles.content}>
				<Text style={styles.label} numberOfLines={1}>
					{item.label}
				</Text>
				<Text style={styles.date}>
					Consommé le {item.consumedAt && formattedDate}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Tokens.colors.pink[50],
		padding: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		marginBottom: Tokens.spacing[3],
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Tokens.colors.pink[200],
	},
	iconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: `${Tokens.colors.pink[500]}26`,
		justifyContent: "center",
		alignItems: "center",
		marginRight: Tokens.spacing[3],
	},
	content: {
		flex: 1,
	},
	label: {
		fontWeight: Tokens.typography.weights.semibold,
		fontSize: Tokens.typography.sizes.base,
		color: Tokens.colors.pink[900],
	},
	date: {
		color: Tokens.colors.pink[600],
		fontSize: Tokens.typography.sizes.sm,
		marginTop: Tokens.spacing[1],
	},
});
