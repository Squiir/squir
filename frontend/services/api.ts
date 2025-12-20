import { getToken } from "@services/token";
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
