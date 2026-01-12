import type { SectionProps } from "@app-types/section";
import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export function Section({ title, children }: SectionProps) {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<View style={styles.container}>
			<Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: Tokens.spacing[3],
	},
	title: {
		fontSize: Tokens.typography.sizes.xl,
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.gray[500],
		textTransform: "uppercase",
	},
	titleDark: {
		color: Tokens.colors.white,
	},
});
