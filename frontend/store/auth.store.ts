import type { Bar } from "@app-types/bar";
import { UserRole } from "@app-types/user";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	userRole: UserRole | null;
	userBars: Bar[];
	setTokens: (accessToken: string, refreshToken?: string) => void;
	setUserRole: (role: UserRole) => void;
	setUserBars: (bars: Bar[]) => void;
	loadTokens: () => Promise<void>;
	clearTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	refreshToken: null,
	userRole: null,
	userBars: [],
	setTokens: (accessToken, refreshToken) => {
		set({ accessToken, refreshToken: refreshToken || null });
		SecureStore.setItemAsync("access_token", accessToken);
		if (refreshToken) SecureStore.setItemAsync("refresh_token", refreshToken);
	},
	setUserRole: (role) => {
		set({ userRole: role });
	},
	setUserBars: (bars) => {
		set({ userBars: bars });
	},
	loadTokens: async () => {
		const accessToken = await SecureStore.getItemAsync("access_token");
		const refreshToken = await SecureStore.getItemAsync("refresh_token");
		set({ accessToken, refreshToken });
	},
	clearTokens: async () => {
		set({
			accessToken: null,
			refreshToken: null,
			userRole: null,
			userBars: [],
		});
		await SecureStore.deleteItemAsync("access_token");
		await SecureStore.deleteItemAsync("refresh_token");
	},
}));
