import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View } from "react-native";

type ScannerInstructionsProps = {
	isPending: boolean;
	scanned: boolean;
};

export function ScannerInstructions({
	isPending,
	scanned,
}: ScannerInstructionsProps) {
	const getMessage = () => {
		if (isPending) return "⏳ Traitement en cours...";
		if (scanned) return "✓ QR code détecté !";
		return "Place le QR code dans le cadre";
	};

	return (
		<View style={styles.container}>
			<Text style={styles.message}>{getMessage()}</Text>
			{!scanned && !isPending && (
				<Text style={styles.hint}>Le scan se fait automatiquement</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: Tokens.spacing[8],
		paddingHorizontal: Tokens.spacing[6],
	},
	message: {
		color: Tokens.colors.gray[800],
		textAlign: "center",
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.semibold,
	},
	hint: {
		color: Tokens.colors.gray[600],
		textAlign: "center",
		fontSize: Tokens.typography.sizes.sm,
		marginTop: Tokens.spacing[2],
	},
});
