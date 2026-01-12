import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View } from "react-native";

export function LoyaltyPoints({ points }: { points: number }) {
	return (
		<View style={styles.container}>
			<Text style={styles.points}>{points}</Text>
			<Text style={styles.label}>points de fidélité</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	points: {
		fontSize: Tokens.typography.sizes["3xl"],
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.primary[600],
	},
	label: {
		fontSize: Tokens.typography.sizes.sm,
		color: Tokens.colors.gray[500],
	},
});
