import { ActionMenu } from "@/components/layout/ActionMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRemoveFriend } from "@/hooks/friends/use-remove-friend";
import type { Friend } from "@/types/friends";

export function FriendItem({ friend }: { friend: Friend }) {
  const removeFriend = useRemoveFriend();

  return (
    <div className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-muted">
      <button
        key={friend.id}
        className="flex items-center w-full gap-2 px-2 py-2 rounded-md hover:bg-muted"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={friend.avatarUrl ?? undefined} />
          <AvatarFallback>{friend.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{friend.username}</span>
      </button>

      <ActionMenu
        actions={[
          {
            label: "Supprimer l’ami",
            destructive: true,
            onClick: () => removeFriend.mutate(friend.id),
          },
        ]}
      />
    </div>
  );
}
