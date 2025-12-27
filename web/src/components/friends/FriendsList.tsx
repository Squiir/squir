import { useFriends } from "@/hooks/friends/use-friends";
import { FriendItem } from "./FriendItem";

export function FriendsList() {
  const { data = [], isLoading } = useFriends();

  return (
    <div className="flex-1 overflow-auto">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Amis</h3>

      {isLoading && <div className="text-sm">Chargement…</div>}

      <div className="space-y-1">
        {data.map((friend) => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}
