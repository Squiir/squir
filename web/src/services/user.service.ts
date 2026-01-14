import { api } from "@/services/api.service";
import type { User } from "@/types/user";

export const userService = {
  async getCurrentUser() {
    const { data } = await api.get<User>("/users/me");
    return data;
  },

  async getCurrentUserId() {
    const { data } = await api.get<{ id: string }>("/users/id");
    return data;
  },

  async updateAvatar(avatarUrl: string) {
    const { data } = await api.patch<User>("/users/me/avatar", { avatarUrl });
    return data;
  },

  async updateStatus(status: string) {
    const { data } = await api.patch<User>("/users/me/status", { status });
    return data;
  },
};
