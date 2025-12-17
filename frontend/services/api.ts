const API_URL = 'http://localhost:3000';

export async function fetchMe() {
  const res = await fetch(`${API_URL}/users/me`);
  return res.json();
}
