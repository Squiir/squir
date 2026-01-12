import { ListItemProps } from "@app-types/list-item";
import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function ListItem({ title, subtitle, right, onPress }: ListItemProps) {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	return (
		<Pressable onPress={onPress} style={styles.container}>
			<View>
				<Text style={[styles.title, isDark && styles.titleDark]}>{title}</Text>
				{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
			</View>
			{right}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: Tokens.spacing[4],
	},
	title: {
		fontSize: Tokens.typography.sizes.base,
		fontWeight: Tokens.typography.weights.medium,
		color: Tokens.colors.black,
	},
	titleDark: {
		color: Tokens.colors.white,
	},
	subtitle: {
		fontSize: Tokens.typography.sizes.sm,
		color: Tokens.colors.gray[500],
	},
});
