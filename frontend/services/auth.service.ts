import { AuthResponseDto, LoginRequestDto, RegisterRequestDto } from "@app-types/auth";
import { API_URL } from "@constants/api";
import { useAuthStore } from "@store/auth.store";
import axios from "axios";

const api = axios.create({ baseURL: API_URL, timeout: 15000 });

export const authService = {
	async register(registerRequestDto: RegisterRequestDto) {
		const { data } = await api.post<AuthResponseDto>("/auth/register", registerRequestDto);
		useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
		return data;
	},

	async login(loginRequestDto: LoginRequestDto) {
		const { data } = await api.post<AuthResponseDto>("/auth/login", loginRequestDto);
		useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
		return data;
	},

	async refreshToken(): Promise<string> {
		const refreshToken = useAuthStore.getState().refreshToken;
		if (!refreshToken) throw new Error("No refresh token");

		const { data } = await api.post<AuthResponseDto>("/auth/refresh", { refreshToken });
		useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
		return data.accessToken;
	},

	async logout() {
		await useAuthStore.getState().clearTokens();
	},
};
