import { MessageBubble } from "@/components/messages/MessageBubble";
import { MessageComposer } from "@/components/messages/MessageComposer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriends } from "@/hooks/friends/use-friends";
import { useConversation } from "@/hooks/messages/use-conversation";
import { markConversationRead } from "@/hooks/messages/use-message-socket";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";

export function ConversationPanel({ friendId }: { friendId?: string }) {
  const qc = useQueryClient();
  const { data: friends = [] } = useFriends();

  const friend = useMemo(() => friends.find((f) => f.id === friendId), [friends, friendId]);

  const { data = [], isLoading } = useConversation(friendId);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const myId = useAuthStore.getState().userId;
  const lastMyMessageId = [...data].reverse().find((m) => m.senderId === myId)?.id;
  const isTyping = qc.getQueryData<boolean>(["typing", friendId]) ?? false;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.length]);

  useEffect(() => {
    if (!friendId) return;

    markConversationRead(friendId);

    qc.setQueryData<any[]>(["messages", "conversations"], (old) => {
      if (!old) return old;
      return old.map((c) => (c.friend.id === friendId ? { ...c, unreadCount: 0 } : c));
    });
  }, [friendId, qc]);

  if (!friendId) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Sélectionnez une conversation
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b bg-background">
        <Avatar className="w-10 h-10">
          <AvatarImage src={friend?.avatarUrl ?? undefined} />
          <AvatarFallback>{friend?.username?.[0]?.toUpperCase() ?? "?"}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{friend?.username ?? "Utilisateur"}</div>
          <div className="text-xs text-muted-foreground">{friend?.status ?? "offline"}</div>
        </div>
      </div>

      <div className={cn("flex-1 overflow-auto p-4 space-y-2 bg-muted/20")}>
        {isLoading && <div className="text-sm text-muted-foreground">Chargement…</div>}

        {data.map((m) => (
          <MessageBubble key={m.id} message={m} showRead={m.id === lastMyMessageId} />
        ))}

        {isTyping && (
          <div className="text-xs italic text-muted-foreground">
            {friend?.username} est en train d’écrire…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <MessageComposer friendId={friendId} />
    </div>
  );
}
