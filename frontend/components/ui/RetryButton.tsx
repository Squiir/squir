import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";

export function RetryButton(props: TouchableOpacityProps) {
	return (
		<TouchableOpacity style={styles.button} {...props}>
			<Text style={styles.label}>Réessayer</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		backgroundColor: "#f8f9fa",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	label: {
		fontSize: 12,
		color: "#333",
		fontWeight: "500",
	},
});
