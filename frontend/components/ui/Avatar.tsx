import { AvatarProps } from "@app-types/avatar";
import { Tokens } from "@constants/tokens";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { Image, StyleSheet, Text, View } from "react-native";

export function Avatar({ uri, username, size = 80 }: AvatarProps) {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	if (uri) {
		return (
			<Image
				source={{ uri }}
				style={[
					styles.image,
					{ width: size, height: size, borderRadius: size / 2 },
				]}
			/>
		);
	}

	return (
		<View
			style={[
				styles.fallback,
				{ width: size, height: size, borderRadius: size / 2 },
				isDark ? styles.fallbackDark : styles.fallbackLight,
			]}
		>
			<Text style={styles.text}>{username[0]?.toUpperCase()}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		// size et borderRadius appliqués dynamiquement
	},
	fallback: {
		alignItems: "center",
		justifyContent: "center",
	},
	fallbackLight: {
		backgroundColor: Tokens.colors.gray[300],
	},
	fallbackDark: {
		backgroundColor: Tokens.colors.gray[700],
	},
	text: {
		fontSize: Tokens.typography.sizes["3xl"],
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.white,
	},
});
