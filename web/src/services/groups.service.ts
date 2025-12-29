import { api } from "@/services/api.service";
import type { AddGroupMembers, Group, UpdatedGroup } from "@/types/groups";

export const groupsService = {
  async create(name: string, memberIds: string[]): Promise<Group> {
    const { data } = await api.post<Group>("/groups", { name, memberIds });
    return data;
  },

  async list(): Promise<Group[]> {
    const { data } = await api.get<Group[]>("/groups");
    return data;
  },

  async leave(groupId: string): Promise<void> {
    await api.post(`/groups/${groupId}/leave`);
  },

  async update(groupId: string, name: string): Promise<UpdatedGroup> {
    const { data } = await api.patch<UpdatedGroup>(`/groups/${groupId}`, {
      name,
    });
    return data;
  },

  async addMembers(groupId: string, memberIds: string[]): Promise<AddGroupMembers> {
    const { data } = await api.post<AddGroupMembers>(`/groups/${groupId}/members`, {
      memberIds,
    });
    return data;
  },
};
