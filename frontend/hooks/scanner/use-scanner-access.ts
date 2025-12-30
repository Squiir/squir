import { UserRole } from "@app-types/user";
import { useMe } from "@hooks/use-me";

/**
 * Hook to determine if the current user can access the scanner
 * @returns canAccessScanner - true if user is ADMIN or PROFESSIONAL, false if CUSTOMER, null if not loaded
 * @returns userRole - current user's role
 * @returns userBarIds - array of bar IDs owned by the user (for PROFESSIONAL)
 */
export function useScannerAccess() {
	const { data: user, isLoading } = useMe();

	// Return null until user is loaded to prevent premature decisions
	if (isLoading || !user) {
		return {
			canAccessScanner: null,
			userRole: null,
			userBarIds: [],
		};
	}

	const userRole = user.role;
	const canAccessScanner = userRole !== UserRole.CUSTOMER;
	const userBarIds = user.bars?.map((b) => b.id) || [];

	return {
		canAccessScanner,
		userRole,
		userBarIds,
	};
}
