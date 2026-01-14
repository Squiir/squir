import { ThemedView } from "@components/ThemedView";
import { SWIPE_GESTURE } from "@constants/swipe-gesture";
import { useTabNavigation } from "@hooks/navigation/useTabNavigation";
import {
	NavigateTo,
	getCurrentTabIndex,
	isLeftSwipe,
	isRightSwipe,
	isValidEdgeGesture,
	isVerticalScroll,
} from "@utils/swipe";
import React, { PropsWithChildren } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

interface SwipeableTabWrapperProps extends PropsWithChildren {
	currentRoute: string;
	/**
	 * If true, swipe gestures will only work from the edges of the screen.
	 * Useful for screens with interactive content like maps.
	 */
	edgeSwipeOnly?: boolean;
}

export function SwipeableTabWrapper({
	children,
	currentRoute,
	edgeSwipeOnly = false,
}: SwipeableTabWrapperProps) {
	const { navigateToTab } = useTabNavigation();
	const { width: screenWidth } = useWindowDimensions();
	const gestureStartX = useSharedValue(0);
	const isFromEdge = useSharedValue(true);

	const panGesture = Gesture.Pan()
		.onBegin((event) => {
			gestureStartX.value = event.x;

			// Check if gesture started from screen edge
			if (edgeSwipeOnly) {
				const isFromLeftEdge = event.x < SWIPE_GESTURE.EDGE_SWIPE_WIDTH;
				const isFromRightEdge =
					event.x > screenWidth - SWIPE_GESTURE.EDGE_SWIPE_WIDTH;
				isFromEdge.value = isFromLeftEdge || isFromRightEdge;
			} else {
				isFromEdge.value = true;
			}
		})
		.onEnd((event) => {
			const { translationX, velocityX, translationY } = event;

			// Early returns for invalid gestures
			if (isVerticalScroll(translationY)) return;
			if (!isValidEdgeGesture(edgeSwipeOnly, isFromEdge.value)) return;

			const currentIndex = getCurrentTabIndex(currentRoute);
			if (currentIndex === -1) return;

			let shouldNavigate = false;
			let targetIndex = currentIndex;

			// For edge swipes, use a lower threshold to make it easier
			const effectiveThreshold = edgeSwipeOnly
				? SWIPE_GESTURE.SWIPE_THRESHOLD *
					SWIPE_GESTURE.SWIPE_THRESHOLD_EDGE_MULTIPLIER
				: SWIPE_GESTURE.SWIPE_THRESHOLD;

			// Swipe left (negative translationX) -> next tab
			if (
				isLeftSwipe({
					translationX,
					velocityX,
					threshold: effectiveThreshold,
				})
			) {
				targetIndex = currentIndex + 1;
				shouldNavigate = true;
			}
			// Swipe right (positive translationX) -> previous tab
			else if (
				isRightSwipe({
					translationX,
					velocityX,
					threshold: effectiveThreshold,
				})
			) {
				targetIndex = currentIndex - 1;
				shouldNavigate = true;
			}

			// Navigate if valid
			NavigateTo(shouldNavigate, targetIndex, navigateToTab);
		})
		.activeOffsetX([-5, 5]) // Lower threshold (5px instead of 10px) for quicker response on edges
		.failOffsetY(edgeSwipeOnly ? [-30, 30] : [-20, 20]); // More tolerance for vertical movement on map

	return (
		<GestureDetector gesture={panGesture}>
			<ThemedView style={styles.container}>{children}</ThemedView>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
