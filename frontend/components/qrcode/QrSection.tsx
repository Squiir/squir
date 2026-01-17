import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View, ViewProps } from "react-native";

type Props = ViewProps & {
	title: string;
};

export function QrSection({ title, children, style, ...props }: Props) {
	return (
		<View style={[styles.section, style]} {...props}>
			<View style={styles.sectionHeader}>
				<View style={styles.sectionDot} />
				<Text style={styles.sectionTitle}>{title}</Text>
			</View>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	section: {
		marginTop: Tokens.spacing[8],
		paddingHorizontal: Tokens.spacing[6],
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	sectionDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Tokens.appColors.light.primary,
		marginRight: Tokens.spacing[2],
	},
	sectionTitle: {
		color: Tokens.colors.white,
		fontSize: Tokens.typography.sizes.lg,
		fontWeight: Tokens.typography.weights.bold,
	},
});
