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

/**
 * Wrapper fetch JSON
 * - récupère automatiquement le token depuis SecureStore / localStorage
 * - injecte Authorization: Bearer <token>
 */
async function requestJson<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} on ${path}${text ? ` - ${text}` : ""}`
    );
  }

  return res.json() as Promise<T>;
}

export function apiGet<T>(path: string) {
  return requestJson<T>(path, { method: "GET" });
}

export function apiPost<T>(path: string, body?: unknown) {
  return requestJson<T>(path, {
    method: "POST",
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

/** compat si encore utilisé ailleurs */
export function fetchMe() {
  return apiGet<any>("/users/me");
}