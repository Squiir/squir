import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileWallet } from "@/components/profile/ProfileWallet";
import type { User } from "@/types/user";

interface Props {
  user?: User;
}

export function ProfileDashboard({ user }: Props) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 delay-100">
      {/* Element A: Wallet */}
      <ProfileWallet user={user} />

      {/* Element B: Tabs & Content */}
      <ProfileTabs />
    </div>
  );
}
