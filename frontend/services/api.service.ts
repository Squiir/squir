import { API_URL } from "@constants/api";
import { authService } from "@services/auth.service";
import { useAuthStore } from "@store/auth.store";
import { interceptDatesFromResponse } from "@utils/format";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({ baseURL: API_URL, timeout: 15000 });

let isRefreshing = false;
let failedQueue: {
	resolve: (token: string) => void;
	reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
	failedQueue = [];
};

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

api.interceptors.request.use(async (config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (!error.config || !error.response) return Promise.reject(error);

		const originalRequest = error.config as AxiosRequestConfigWithRetry;

		if (error.response.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({
						resolve: (token) => {
							originalRequest.headers.Authorization = `Bearer ${token}`;
							resolve(api(originalRequest));
						},
						reject,
					});
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const newToken = await authService.refreshToken();
				processQueue(null, newToken);
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return api(originalRequest);
			} catch (error) {
				processQueue(error, null);
				await authService.logout();
				return Promise.reject(error);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

api.interceptors.response.use((response) => {
	response.data = interceptDatesFromResponse(response.data);
	return response;
});
