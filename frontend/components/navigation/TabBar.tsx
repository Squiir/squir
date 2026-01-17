import { QrTabButton } from "@components/navigation/QrTabButton";
import { TabList } from "@components/navigation/TabList";
import { TAB_BAR, TAB_BAR_ANIMATION } from "@constants/tabBar";
import { Tokens } from "@constants/tokens";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	// Use centralized theme colors
	const colors = Tokens.appColors.light;

	// Separate main tabs (first 3) from QR tab (last 1)
	const mainRoutes = state.routes.slice(0, 3);
	const qrRoute = state.routes[3];

	// Use shared value initialized to current index to avoid initial animation
	const animatedIndex = useSharedValue(state.index < 3 ? state.index : 0);

	// Only animate when index actually changes
	useEffect(() => {
		if (state.index < 3) {
			animatedIndex.value = withSpring(state.index, {
				damping: TAB_BAR_ANIMATION.SPRING_DAMPING,
				stiffness: TAB_BAR_ANIMATION.SPRING_STIFFNESS,
				mass: TAB_BAR_ANIMATION.SPRING_MASS,
			});
		}
	}, [state.index]);

	return (
		<View style={styles.wrapper}>
			{/* Main tabs container (Home, Map, Profile) */}
			<TabList
				routes={mainRoutes}
				state={state}
				descriptors={descriptors}
				navigation={navigation}
				animatedIndex={animatedIndex}
				colors={colors}
			/>

			{/* Small gap instead of arc */}
			<View style={styles.gap} />

			{/* QR tab container */}
			<QrTabButton
				route={qrRoute}
				index={3}
				activeIndex={animatedIndex}
				isFocused={state.index === 3}
				descriptors={descriptors}
				navigation={navigation}
				colors={colors}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		bottom: TAB_BAR.BOTTOM_SPACING,
		left: TAB_BAR.HORIZONTAL_SPACING,
		right: TAB_BAR.HORIZONTAL_SPACING,
		flexDirection: "row",
		alignItems: "center",
	},
	gap: {
		width: 12,
	},
});
