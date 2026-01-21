import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View } from "react-native";

export function EmptyOffersList() {
	return (
		<View style={styles.container}>
			<IconSymbol name="tag.slash" size={32} color={Tokens.colors.pink[300]} />
			<Text style={styles.text}>Aucune offre disponible</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingVertical: Tokens.spacing[8],
	},
	text: {
		color: Tokens.colors.gray[500],
		marginTop: Tokens.spacing[2],
	},
});
