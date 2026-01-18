import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
	onClose: () => void;
}

export function OfferSuccessContent({ onClose }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.icon}>
				<IconSymbol
					name="checkmark.circle.fill"
					size={56}
					color={Tokens.colors.pink[500]}
				/>
			</View>
			<Text style={styles.title}>QR Code ajouté !</Text>
			<Text style={styles.subtitle}>
				Tu peux le retrouver dans l'onglet QR Codes
			</Text>
			<Pressable onPress={onClose} style={styles.button}>
				<Text style={styles.buttonText}>Super !</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingVertical: Tokens.spacing[4],
	},
	icon: {
		marginBottom: Tokens.spacing[4],
	},
	title: {
		color: Tokens.colors.gray[900],
		fontSize: Tokens.typography.sizes.xl,
		fontWeight: Tokens.typography.weights.bold,
		marginBottom: Tokens.spacing[2],
	},
	subtitle: {
		color: Tokens.colors.gray[500],
		fontSize: Tokens.typography.sizes.sm,
		textAlign: "center",
		marginBottom: Tokens.spacing[6],
	},
	button: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: Tokens.spacing[2],
		paddingVertical: Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: Tokens.colors.pink[500],
	},
	buttonText: {
		color: Tokens.colors.white,
		fontWeight: Tokens.typography.weights.bold,
		fontSize: Tokens.typography.sizes.base,
	},
});
