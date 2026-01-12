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
        "flex items-center justify-between px-2 py-2 rounded-md",
        active ? "bg-muted" : "hover:bg-muted",
      )}
    >
      <button
        onClick={onClick}
        className={clsx(
          "flex justify-between items-center w-full gap-2 text-left overflow-auto",
          "px-3 py-2 rounded-md hover:bg-muted",
          active && "bg-muted",
        )}
      >
        <div className="flex flex-row items-center gap-3 px-2 py-2 text-left">
          <Avatar className="w-8 h-8">
            <AvatarImage src={conversation.friend.avatarUrl ?? undefined} />
            <AvatarFallback>{conversation.friend.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{conversation.friend.username}</span>
        </div>
        <div className="min-w-0">
          {conversation.lastMessage && (
            <div
              className={clsx(
                "text-xs truncate mx-2",
                isUnread ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              {conversation.lastMessage}
            </div>
          )}
        </div>

        <div>
          {conversation.unreadCount > 0 && (
            <span className="px-3 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </button>

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
  );
}
