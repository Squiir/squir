import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocialStore } from "@/store/social.store";
import { useSendMessage } from "@/hooks/social/use-send-message";

export function MessageComposer() {
  const conversationId = useSocialStore((s) => s.activeConversationId);
  const [text, setText] = useState("");
  const { mutate: send, isPending } = useSendMessage(conversationId);

  function onSend() {
    const t = text.trim();
    if (!t) return;
    send(t);
    setText("");
  }

  return (
    <div className="flex items-center gap-2 p-3">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Votre message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") onSend();
        }}
      />
      <Button onClick={onSend} disabled={isPending || !text.trim()}>
        Envoyer
      </Button>
    </div>
  );
}
