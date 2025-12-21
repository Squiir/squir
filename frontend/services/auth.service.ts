import { LoginResponseDto } from "@app-types/auth";
import { API_URL } from "@constants/api";
import { useAuthStore } from "@store/auth.store";
import axios from "axios";

const api = axios.create({ baseURL: API_URL, timeout: 15000 });

export const authService = {
  async login(username: string, password: string) {
    const { data } = await api.post<LoginResponseDto>("/auth/login", { username, password });
    useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async refreshToken(): Promise<string> {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await api.post<LoginResponseDto>("/auth/refresh", { refreshToken });
    useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  },

  async logout() {
    await useAuthStore.getState().clearTokens();
  },
};
