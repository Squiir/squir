import { IconSymbol, IconSymbolName } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View } from "react-native";

interface ModalHeaderProps {
	icon: IconSymbolName;
	title: string;
	subtitle: string;
}

export function ModalHeader({ icon, title, subtitle }: ModalHeaderProps) {
	return (
		<View style={styles.header}>
			<View style={styles.iconContainer}>
				<IconSymbol name={icon} size={24} color={Tokens.colors.pink[500]} />
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subtitle}>{subtitle}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Tokens.spacing[4],
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: `${Tokens.colors.pink[400]}26`,
		justifyContent: "center",
		alignItems: "center",
		marginRight: Tokens.spacing[3],
	},
	content: {
		flex: 1,
	},
	title: {
		color: Tokens.colors.gray[900],
		fontSize: Tokens.typography.sizes.xl,
		fontWeight: Tokens.typography.weights.bold,
	},
	subtitle: {
		color: Tokens.colors.pink[500],
		fontSize: Tokens.typography.sizes.sm,
		fontWeight: Tokens.typography.weights.medium,
		marginTop: 2,
	},
});
