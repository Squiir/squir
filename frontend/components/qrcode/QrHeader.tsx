import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// Calculate responsive font size for 66% width
// Adjusted to be slightly bigger as requested (divided by 8.5 instead of 10)
const { width } = Dimensions.get("window");
const responsiveFontSize = (width * 0.66) / 8.5;

export function QrHeader() {
	return (
		<View style={styles.headerBar}>
			<View style={styles.headerContentContainer}>
				<IconSymbol
					name="qrcode.viewfinder"
					size={responsiveFontSize}
					color={Tokens.colors.pink[100]}
				/>
				<Text
					style={[styles.headerTitle, { fontSize: responsiveFontSize }]}
					numberOfLines={1}
				>
					Mes QR Codes
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	headerBar: {
		alignItems: "center", // Center the 66% container
		justifyContent: "center",
		paddingVertical: Tokens.spacing[8],
	},
	headerContentContainer: {
		width: "66%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headerTitle: {
		fontFamily: "Montserrat",
		color: Tokens.colors.pink[100],
		marginLeft: Tokens.spacing[2],
		flex: 1,
		textAlign: "center",
	},
});
