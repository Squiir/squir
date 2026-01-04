import { SWIPE_GESTURE } from "@constants/swipe-gesture";
import { Href, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";

interface SwipeableTabWrapperProps {
	children: React.ReactNode;
	currentRoute: string;
	/**
	 * If true, swipe gestures will only work from the edges of the screen.
	 * Useful for screens with interactive content like maps.
	 */
	edgeSwipeOnly?: boolean;
}

// Define the order of tabs to enable sequential navigation
const TAB_ORDER = ["index", "map", "social", "profile"] as const;

// Distance from edge of screen to trigger edge swipe (in pixels)
// Increased for map screen to have a more generous edge zone
const EDGE_SWIPE_WIDTH = 80;

export function SwipeableTabWrapper({
	children,
	currentRoute,
	edgeSwipeOnly = false,
}: SwipeableTabWrapperProps) {
	const router = useRouter();
	const { width: screenWidth } = useWindowDimensions();
	const gestureStartX = useSharedValue(0);
	const isFromEdge = useSharedValue(true);

	// Create a JS thread function for navigation
	const navigateToTab = useCallback(
		(targetRoute: string) => {
			switch (targetRoute) {
				case "index":
					router.push("/(tabs)/" as Href);
					break;
				case "map":
					router.push("/(tabs)/map" as Href);
					break;
				case "social":
					router.push("/(tabs)/social" as Href);
					break;
				case "profile":
					router.push("/(tabs)/profile" as Href);
					break;
			}
		},
		[router],
	);

	const panGesture = Gesture.Pan()
		.onBegin((event) => {
			gestureStartX.value = event.x;

			// Check if gesture started from screen edge
			if (edgeSwipeOnly) {
				const isFromLeftEdge = event.x < EDGE_SWIPE_WIDTH;
				const isFromRightEdge = event.x > screenWidth - EDGE_SWIPE_WIDTH;
				isFromEdge.value = isFromLeftEdge || isFromRightEdge;
			} else {
				isFromEdge.value = true;
			}
		})
		.onEnd((event) => {
			const { translationX, velocityX, translationY } = event;

			// Check if vertical movement is too large (likely a scroll gesture)
			if (Math.abs(translationY) > SWIPE_GESTURE.VERTICAL_THRESHOLD) {
				return;
			}

			// If edgeSwipeOnly is true, check if gesture started from screen edge
			if (edgeSwipeOnly && !isFromEdge.value) {
				return; // Gesture didn't start from edge, ignore it
			}

			const currentIndex = TAB_ORDER.indexOf(currentRoute as any);
			if (currentIndex === -1) {
				return;
			}

			let shouldNavigate = false;
			let targetIndex = currentIndex;

			// For edge swipes, use a lower threshold to make it easier
			const effectiveThreshold = edgeSwipeOnly
				? SWIPE_GESTURE.SWIPE_THRESHOLD * 0.7
				: SWIPE_GESTURE.SWIPE_THRESHOLD;

			// Swipe left (negative translationX) -> next tab
			if (
				translationX < -effectiveThreshold ||
				velocityX < -SWIPE_GESTURE.SWIPE_VELOCITY_THRESHOLD
			) {
				targetIndex = currentIndex + 1;
				shouldNavigate = true;
			}
			// Swipe right (positive translationX) -> previous tab
			else if (
				translationX > effectiveThreshold ||
				velocityX > SWIPE_GESTURE.SWIPE_VELOCITY_THRESHOLD
			) {
				targetIndex = currentIndex - 1;
				shouldNavigate = true;
			}

			// Check boundaries and navigate
			if (
				shouldNavigate &&
				targetIndex >= 0 &&
				targetIndex < TAB_ORDER.length
			) {
				const targetRoute = TAB_ORDER[targetIndex];
				// Use runOnJS to call the navigation function on the JS thread
				runOnJS(navigateToTab)(targetRoute);
			}
		})
		.activeOffsetX([-5, 5]) // Lower threshold (5px instead of 10px) for quicker response on edges
		.failOffsetY(edgeSwipeOnly ? [-30, 30] : [-20, 20]); // More tolerance for vertical movement on map

	return (
		<GestureDetector gesture={panGesture}>
			<View style={styles.container}>{children}</View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
