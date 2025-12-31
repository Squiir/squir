import { TAB_BAR, TAB_BAR_ANIMATION } from "@constants/tabBar";
import { Colors } from "@constants/theme";
import { useColorScheme } from "@hooks/color/use-color-scheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
} from "react-native-reanimated";

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

interface TabButtonProps {
	route: any;
	index: number;
	activeIndex: SharedValue<number>;
	isFocused: boolean;
	descriptors: BottomTabBarProps["descriptors"];
	navigation: BottomTabBarProps["navigation"];
	colors: typeof Colors.light;
}

function TabButton({
	route,
	index,
	activeIndex,
	isFocused,
	descriptors,
	navigation,
	colors,
}: TabButtonProps) {
	const { options } = descriptors[route.key];

	const handlePress = () => {
		if (process.env.EXPO_OS === "ios") {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}

		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true,
		});

		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name, route.params);
		}
	};

	const iconStyle = useAnimatedStyle(() => {
		const distance = Math.abs(activeIndex.value - index);
		const scale =
			1 + TAB_BAR_ANIMATION.ICON_SCALE_FACTOR * (1 - Math.min(distance, 1));
		return { transform: [{ scale }] };
	});

	return (
		<Pressable onPress={handlePress} style={styles.tab} hitSlop={10}>
			<Animated.View style={iconStyle}>
				{options.tabBarIcon?.({
					focused: isFocused,
					color: isFocused ? colors.tint : colors.icon,
					size: 24,
				})}
			</Animated.View>
		</Pressable>
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
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
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
