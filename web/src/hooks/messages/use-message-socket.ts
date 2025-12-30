import { useMyId } from "@/hooks/user/use-my-id";
import { useAuthStore } from "@/store/auth.store";
import type { ConversationPreview, Message } from "@/types/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socketRef: Socket | null = null;

export function useMessageSocket() {
  const qc = useQueryClient();
  const { data: me } = useMyId();
  const myId = me?.id;

  useEffect(() => {
    const token = useAuthStore.getState().accessToken;
    if (!token || !myId || socketRef) return;

    const baseUrl = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

    const socket = io(`${baseUrl}/ws`, {
      auth: { token },
    });

    socketRef = socket;

    // ─────────────────────────────────────
    // Message received
    // ─────────────────────────────────────
    const onMessageNew = (message: Message) => {
      const otherId = message.senderId === myId ? message.receiverId : message.senderId;

      qc.setQueryData<Message[]>(["messages", "conversation", otherId], (old = []) => [
        ...old,
        message,
      ]);

      qc.setQueryData<ConversationPreview[]>(["messages", "conversations"], (old) =>
        old?.map((c) =>
          c.friend.id === otherId
            ? {
                ...c,
                lastMessage: message.content,
                createdAt: message.createdAt,
                isSender: message.senderId === myId,
              }
            : c,
        ),
      );

      qc.invalidateQueries({ queryKey: ["messages", "conversations"] });
    };

    // ─────────────────────────────────────
    // Conversation read
    // ─────────────────────────────────────
    const onConversationRead = ({ friendId }: { friendId: string }) => {
      qc.invalidateQueries({ queryKey: ["messages", "conversations"] });

      qc.setQueryData<Message[]>(["messages", "conversation", friendId], (old) =>
        old?.map((m) => (m.senderId === myId ? { ...m, readAt: new Date().toISOString() } : m)),
      );
    };

    // ─────────────────────────────────────
    // Typing
    // ─────────────────────────────────────
    const onTypingStart = (userId: string) => {
      qc.setQueryData<boolean>(["typing", userId], true);
    };

    const onTypingStop = (userId: string) => {
      qc.setQueryData<boolean>(["typing", userId], false);
    };

    socket.on("message:new", onMessageNew);
    socket.on("conversation:read", onConversationRead);
    socket.on("typing:start", onTypingStart);
    socket.on("typing:stop", onTypingStop);

    socket.on("message:error", (err) => {
      console.error(err);
    });

    socket.on("conversation:error", (err) => {
      console.error(err);
    });

    return () => {
      socket.off("message:new", onMessageNew);
      socket.off("conversation:read", onConversationRead);
      socket.off("typing:start", onTypingStart);
      socket.off("typing:stop", onTypingStop);

      socket.disconnect();
      socketRef = null;
    };
  }, [qc, myId]);
}

function isSocketConnected(): boolean {
  return !!socketRef && socketRef.connected;
}

export function sendSocketMessage(receiverId: string, content: string): boolean {
  if (!isSocketConnected()) return false;
  socketRef!.emit("message:send", { receiverId, content });
  return true;
}

export function markConversationRead(friendId: string): boolean {
  if (!isSocketConnected()) return false;
  socketRef!.emit("conversation:read", { friendId });
  return true;
}

export function emitTypingStart(friendId: string): boolean {
  if (!isSocketConnected()) return false;
  socketRef!.emit("typing:start", { friendId });
  return true;
}

export function emitTypingStop(friendId: string): boolean {
  if (!isSocketConnected()) return false;
  socketRef!.emit("typing:stop", { friendId });
  return true;
}

export function setActiveConversation(friendId: string | null) {
  if (!socketRef || !socketRef.connected) return;
  socketRef.emit("conversation:active", { friendId });
}
