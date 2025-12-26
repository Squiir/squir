import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { socialService } from "@/services/social.service";
import { getSocket } from "@/services/socket.service";
import type { Message } from "@/types/social";

export function useMessages(conversationId: string | null) {
  const qc = useQueryClient();

  const query = useQuery<Message[]>({
    queryKey: ["social", "messages", conversationId],
    queryFn: () => socialService.listMessages(conversationId!),
    enabled: !!conversationId,
    staleTime: 5_000,
  });

  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocket();
    socket.emit("conversation:join", conversationId);

    const onNew = (message: Message) => {
      if (message.conversationId !== conversationId) return;
      qc.setQueryData<Message[]>(
        ["social", "messages", conversationId],
        (prev) => (prev ? [...prev, message] : [message])
      );
    };

    const onRead = (payload: {
      conversationId: string;
      messageId: string;
      user: any;
    }) => {
      if (payload.conversationId !== conversationId) return;

      qc.setQueryData<Message[]>(
        ["social", "messages", conversationId],
        (prev) =>
          (prev ?? []).map((m) => {
            if (m.id !== payload.messageId) return m;
            const exists = m.readBy?.some((u) => u.id === payload.user.id);
            return exists
              ? m
              : { ...m, readBy: [...(m.readBy ?? []), payload.user] };
          })
      );
    };

    socket.on("message:new", onNew);
    socket.on("message:read", onRead);

    return () => {
      socket.emit("conversation:leave", conversationId);
      socket.off("message:new", onNew);
      socket.off("message:read", onRead);
    };
  }, [conversationId, qc]);

  return query;
}
