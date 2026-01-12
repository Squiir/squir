import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import { Tokens } from "@constants/tokens";

export default function ModalScreen() {
	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title">This is a modal</ThemedText>
			<Link href="/" dismissTo style={styles.link}>
				<ThemedText type="link">Go to home screen</ThemedText>
			</Link>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: Tokens.spacing[5],
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
