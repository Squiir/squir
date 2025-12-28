import { userService } from "@services/user.service";
import { useAuthStore } from "@store/auth.store";
import { useEffect } from "react";

/**
 * Hook to load user role and bars when authenticated
 * Automatically fetches user data when accessToken is available
 */
export function useLoadUserData() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const setUserRole = useAuthStore((state) => state.setUserRole);
	const setUserBars = useAuthStore((state) => state.setUserBars);

	useEffect(() => {
		const loadUserData = async () => {
			if (accessToken) {
				try {
					const user = await userService.getCurrentUser();
					setUserRole(user.role);
					setUserBars(user.bars || []);
				} catch (error) {
					console.error("Failed to load user data:", error);
				}
			}
		};
		loadUserData();
	}, [accessToken, setUserRole, setUserBars]);
}
