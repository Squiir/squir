import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { ThemedScreenWrapper } from "@components/ThemedScreenWrapper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<SwipeableTabWrapper currentRoute="index">
			<ThemedScreenWrapper>
				<View style={styles.container}>
					<Text style={styles.welcomeText}>Welcome to SQUIR</Text>
				</View>
			</ThemedScreenWrapper>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	welcomeText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
});
