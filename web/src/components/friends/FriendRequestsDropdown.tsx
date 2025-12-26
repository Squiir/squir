import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePendingFriends } from "@/hooks/friends/use-pending-friends";
import { useRespondFriend } from "@/hooks/friends/use-respond-friend";
import { Bell } from "lucide-react";

export function FriendRequestsDropdown() {
  const { data = [], isLoading } = usePendingFriends();
  const { mutate } = useRespondFriend();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {data.length > 0 && (
            <Badge
              className="absolute h-5 px-1 text-xs rounded-full -top-1 -right-1 min-w-5"
              variant="destructive"
            >
              {data.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <div className="px-3 py-2 text-sm font-semibold">Demandes d’amis</div>

        {isLoading && <div className="px-3 py-4 text-sm text-muted-foreground">Chargement…</div>}

        {!isLoading && data.length === 0 && (
          <div className="px-3 py-4 text-sm text-muted-foreground">Aucune demande en attente</div>
        )}

        {data.map((request) => (
          <div key={request.id} className="flex items-center justify-between gap-3 px-3 py-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={request.avatarUrl ?? undefined} />
                <AvatarFallback>{request.username?.charAt(0)?.toUpperCase() ?? "?"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{request.username ?? "Utilisateur"}</span>
            </div>

            <div className="flex gap-1">
              <Button size="sm" onClick={() => mutate({ requestId: request.id, accept: true })}>
                Accepter
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => mutate({ requestId: request.id, accept: false })}
              >
                Refuser
              </Button>
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
