import { useLoadUserData } from "@hooks/auth/use-load-user-data";
import { useAuthStore } from "@store/auth.store";
import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

interface AuthContextType {
	isLoading: boolean;
	isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
	isLoading: true,
	isLoggedIn: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const loadTokens = useAuthStore((state) => state.loadTokens);
	const accessToken = useAuthStore((state) => state.accessToken);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const init = async () => {
			await loadTokens();
			setIsLoading(false);
		};
		init();
	}, [loadTokens]);

	// Load user role and bars when authenticated
	useLoadUserData();

	const value = {
		isLoading,
		isLoggedIn: !!accessToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
