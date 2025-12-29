import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetCurrentUserId } from "@/hooks/auth/use-get-current-user-id";
import {
  emitTypingStart,
  emitTypingStop,
  sendSocketMessage,
} from "@/hooks/messages/use-message-socket";
import type { Message } from "@/types/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export function MessageComposer({ friendId }: { friendId: string }) {
  const [text, setText] = useState("");
  const typingTimeout = useRef<number | null>(null);

  const qc = useQueryClient();
  const { data: me } = useGetCurrentUserId();
  const myId = me?.id;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);

    emitTypingStart(friendId);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = window.setTimeout(() => {
      emitTypingStop(friendId);
    }, 2000);
  }

  function send() {
    const content = text.trim();
    if (!content) return;

    const optimistic: Message = {
      id: "optimistic-" + crypto.randomUUID(),
      senderId: myId!,
      receiverId: friendId,
      content,
      createdAt: new Date().toISOString(),
      readAt: null,
    };

    qc.setQueryData<Message[]>(["messages", "conversation", friendId], (old) =>
      old ? [...old, optimistic] : [optimistic],
    );

    qc.setQueryData<any[]>(["messages", "conversations"], (old) =>
      old?.map((c) =>
        c.friend.id === friendId
          ? {
              ...c,
              lastMessage: content,
              createdAt: optimistic.createdAt,
              isSender: true,
            }
          : c,
      ),
    );

    setText("");
    emitTypingStop(friendId);
    sendSocketMessage(friendId, content);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  return (
    <div className="flex gap-2 p-3">
      <Input
        placeholder="Écrire un message…"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={send} disabled={!text.trim()}>
        Envoyer
      </Button>
    </div>
  );
}
