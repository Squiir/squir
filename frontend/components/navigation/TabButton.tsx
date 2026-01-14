import { Colors } from "@constants/theme";
import { useTabIconAnimation } from "@hooks/animation/use-tab-icon-animation";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Route } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";

interface TabButtonProps {
	route: Route<string>;
	index: number;
	activeIndex: SharedValue<number>;
	isFocused: boolean;
	descriptors: BottomTabBarProps["descriptors"];
	navigation: BottomTabBarProps["navigation"];
	colors: typeof Colors.light;
}

export function TabButton({
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

	const iconStyle = useTabIconAnimation(activeIndex, index);

	return (
		<Pressable onPress={handlePress} style={styles.tab} hitSlop={10}>
			<Animated.View style={iconStyle}>
				{options.tabBarIcon?.({
					focused: isFocused,
					color: isFocused ? colors.tabIconSelected : colors.tabIconDefault,
					size: 24,
				})}
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
});
