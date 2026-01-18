import { RequireAuth } from "@/components/auth/RequireAuth";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileLoyaltyPoints } from "@/components/profile/ProfileLoyaltyPoints";
import { ProfileQrCodes } from "@/components/profile/ProfileQrCodes";
import { useMe } from "@/hooks/user/use-me";

export default function ProfilePage() {
  const { data: user, isLoading } = useMe();

  return (
    <RequireAuth>
      <div className="min-h-[calc(100vh-3.5rem)] bg-muted/40">
        <div className="max-w-4xl px-6 py-10 mx-auto space-y-10">
          <ProfileHeader user={user} />

          <ProfileLoyaltyPoints user={user} isLoading={isLoading} />

          <ProfileQrCodes />

          <ProfileActions />
        </div>
      </div>
    </RequireAuth>
  );
}
