import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { NearbyOffersCarousel } from "@components/offer/NearbyOffersCarousel";
import { ThemedScreenWrapper } from "@components/ThemedScreenWrapper";
import { Tokens } from "@constants/tokens";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<SwipeableTabWrapper currentRoute="index">
			<ThemedScreenWrapper>
				<View>
					<Text>Home</Text>
					<NearbyOffersCarousel />
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
		fontSize: Tokens.typography.sizes["4xl"],
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.white,
	},
});
