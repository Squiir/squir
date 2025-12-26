import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "@/store/auth.store";
import type { Message, UserLite } from "@/types/social";

let socket: Socket | null = null;

type ServerToClientEvents = {
  "message:new": (message: Message) => void;
  "message:read": (payload: {
    conversationId: string;
    messageId: string;
    user: UserLite;
  }) => void;
};

type ClientToServerEvents = {
  "conversation:join": (conversationId: string) => void;
  "conversation:leave": (conversationId: string) => void;
  "message:send": (payload: { conversationId: string; text: string }) => void;
  "message:read": (payload: {
    conversationId: string;
    messageId: string;
  }) => void;
};

export function getSocket(): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> {
  if (socket) return socket as any;

  const token = useAuthStore.getState().accessToken;

  socket = io(import.meta.env.VITE_API_WS_URL ?? import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    auth: token ? { token } : undefined,
    autoConnect: true,
  });

  useAuthStore.subscribe((s) => {
    const nextToken = s.accessToken;
    if (!socket) return;
    socket.auth = nextToken ? { token: nextToken } : {};
  });

  return socket as any;
}
