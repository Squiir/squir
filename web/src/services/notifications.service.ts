import { api } from "@/services/api.service";
import { type Notification } from "@/types/notification";

export const notificationsService = {
  getAll: async () => {
    const { data } = await api.get<Notification[]>("/notifications");
    return data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.patch<Notification>(`/notifications/${id}/read`);
    return data;
  },

  markAllAsRead: async () => {
    await api.patch("/notifications/read-all");
  },
};
