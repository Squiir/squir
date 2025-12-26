import type { Message } from "@/types/social";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReadByAvatars } from "@/components/social/ReadByAvatars";

export function MessageBubble({ message }: { message: Message }) {
  const initials = message.author.username.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={message.author.avatarUrl ?? undefined} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="max-w-[75%]">
        <div className="px-3 py-2 rounded-2xl bg-muted">
          <div className="text-sm font-medium">{message.author.username}</div>
          <div className="text-sm text-foreground/90">{message.text}</div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <ReadByAvatars users={message.readBy ?? []} />
        </div>
      </div>
    </div>
  );
}
