import { TAB_BAR, TAB_BAR_ANIMATION } from "@constants/tabBar";
import { Tokens } from "@constants/tokens";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { TabButton } from "./TabButton";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	// Use centralized theme colors
	const colors = Tokens.appColors.light;

	// Separate main tabs (first 3) from QR tab (last 1)
	const mainRoutes = state.routes.slice(0, 3);
	const qrRoute = state.routes[3];

	const [mainTabWidth, setMainTabWidth] = React.useState(0);

	// Use shared value initialized to current index to avoid initial animation
	const animatedIndex = useSharedValue(state.index < 3 ? state.index : 0);

	// Only animate when index actually changes
	React.useEffect(() => {
		if (state.index < 3) {
			animatedIndex.value = withSpring(state.index, {
				damping: TAB_BAR_ANIMATION.SPRING_DAMPING,
				stiffness: TAB_BAR_ANIMATION.SPRING_STIFFNESS,
				mass: TAB_BAR_ANIMATION.SPRING_MASS,
			});
		}
	}, [state.index]);

	const circleStyle = useAnimatedStyle(() => {
		// Hide when on QR tab
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
		<View style={styles.wrapper}>
			{/* Main tabs container (Home, Map, Profile) */}
			<View
				style={styles.mainContainer}
				onLayout={(e) => setMainTabWidth(e.nativeEvent.layout.width / 3)}
			>
				<LinearGradient
					colors={[Tokens.colors.pink[50], Tokens.colors.pink[100]]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.mainGradient}
				>
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
						{mainRoutes.map((route, index) => (
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
				</LinearGradient>
			</View>

			{/* Small gap instead of arc */}
			<View style={styles.gap} />

			{/* QR tab container */}
			<LinearGradient
				colors={[Tokens.colors.pink[400], Tokens.colors.pink[500]]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={[
					styles.qrContainer,
					state.index === 3 && styles.qrContainerActive,
				]}
			>
				<TabButton
					key={qrRoute.key}
					route={qrRoute}
					index={3}
					activeIndex={animatedIndex}
					isFocused={state.index === 3}
					descriptors={descriptors}
					navigation={navigation}
					colors={colors}
				/>
			</LinearGradient>
		</View>
	);
}

const QR_TAB_SIZE = 64;

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		bottom: TAB_BAR.BOTTOM_SPACING,
		left: TAB_BAR.HORIZONTAL_SPACING,
		right: TAB_BAR.HORIZONTAL_SPACING,
		flexDirection: "row",
		alignItems: "center",
	},
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
		// No border as requested
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
	gap: {
		width: 12,
	},
	qrContainer: {
		width: QR_TAB_SIZE,
		height: QR_TAB_SIZE,
		borderRadius: QR_TAB_SIZE / 2,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: Tokens.colors.pink[500],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.35,
		shadowRadius: 12,
		elevation: 8,
	},
	qrContainerActive: {
		borderWidth: 3,
		borderColor: Tokens.colors.white,
	},
});
