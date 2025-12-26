export interface Friend {
  id: string;
  username: string;
  avatarUrl: string | null;
  status: string | null;
}

export interface FriendSearchResult extends Friend {
  friendshipStatus: "NONE" | "PENDING";
}

export type FriendRequest = {
  id: string;
  username: string;
  avatarUrl?: string;
};

export interface AddFriendDto {
  friendId: string;
}

export interface RespondFriendRequestDto {
  accept: boolean;
}
