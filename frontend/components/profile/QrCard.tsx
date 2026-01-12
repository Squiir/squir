import { ThemedText } from "@components/ThemedText";
import { Tokens } from "@constants/tokens";
import { useThemeColor } from "@hooks/color/use-theme-color";
import { StyleSheet, View } from "react-native";

export function QrCard({ label }: { label: string }) {
	const surface = useThemeColor({}, "surface");
	const background = useThemeColor({}, "background");
	const text = useThemeColor({}, "textPrimary");

	return (
		<View style={[styles.container, { backgroundColor: surface }]}>
			<View style={[styles.qrPlaceholder, { backgroundColor: background }]} />
			<ThemedText style={{ color: text }}>{label}</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 180,
		borderRadius: 16,
		padding: Tokens.spacing[4],
		marginRight: Tokens.spacing[3],
		justifyContent: "space-between",
	},
	qrPlaceholder: {
		flex: 1,
		borderRadius: 12,
		marginBottom: Tokens.spacing[3],
	},
});
