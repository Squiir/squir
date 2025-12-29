import { useMyId } from "@/hooks/user/use-my-id";
import { useAuthStore } from "@/store/auth.store";
import type { Message } from "@/types/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useMessageSocket(selectedFriendId?: string) {
  const qc = useQueryClient();
  const { data: me } = useMyId();
  const myId = me?.id;

  useEffect(() => {
    const token = useAuthStore.getState().accessToken;

    if (!token || !myId) return;

    socket = io(import.meta.env.VITE_API_URL + "/ws", {
      auth: { token },
    });

    socket.on("message:new", (message: Message) => {
      const otherId = message.senderId === myId ? message.receiverId : message.senderId;

      // Update Conversation messages
      qc.setQueryData<Message[]>(["messages", "conversation", otherId], (old = []) => [
        ...old,
        message,
      ]);

      // Update Conversations list
      qc.setQueryData<any[]>(["messages", "conversations"], (old) => {
        if (!old) return old;

        return old.map((c) => {
          if (c.friend.id !== otherId) return c;

          const isIncoming = message.senderId !== myId;
          const isActive = selectedFriendId === otherId;

          return {
            ...c,
            lastMessage: message.content,
            createdAt: message.createdAt,
            isSender: message.senderId === myId,
            unreadCount: isIncoming ? (isActive ? 0 : (c.unreadCount ?? 0) + 1) : 0,
          };
        });
      });
    });

    socket.on("conversation:read", ({ friendId }: { friendId: string }) => {
      qc.setQueryData<any[]>(["messages", "conversations"], (old) =>
        old?.map((c) => (c.friend.id === friendId ? { ...c, unreadCount: 0 } : c)),
      );

      qc.setQueryData<Message[]>(["messages", "conversation", friendId], (old) => {
        if (!old) return old;

        return old.map((m) =>
          m.senderId === myId ? { ...m, readAt: new Date().toISOString() } : m,
        );
      });
    });

    socket.on("typing:start", (userId: string) => {
      qc.setQueryData(["typing", userId], true);
    });

    socket.on("typing:stop", (userId: string) => {
      qc.setQueryData(["typing", userId], false);
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [qc, selectedFriendId]);
}

export function sendSocketMessage(receiverId: string, content: string) {
  socket?.emit("message:send", { receiverId, content });
}

export function markConversationRead(friendId: string) {
  socket?.emit("conversation:read", { friendId });
}

export function emitTypingStart(friendId: string) {
  socket?.emit("typing:start", { friendId });
}

export function emitTypingStop(friendId: string) {
  socket?.emit("typing:stop", { friendId });
}
