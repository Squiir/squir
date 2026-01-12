import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { Tokens } from "@constants/tokens";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SocialScreen() {
	return (
		<SwipeableTabWrapper currentRoute="social">
			<View style={styles.container}>
				<Text style={styles.text}>Social Screen</Text>
			</View>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	text: {
		fontSize: Tokens.typography.sizes.base,
		color: Tokens.colors.gray[500],
	},
});
