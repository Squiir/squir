import { useAuthStore } from "@/store/auth.store";
import type { LoginResponseDto } from "@/types/auth";
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({ baseURL: API_URL, timeout: 15000 });

export const authService = {
  async login(usernameOrEmail: string, password: string) {
    const { data } = await api.post<LoginResponseDto>("/auth/login", { usernameOrEmail, password });
    useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async register(dto: import("@/types/auth").RegisterRequestDto) {
    const { data } = await api.post<LoginResponseDto>("/auth/register", dto);
    useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async checkUsername(username: string) {
    const { data } = await api.post<{ isAvailable: boolean }>("/auth/check-username", { username });
    return data.isAvailable;
  },

  async checkEmail(email: string) {
    const { data } = await api.post<{ isAvailable: boolean }>("/auth/check-email", { email });
    return data.isAvailable;
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
