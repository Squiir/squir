import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useScannerAccess } from "./use-scanner-access";

/**
 * Hook to redirect users without scanner access to home page
 * Used in scanner screen to prevent CUSTOMER role from accessing scanner
 */
export function useScannerRedirect() {
	const router = useRouter();
	const { canAccessScanner } = useScannerAccess();

	useEffect(() => {
		// Only redirect when we know the user cannot access (false), not when loading (null)
		if (canAccessScanner === false) {
			router.replace("/");
		}
	}, [canAccessScanner, router]);
}
