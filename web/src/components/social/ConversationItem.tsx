import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/social";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function ConversationItem({
  conversation,
  active,
}: {
  conversation: Conversation;
  active: boolean;
}) {
  const navigate = useNavigate();

  const initials = conversation.name?.slice(0, 2).toUpperCase();

  return (
    <button
      onClick={() => navigate(`/social/${conversation.id}`)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
        active ? "bg-muted" : "hover:bg-muted/60"
      )}
    >
      <Avatar className="w-10 h-10">
        <AvatarImage src={conversation.avatarUrl ?? undefined} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="font-medium truncate">{conversation.name}</div>
          {conversation.unreadCount ? (
            <Badge variant="default" className="h-5 px-2">
              {conversation.unreadCount}
            </Badge>
          ) : null}
        </div>

        <div className="text-sm truncate text-muted-foreground">
          {conversation.lastMessage?.text ?? "—"}
        </div>
      </div>
    </button>
  );
}
