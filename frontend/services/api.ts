import { getToken } from "@services/token";
import type { User } from "@types/user";
import Constants from "expo-constants";
import { Platform } from "react-native";

const host =
  Platform.OS === "web"
    ? "localhost"
    : Constants.expoConfig?.hostUri?.split(":")[0];

export const API_URL = `http://${host}:3000`;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}

export async function getCurrentUser(): Promise<User> {
  const token = await getToken();

  if (!token) {
    throw new Error("No auth token");
  }

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }

  return res.json();
}
