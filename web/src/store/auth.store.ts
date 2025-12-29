import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  setTokens: (accessToken: string, refreshToken?: string) => void;
  loadTokens: () => Promise<void>;
  clearTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  userId: null,

  setTokens: (accessToken, refreshToken) => {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));

    set({
      accessToken,
      refreshToken: refreshToken ?? null,
      userId: payload.sub,
    });

    localStorage.setItem("access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
  },

  loadTokens: async () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken) {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      set({
        accessToken,
        refreshToken,
        userId: payload.sub,
      });
    }
  },

  clearTokens: async () => {
    set({ accessToken: null, refreshToken: null, userId: null });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
}));
