import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View } from "react-native";

type BadgeVariant = "ok" | "warn";

type BadgeProps = {
	text: string;
	variant?: BadgeVariant;
};

export function Badge({ text, variant = "ok" }: BadgeProps) {
	return (
		<View style={[styles.base, styles[variant]]}>
			<Text style={[styles.text, styles[`${variant}Text`]]}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		minWidth: 40,
		height: 24,
		paddingHorizontal: 10,
		borderRadius: Tokens.borderRadius.full,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	// Variants
	ok: {
		backgroundColor: "rgba(90, 200, 120, 0.18)",
		borderColor: "rgba(90, 200, 120, 0.35)",
	},
	warn: {
		backgroundColor: "rgba(255, 200, 0, 0.18)",
		borderColor: "rgba(255, 200, 0, 0.35)",
	},

	// Text
	text: {
		fontSize: 11,
		fontWeight: "900",
		lineHeight: 12,
	},
	okText: {
		color: "rgba(170, 255, 200, 1)",
	},
	warnText: {
		color: "rgba(255, 220, 120, 1)",
	},
});
