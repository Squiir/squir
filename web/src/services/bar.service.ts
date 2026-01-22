import type { Bar } from "@/types/bar";
import type { DashboardStats } from "@/types/dashboard";
import { api } from "./api.service";

export const barService = {
  async getBars() {
    const { data } = await api.get<Bar[]>("/bars");
    return data;
  },

  async getBar(id: string) {
    const { data } = await api.get<Bar>(`/bars/${id}`);
    return data;
  },

  async getDashboardStats(barId: string) {
    const response = await api.get<DashboardStats>(`/bars/${barId}/dashboard-stats`);
    return response.data;
  },

  async getStripeDashboardLink(barId: string) {
    const response = await api.get<string>(`/bars/${barId}/stripe-dashboard-link`);
    return response.data;
  },
};
