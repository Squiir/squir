/**
 * Swipe Gesture Configuration Constants
 */
export const SWIPE_GESTURE = {
	// Minimum horizontal distance (in pixels) to trigger navigation
	SWIPE_THRESHOLD: 50,

	// Multiplier for edge swipe threshold (makes it easier to swipe from edges)
	SWIPE_THRESHOLD_EDGE_MULTIPLIER: 0.7,

	// Minimum velocity to detect a quick swipe and trigger immediate navigation
	SWIPE_VELOCITY_THRESHOLD: 500,

	// Maximum vertical movement allowed during horizontal swipe
	// This helps distinguish between vertical scrolls and horizontal swipes
	VERTICAL_THRESHOLD: 50,

	// Distance from edge of screen to trigger edge swipe (in pixels)
	EDGE_SWIPE_WIDTH: 80,
} as const;

export const SWIPE_ANIMATION = {
	// Spring animation configuration for smooth transitions
	DAMPING: 20,
	STIFFNESS: 90,
	MASS: 0.3,
} as const;
