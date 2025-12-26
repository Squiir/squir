import type { UserLite } from "@/types/social";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReadByAvatars({ users }: { users: UserLite[] }) {
  const shown = users.slice(0, 3);
  if (!shown.length) return null;

  return (
    <div className="flex items-center">
      {shown.map((u, idx) => (
        <div key={u.id} style={{ marginLeft: idx === 0 ? 0 : -8 }}>
          <Avatar className="w-5 h-5 border bg-background">
            <AvatarImage src={u.avatarUrl ?? undefined} />
            <AvatarFallback className="text-[10px]">
              {u.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
}
