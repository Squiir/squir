import type { Bar } from "@/types/bar";
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
};
