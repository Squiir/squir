import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  emitTypingStart,
  emitTypingStop,
  sendSocketMessage,
} from "@/hooks/messages/use-message-socket";
import { useMyId } from "@/hooks/user/use-my-id";
import { useEffect, useRef, useState } from "react";

export function MessageComposer({ friendId }: { friendId: string }) {
  const [text, setText] = useState("");

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentFriendRef = useRef(friendId);

  const { data: me } = useMyId();
  const myId = me?.id;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setText(value);

    emitTypingStart(friendId);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      emitTypingStop(friendId);
      typingTimeout.current = null;
    }, 2000);
  }

  function send() {
    const content = text.trim();
    if (!content || !myId) return;

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
    if (currentFriendRef.current !== friendId) {
      emitTypingStop(currentFriendRef.current);
      currentFriendRef.current = friendId;
    }
  }, [friendId]);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      emitTypingStop(currentFriendRef.current);
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
