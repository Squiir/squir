import { ThemedText } from "@components/ThemedText";
import { Tokens } from "@constants/tokens";
import { StyleSheet } from "react-native";

export function SectionHeader({ title }: { title: string }) {
	return <ThemedText style={styles.title}>{title}</ThemedText>;
}

const styles = StyleSheet.create({
	title: {
		marginTop: Tokens.spacing[4],
		marginBottom: Tokens.spacing[2],
		opacity: 0.9,
	},
});
