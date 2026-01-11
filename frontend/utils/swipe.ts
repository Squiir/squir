import { SWIPE_GESTURE } from "@constants/swipe-gesture";
import { TAB_ORDER, TabName } from "@constants/tabs";
import { scheduleOnRN } from "react-native-worklets";

interface SwipeProps {
	translationX: number;
	velocityX: number;
	threshold: number;
}

/**
 * Detects if the gesture is a left swipe (swipe to next tab)
 * @param translationX - Horizontal translation of the gesture
 * @param velocityX - Horizontal velocity of the gesture
 * @param threshold - Distance threshold to trigger navigation
 * @returns true if gesture is a left swipe
 */
export function isLeftSwipe({
	translationX,
	velocityX,
	threshold,
}: SwipeProps): boolean {
	"worklet";
	return (
		translationX < -threshold ||
		velocityX < -SWIPE_GESTURE.SWIPE_VELOCITY_THRESHOLD
	);
}

/**
 * Detects if the gesture is a right swipe (swipe to previous tab)
 * @param translationX - Horizontal translation of the gesture
 * @param velocityX - Horizontal velocity of the gesture
 * @param threshold - Distance threshold to trigger navigation
 * @returns true if gesture is a right swipe
 */
export function isRightSwipe({
	translationX,
	velocityX,
	threshold,
}: SwipeProps): boolean {
	"worklet";
	return (
		translationX > threshold ||
		velocityX > SWIPE_GESTURE.SWIPE_VELOCITY_THRESHOLD
	);
}

/**
 * Checks if the gesture has too much vertical movement (likely a scroll)
 */
export function isVerticalScroll(translationY: number): boolean {
	"worklet";
	return Math.abs(translationY) > SWIPE_GESTURE.VERTICAL_THRESHOLD;
}

/**
 * Checks if the gesture is valid based on edge swipe requirements
 */
export function isValidEdgeGesture(
	edgeSwipeOnly: boolean,
	isFromEdge: boolean,
): boolean {
	"worklet";
	if (!edgeSwipeOnly) return true;
	return isFromEdge;
}

/**
 * Finds the current tab index, returns -1 if not found
 */
export function getCurrentTabIndex(currentRoute: string): number {
	"worklet";
	return TAB_ORDER.indexOf(currentRoute as any);
}

/**
 * Checks if the target index is within valid bounds
 */
export function isValidTabIndex(index: number): boolean {
	"worklet";
	return index >= 0 && index < TAB_ORDER.length;
}

/**
 * Navigates to a tab if conditions are met
 * Uses scheduleOnRN to safely call the navigation callback from the UI thread
 * @param shouldNavigate - Whether navigation should occur
 * @param targetIndex - Target tab index to navigate to
 * @param navigateToTab - Navigation callback function
 */
export function NavigateTo(
	shouldNavigate: boolean,
	targetIndex: number,
	navigateToTab: (tabName: TabName) => void,
): void {
	"worklet";
	if (shouldNavigate && isValidTabIndex(targetIndex)) {
		const targetRoute = TAB_ORDER[targetIndex];
		scheduleOnRN(navigateToTab, targetRoute);
	}
}
