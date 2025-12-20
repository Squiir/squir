import { apiFetch } from "./api";
import { setToken, removeToken } from "./token";

export async function login(username: string, password: string) {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  await setToken(res.token);

  return res;
}

export async function logout() {
  await removeToken();
}
