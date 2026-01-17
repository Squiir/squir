import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { useScannerAccess } from "@hooks/scanner/use-scanner-access";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function ScannerButton() {
	const router = useRouter();
	const { canAccessScanner } = useScannerAccess();

	if (!canAccessScanner) {
		return null;
	}

	return (
		<Pressable
			style={styles.scannerButton}
			onPress={() => router.push("/scanner")}
		>
			<View style={styles.scannerContent}>
				<IconSymbol
					name="camera.fill"
					size={24}
					color={Tokens.colors.pink[300]}
				/>
				<Text style={styles.scannerText}>Scanner un QR code</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	scannerButton: {
		marginHorizontal: Tokens.spacing[6],
		marginTop: -Tokens.spacing[4],
		borderRadius: Tokens.borderRadius.xl,
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: Tokens.appColors.light.primary,
	},
	scannerContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[4],
	},
	scannerText: {
		color: Tokens.appColors.light.primary,
		fontSize: Tokens.typography.sizes.base,
		fontWeight: Tokens.typography.weights.semibold,
		marginLeft: Tokens.spacing[2],
	},
});
