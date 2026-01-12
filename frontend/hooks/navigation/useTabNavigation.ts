import { TAB_PATHS, TabName } from "@constants/tabs";
import { Href, useRouter } from "expo-router";
import { useCallback } from "react";

/**
 * Hook for navigating between tabs
 * Uses the centralized tab configuration
 */
export function useTabNavigation() {
	const router = useRouter();

	const navigateToTab = useCallback(
		(tabName: TabName) => {
			const path = TAB_PATHS[tabName];
			router.push(path as Href);
		},
		[router],
	);

	return { navigateToTab };
}
