import { getToken } from "@services/token"
import type { User } from "../types/user"
import { API_URL } from "@services/api";

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
