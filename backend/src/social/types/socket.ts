import type { FriendUserPayload } from "@social/types/friends";
import type { GroupInvitePayload } from "@social/types/groups";
import type { GroupMessagePayload } from "@social/types/message";
import { PresenceUpdatePayload } from "@social/types/presence";

export type SocketAuthData = {
  userId: string;
};

export type ClientToServerEvents = {
  "group:join": (groupId: string) => void;
  "group:sendMessage": (payload: { groupId: string; text: string }) => void;
  "group:history": (payload: {
    groupId: string;
    cursor?: string;
    limit?: number;
  }) => void;
  "group:read": (payload: { groupId: string; messageId: string }) => void;
  "friend:subscribe": () => void;
};

export type ServerToClientEvents = {
  "group:newMessage": (payload: GroupMessagePayload) => void;
  "presence:update": (payload: PresenceUpdatePayload) => void;
  "group:history:result": (payload: {
    groupId: string;
    messages: GroupMessagePayload[];
    nextCursor?: string;
  }) => void;
  "group:invited": (payload: GroupInvitePayload) => void;
  "group:read:update": (payload: {
    groupId: string;
    userId: string;
    messageId: string;
    readAt: string;
  }) => void;
  "friend:request": (payload: FriendUserPayload) => void;
  "friend:accepted": (payload: FriendUserPayload) => void;
};
