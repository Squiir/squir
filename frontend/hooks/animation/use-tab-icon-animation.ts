import { TAB_BAR_ANIMATION } from "@constants/tabBar";
import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

/**
 * Custom hook for tab icon scale animation
 * Scales icon based on distance from active tab
 */
export function useTabIconAnimation(
	activeIndex: SharedValue<number>,
	index: number,
) {
	return useAnimatedStyle(() => {
		const distance = Math.abs(activeIndex.value - index);
		const scale =
			1 + TAB_BAR_ANIMATION.ICON_SCALE_FACTOR * (1 - Math.min(distance, 1));
		return { transform: [{ scale }] };
	});
}
