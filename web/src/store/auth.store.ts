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
    set({
      accessToken,
      refreshToken: refreshToken ?? null,
    });

    localStorage.setItem("access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
  },

  loadTokens: async () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    set({
      accessToken,
      refreshToken,
    });
  },

  clearTokens: async () => {
    set({ accessToken: null, refreshToken: null });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
}));
