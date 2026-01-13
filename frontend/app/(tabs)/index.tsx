import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { NearbyOffersCarousel } from "@components/offer/NearbyOffersCarousel";
import { ThemedScreenWrapper } from "@components/ThemedScreenWrapper";
import React from "react";
import { Text, View } from "react-native";

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
