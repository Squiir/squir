import { User } from "@app-types/user";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	user: User | null;
	setTokens: (accessToken: string, refreshToken?: string, user?: User) => void;
	loadTokens: () => Promise<void>;
	clearTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	refreshToken: null,
	user: null,
	setTokens: (accessToken, refreshToken, user) => {
		set({
			accessToken,
			refreshToken: refreshToken || null,
			user: user || null,
		});
		SecureStore.setItemAsync("access_token", accessToken);
		if (refreshToken) SecureStore.setItemAsync("refresh_token", refreshToken);
		if (user) SecureStore.setItemAsync("user", JSON.stringify(user));
	},
	loadTokens: async () => {
		const accessToken = await SecureStore.getItemAsync("access_token");
		const refreshToken = await SecureStore.getItemAsync("refresh_token");
		const userStr = await SecureStore.getItemAsync("user");
		const user = userStr ? JSON.parse(userStr) : null;
		set({ accessToken, refreshToken, user });
	},
	clearTokens: async () => {
		set({ accessToken: null, refreshToken: null, user: null });
		await SecureStore.deleteItemAsync("access_token");
		await SecureStore.deleteItemAsync("refresh_token");
		await SecureStore.deleteItemAsync("user");
	},
}));
