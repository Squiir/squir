import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriends } from "@/hooks/friends/use-friends";

export function FriendsList() {
  const { data = [], isLoading } = useFriends();

  return (
    <div className="flex-1 overflow-auto">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Amis</h3>

      {isLoading && <div className="text-sm">Chargement…</div>}

      <div className="space-y-1">
        {data.map((friend) => (
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
        ))}
      </div>
    </div>
  );
}
