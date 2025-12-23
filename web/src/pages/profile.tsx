import { RequireAuth } from "@/components/auth/RequireAuth";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileLoyaltyPoints } from "@/components/profile/ProfileLoyaltyPoints";
import { ProfileQrCodes } from "@/components/profile/ProfileQrCodes";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { useMe } from "@/hooks/user/use-me";

export default function ProfilePage() {
  const { data: user, isLoading } = useMe();

  return (
    <RequireAuth>
      <div className="min-h-[calc(100vh-3.5rem)] bg-muted/40">
        <div className="max-w-4xl px-6 py-10 mx-auto space-y-10">
          <ProfileHeader user={user} isLoading={isLoading} />

          <ProfileLoyaltyPoints user={user} isLoading={isLoading} />

          <ProfileQrCodes user={user} isLoading={isLoading} />

          <ProfileActions />
        </div>
      </div>
    </RequireAuth>
  );
}
