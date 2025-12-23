import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ProfileToggleMode } from "@/components/profile/ProfileToggleMode";
import type { User } from "@/types/user";

interface Props {
  user?: User;
  isLoading: boolean;
}

export function ProfileHeader({ user, isLoading }: Props) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user?.avatarUrl ?? undefined} />
            <AvatarFallback>
              {user?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-lg font-semibold">{user?.username ?? "—"}</p>
            {user?.status && (
              <p className="text-sm text-muted-foreground">{user.status}</p>
            )}
          </div>
        </div>

        <ProfileToggleMode />
      </div>
    </Card>
  );
}
