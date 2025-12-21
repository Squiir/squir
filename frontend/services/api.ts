import Constants from "expo-constants";
import { Platform } from "react-native";
import { getToken } from "@services/token";

const host =
  Platform.OS === "web"
    ? "localhost"
    : Constants.expoConfig?.hostUri?.split(":")[0];

export const API_URL = `http://${host}:3000`;

/**
 * API fetch générique
 * - gère Authorization automatiquement
 * - JSON par défaut
 */
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
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
    const text = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`
    );
  }

  return res.json();
}
