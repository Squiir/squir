import { TAB_BAR, TAB_BAR_ANIMATION } from "@constants/tabBar";
import { Colors } from "@constants/theme";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from "react-native-reanimated";
import { TabButton } from "./TabButton";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const colorScheme = useColorScheme() ?? "light";
	const colors = Colors[colorScheme];
	const [tabWidth, setTabWidth] = React.useState(0);

	const activeIndex = useDerivedValue(() =>
		withSpring(state.index, {
			damping: TAB_BAR_ANIMATION.SPRING_DAMPING,
			stiffness: TAB_BAR_ANIMATION.SPRING_STIFFNESS,
			mass: TAB_BAR_ANIMATION.SPRING_MASS,
		}),
	);

	const circleStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX:
					activeIndex.value * tabWidth + (tabWidth - TAB_BAR.CIRCLE_SIZE) / 2,
			},
		],
	}));

	return (
		<View
			style={[styles.container, { backgroundColor: colors.background }]}
			onLayout={(e) =>
				setTabWidth(e.nativeEvent.layout.width / state.routes.length)
			}
		>
			{tabWidth > 0 && (
				<Animated.View
					style={[styles.circle, { borderColor: colors.tint }, circleStyle]}
				/>
			)}

			<View style={styles.tabs}>
				{state.routes.map((route, index) => (
					<TabButton
						key={route.key}
						route={route}
						index={index}
						activeIndex={activeIndex}
						isFocused={state.index === index}
						descriptors={descriptors}
						navigation={navigation}
						colors={colors}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: TAB_BAR.BOTTOM_SPACING,
		left: TAB_BAR.HORIZONTAL_SPACING,
		right: TAB_BAR.HORIZONTAL_SPACING,
		height: TAB_BAR.BAR_HEIGHT,
		borderRadius: TAB_BAR.BAR_HEIGHT / 2,
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 8,
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
		backgroundColor: "transparent",
	},
});
