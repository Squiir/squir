import { FriendItem } from "@/components/friends/FriendItem";
import { AppSkeleton } from "@/components/ui/skeletons/AppSkeleton";
import { useConversations } from "@/hooks/messages/use-conversations";

export function FriendList({
  selectedFriendId,
  onSelectFriend,
}: {
  selectedFriendId?: string;
  onSelectFriend: (id: string) => void;
}) {
  const { data = [], isLoading } = useConversations();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Conversations</h3>

      {isLoading && <AppSkeleton />}

      <div className="space-y-1">
        {data.map((conversation) => (
          <FriendItem
            key={conversation.friend.id}
            conversation={conversation}
            active={conversation.friend.id === selectedFriendId}
            onClick={() => onSelectFriend(conversation.friend.id)}
          />
        ))}
      </div>
    </div>
  );
}
