import { Card } from "@/components/ui/card";
import type { User } from "@/types/user";

interface Props {
  user?: User;
  isLoading: boolean;
}

export function ProfileLoyaltyPoints({ user }: Props) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Points de fidélité</p>
          <p className="text-3xl font-bold">{user?.loyaltyPoints ?? 0}</p>
        </div>
      </div>
    </Card>
  );
}
