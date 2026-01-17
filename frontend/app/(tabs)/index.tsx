import { SwipeableTabWrapper } from "@components/navigation/SwipeableTabWrapper";
import { BestSellingOffersCarousel } from "@components/offer/BestSellingOffersCarousel";
import { NearbyOffersCarousel } from "@components/offer/NearbyOffersCarousel";
import { RecentOffersCarousel } from "@components/offer/RecentOffersCarousel";
import { ThemedScreenWrapper } from "@components/ThemedScreenWrapper";
import { Tokens } from "@constants/tokens";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<SwipeableTabWrapper currentRoute="index">
			<ThemedScreenWrapper>
				<View style={styles.container}>
					<Text>Home</Text>
					<NearbyOffersCarousel />
					<BestSellingOffersCarousel />
					<RecentOffersCarousel />
				</View>
			</ThemedScreenWrapper>
		</SwipeableTabWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	welcomeText: {
		fontSize: Tokens.typography.sizes["4xl"],
		fontWeight: Tokens.typography.weights.bold,
		color: Tokens.colors.white,
	},
});
