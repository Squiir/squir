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
};
