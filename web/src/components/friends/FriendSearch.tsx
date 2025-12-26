import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddFriend } from "@/hooks/friends/use-add-friend";
import { useSearchFriends } from "@/hooks/friends/use-search-friends";
import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";

export function FriendSearch() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 100);

  const { data = [] } = useSearchFriends(debounced);
  const addFriend = useAddFriend();

  return (
    <div className="space-y-2">
      <Input
        placeholder="Rechercher un ami…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {data.length > 0 && (
        <div className="border rounded-md">
          {data.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-3 py-2 hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatarUrl ?? undefined} />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.username}</span>
              </div>

              <Button
                size="sm"
                disabled={user.friendshipStatus === "PENDING"}
                onClick={() => {
                  addFriend.mutate({ friendId: user.id });
                }}
              >
                {user.friendshipStatus === "PENDING" ? "En attente" : "Ajouter"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
