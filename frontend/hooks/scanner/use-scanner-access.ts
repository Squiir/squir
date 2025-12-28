import { UserRole } from "@app-types/user";
import { useAuthStore } from "@store/auth.store";

/**
 * Hook to determine if the current user can access the scanner
 * @returns canAccessScanner - true if user is ADMIN or PROFESSIONAL, false if CUSTOMER, null if not loaded
 * @returns userRole - current user's role
 * @returns userBarIds - array of bar IDs owned by the user (for PROFESSIONAL)
 */
export function useScannerAccess() {
	const userRole = useAuthStore((state) => state.userRole);
	const userBars = useAuthStore((state) => state.userBars);

	// Return null until role is loaded to prevent premature decisions
	const canAccessScanner =
		userRole === null ? null : userRole !== UserRole.CUSTOMER;
	const userBarIds = userBars?.map((b) => b.id) || [];

	return {
		canAccessScanner,
		userRole,
		userBarIds,
	};
}
