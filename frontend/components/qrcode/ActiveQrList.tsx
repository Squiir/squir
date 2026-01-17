import { QrCard } from "@components/qrcode/QrCard";
import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { QrCodeGroup } from "@utils/qrcode";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type Props = {
	groupedQrCodes: QrCodeGroup[] | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	onSelectGroup: (group: QrCodeGroup) => void;
};

export function ActiveQrList({
	groupedQrCodes,
	isLoading,
	isError,
	error,
	onSelectGroup,
}: Props) {
	if (isLoading) {
		return (
			<View style={styles.stateContainer}>
				<Text style={styles.loadingText}>Chargement...</Text>
			</View>
		);
	}

	if (isError) {
		return (
			<View style={styles.stateContainer}>
				<Text style={styles.errorText}>
					{error instanceof Error ? error.message : "Erreur de chargement"}
				</Text>
			</View>
		);
	}

	if (!groupedQrCodes || groupedQrCodes.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<View style={styles.emptyIcon}>
					<IconSymbol name="qrcode" size={48} color={Tokens.colors.pink[300]} />
				</View>
				<Text style={styles.emptyTitle}>Aucun QR code</Text>
				<Text style={styles.emptySubtitle}>
					Explorez les offres sur la carte pour commencer
				</Text>
			</View>
		);
	}

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={styles.qrList}>
				{groupedQrCodes.map((group, index) => (
					<QrCard
						key={`${group.offerId}-${index}`}
						group={group}
						onPress={() => onSelectGroup(group)}
					/>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	stateContainer: {
		paddingVertical: Tokens.spacing[6],
		alignItems: "center",
	},
	loadingText: {
		color: Tokens.colors.pink[300],
		fontSize: Tokens.typography.sizes.base,
	},
	errorText: {
		color: Tokens.colors.red[500],
	},
	emptyContainer: {
		alignItems: "center",
		paddingVertical: Tokens.spacing[10],
		paddingHorizontal: Tokens.spacing[6],
		backgroundColor: `${Tokens.colors.pink[400]}1A`, // 10% opacity
		borderRadius: Tokens.borderRadius["2xl"],
		borderWidth: 1,
		borderColor: `${Tokens.colors.pink[400]}33`, // 20% opacity
		borderStyle: "dashed",
	},
	emptyIcon: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: `${Tokens.colors.pink[400]}26`, // 15% opacity
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	emptyTitle: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.semibold,
		marginBottom: Tokens.spacing[1],
	},
	emptySubtitle: {
		color: Tokens.colors.pink[300],
		fontSize: Tokens.typography.sizes.sm,
		textAlign: "center",
	},
	qrList: {
		flexDirection: "row",
		gap: Tokens.spacing[4],
		paddingRight: Tokens.spacing[4],
	},
});
