import { User } from "@app-types/user";
import { api } from "@services/api.service";

export const userService = {
  async getCurrentUser() {
    const { data } = await api.get<User>("/users/me");
    return data;
  },
};
