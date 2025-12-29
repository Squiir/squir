import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendSocketMessage } from "@/hooks/messages/use-message-socket";
import { useAuthStore } from "@/store/auth.store";
import type { Message } from "@/types/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export function MessageComposer({ friendId }: { friendId: string }) {
  const [text, setText] = useState("");
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const qc = useQueryClient();
  const myId = useAuthStore.getState().userId;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);

    window.socket?.emit("typing:start", { friendId });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      window.socket?.emit("typing:stop", { friendId });
    }, 800);
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

    qc.setQueryData<any[]>(["messages", "conversations"], (old) => {
      if (!old) return old;
      return old.map((c) =>
        c.friend.id === friendId
          ? { ...c, lastMessage: content, createdAt: optimistic.createdAt, isSender: true }
          : c,
      );
    });

    setText("");
    sendSocketMessage(friendId, content);

    window.socket?.emit("typing:stop", { friendId });
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
    <div className="flex gap-2 p-3 border-t bg-background">
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
