/**
 * Swipe Gesture Configuration Constants
 */
export const SWIPE_GESTURE = {
	// Minimum horizontal distance (in pixels) to trigger navigation
	SWIPE_THRESHOLD: 50,

	// Minimum velocity to detect a quick swipe and trigger immediate navigation
	SWIPE_VELOCITY_THRESHOLD: 500,

	// Maximum vertical movement allowed during horizontal swipe
	// This helps distinguish between vertical scrolls and horizontal swipes
	VERTICAL_THRESHOLD: 50,
} as const;

export const SWIPE_ANIMATION = {
	// Spring animation configuration for smooth transitions
	DAMPING: 20,
	STIFFNESS: 90,
	MASS: 0.3,
} as const;
