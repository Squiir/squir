import { api } from "@/services/api.service";
import type {
  AddFriendDto,
  Friend,
  FriendRequest,
  FriendSearchResult,
  RespondFriendRequestDto,
} from "@/types/friends";

export const friendsService = {
  async listFriends(): Promise<Friend[]> {
    const { data } = await api.get<Friend[]>("/friends");
    return data;
  },

  async listPendingRequests(): Promise<FriendRequest[]> {
    const { data } = await api.get<FriendRequest[]>("/friends/pending");
    return data;
  },

  async addFriend(dto: AddFriendDto): Promise<void> {
    await api.post("/friends", dto);
  },

  async respondRequest(requestId: string, dto: RespondFriendRequestDto): Promise<void> {
    await api.post(`/friends/${requestId}/respond`, dto);
  },

  async removeFriend(friendId: string): Promise<void> {
    await api.delete(`/friends/${friendId}`);
  },

  async searchFriends(query: string): Promise<FriendSearchResult[]> {
    if (!query.trim()) return [];
    const { data } = await api.get<FriendSearchResult[]>("/friends/search", {
      params: { query },
    });
    return data;
  },
};
