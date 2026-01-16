import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type Props = {
	count: number;
};

// Calculate responsive font size for 66% width
// Text "Mes QR Codes" + Icon ~= 10-11 units of width
const { width } = Dimensions.get("window");
const responsiveFontSize = (width * 0.66) / 10;

export function QrHeader({ count }: Props) {
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
					<Text
						style={[
							styles.headerSubtitle,
							{ fontSize: responsiveFontSize * 0.5 },
						]}
					>
						{count > 0 ? ` (${count})` : ""}
					</Text>
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
		width: "66%", // Exact request
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between", // Spread icon and text to fill the 66%
	},
	headerTitle: {
		fontFamily: "Montserrat_700Bold",
		fontWeight: "bold",
		color: Tokens.colors.pink[100],
		marginLeft: Tokens.spacing[2],
		flex: 1,
		textAlign: "center",
	},
	headerSubtitle: {
		fontWeight: Tokens.typography.weights.medium,
		color: Tokens.colors.pink[100],
		opacity: 0.8,
		marginLeft: Tokens.spacing[2],
	},
});
