import axios from "axios";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "./auth.service";

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let queue: FailedRequest[] = [];

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const token = await authService.refreshToken();
        queue.forEach((p) => p.resolve(token));
        queue = [];
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch (e) {
        queue.forEach((p) => p.reject(e));
        queue = [];
        authService.logout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
