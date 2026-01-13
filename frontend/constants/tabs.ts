/**
 * Tab configuration
 * Single source of truth for tab routes
 */
export const TAB_ORDER = ["index", "map", "profile"] as const;

export type TabName = (typeof TAB_ORDER)[number];

/**
 * Map tab names to their Expo Router paths
 * Note: social is hidden but path kept for potential direct navigation
 */
export const TAB_PATHS: Record<TabName, string> = {
	index: "/(tabs)/",
	map: "/(tabs)/map",
	profile: "/(tabs)/profile",
};

/**
 * Get the index of a tab by name
 */
export function getTabIndex(tabName: string): number {
	return TAB_ORDER.indexOf(tabName as TabName);
}

/**
 * Get the path for a tab by name
 */
export function getTabPath(tabName: TabName): string {
	return TAB_PATHS[tabName];
}
