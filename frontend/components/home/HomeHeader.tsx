import { IconSymbol } from "@components/ui/IconSymbol";
import { Tokens } from "@constants/tokens";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const responsiveFontSize = (width * 0.66) / 8.5;

export function HomeHeader() {
	return (
		<View style={styles.headerBar}>
			<View style={styles.headerContentContainer}>
				<IconSymbol
					name="house.fill"
					size={responsiveFontSize}
					color={Tokens.colors.pink[100]}
				/>
				<Text
					style={[styles.headerTitle, { fontSize: responsiveFontSize }]}
					numberOfLines={1}
				>
					Accueil
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	headerBar: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: Tokens.spacing[8],
	},
	headerContentContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: Tokens.spacing[3],
	},
	headerTitle: {
		fontFamily: "Montserrat",
		color: Tokens.colors.pink[100],
	},
});
