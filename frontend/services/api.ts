import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.hostUri
  ? `http://${Constants.expoConfig.hostUri.split(":")[0]}:3000`
  : "http://localhost:3000";

export async function fetchMe() {
  const res = await fetch(`${API_URL}/users/me`);

  if (!res.ok) {
    throw new Error("Failed to fetch /users/me");
  }

  return res.json();
}

