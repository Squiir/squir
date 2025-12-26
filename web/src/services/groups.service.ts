import { api } from "@/services/api.service";
import type { Group } from "@/types/groups";

export const groupsService = {
  async create(name: string, memberIds: string[]): Promise<Group> {
    const { data } = await api.post<Group>("/groups", { name, memberIds });
    return data;
  },

  async addMembers(groupId: string, memberIds: string[]): Promise<void> {
    await api.post(`/groups/${groupId}/members`, { memberIds });
  },
};
