import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	setTokens: (accessToken: string, refreshToken?: string) => void;
	loadTokens: () => Promise<void>;
	clearTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	refreshToken: null,
	setTokens: (accessToken, refreshToken) => {
		set({ accessToken, refreshToken: refreshToken || null });
		SecureStore.setItemAsync("access_token", accessToken);
		if (refreshToken) SecureStore.setItemAsync("refresh_token", refreshToken);
	},
	loadTokens: async () => {
		const accessToken = await SecureStore.getItemAsync("access_token");
		const refreshToken = await SecureStore.getItemAsync("refresh_token");
		set({ accessToken, refreshToken });
	},
	clearTokens: async () => {
		set({ accessToken: null, refreshToken: null });
		await SecureStore.deleteItemAsync("access_token");
		await SecureStore.deleteItemAsync("refresh_token");
	},
}));
