import { TabButton } from "@components/navigation/TabButton";
import { TAB_BAR } from "@constants/tabBar";
import { Tokens } from "@constants/tokens";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
	routes: BottomTabBarProps["state"]["routes"];
	state: BottomTabBarProps["state"];
	descriptors: BottomTabBarProps["descriptors"];
	navigation: BottomTabBarProps["navigation"];
	animatedIndex: SharedValue<number>;
	colors: typeof Tokens.appColors.light;
};

export function TabList({
	routes,
	state,
	descriptors,
	navigation,
	animatedIndex,
	colors,
}: Props) {
	const [mainTabWidth, setMainTabWidth] = useState(0);

	const circleStyle = useAnimatedStyle(() => {
		// Hide when on QR tab (index >= 3)
		if (state.index >= 3) {
			return { opacity: 0, transform: [{ translateX: 0 }] };
		}

		// Use fallback width if not yet measured
		const effectiveWidth = mainTabWidth > 0 ? mainTabWidth : 100;

		return {
			opacity: 1,
			transform: [
				{
					translateX:
						animatedIndex.value * effectiveWidth +
						(effectiveWidth - TAB_BAR.CIRCLE_SIZE) / 2,
				},
			],
		};
	});

	return (
		<View
			style={styles.mainContainer}
			onLayout={(e) => setMainTabWidth(e.nativeEvent.layout.width / 3)}
		>
			<View style={styles.mainGradient}>
				{mainTabWidth > 0 && (
					<Animated.View
						style={[
							styles.circle,
							{ borderColor: Tokens.colors.pink[500] },
							circleStyle,
						]}
					/>
				)}

				<View style={styles.tabs}>
					{routes.map((route, index) => (
						<TabButton
							key={route.key}
							route={route}
							index={index}
							activeIndex={animatedIndex}
							isFocused={state.index === index}
							descriptors={descriptors}
							navigation={navigation}
							colors={colors}
						/>
					))}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		height: TAB_BAR.BAR_HEIGHT,
		borderRadius: TAB_BAR.BAR_HEIGHT / 2,
		overflow: "hidden",
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
	},
	mainGradient: {
		flex: 1,
		flexDirection: "row",
		borderRadius: TAB_BAR.BAR_HEIGHT / 2,
		backgroundColor: Tokens.colors.pink[50],
	},
	tabs: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
	},
	circle: {
		position: "absolute",
		width: TAB_BAR.CIRCLE_SIZE,
		height: TAB_BAR.CIRCLE_SIZE,
		borderRadius: TAB_BAR.CIRCLE_SIZE / 2,
		borderWidth: TAB_BAR.BORDER_WIDTH,
		top: (TAB_BAR.BAR_HEIGHT - TAB_BAR.CIRCLE_SIZE) / 2,
		backgroundColor: `${Tokens.colors.pink[500]}26`, // 15% opacity
	},
});
