import { ActionMenu } from "@/components/layout/ActionMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRemoveFriend } from "@/hooks/friends/use-remove-friend";
import type { ConversationPreview } from "@/types/messages";
import clsx from "clsx";

export function FriendItem({
  conversation,
  active,
  onClick,
}: {
  conversation: ConversationPreview;
  active: boolean;
  onClick: () => void;
}) {
  const removeFriend = useRemoveFriend();
  const isUnread = conversation.unreadCount > 0 && !conversation.isSender;

  return (
    <div
      className={clsx(
        "flex items-center justify-between p-2 rounded-lg transition-colors group",
        active ? "bg-accent" : "hover:bg-accent/50",
      )}
    >
      <button
        onClick={onClick}
        className="flex items-center flex-1 gap-4 overflow-hidden text-left"
      >
        <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
          <AvatarImage src={conversation.friend.avatarUrl ?? undefined} />
          <AvatarFallback className="text-lg">
            {conversation.friend.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base truncate">{conversation.friend.username}</span>
            {conversation.unreadCount > 0 && (
              <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-bold text-white bg-primary rounded-full">
                {conversation.unreadCount}
              </span>
            )}
          </div>

          {conversation.lastMessage && (
            <p
              className={clsx(
                "text-sm truncate",
                isUnread ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {conversation.lastMessage}
            </p>
          )}
        </div>
      </button>

      <div className="pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ActionMenu
          actions={[
            {
              label: "Supprimer l’ami",
              destructive: true,
              onClick: () => removeFriend.mutate(conversation.friend.id),
            },
          ]}
        />
      </div>
    </div>
  );
}
