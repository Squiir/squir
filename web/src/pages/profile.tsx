import { RequireAuth } from "@/components/auth/RequireAuth";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import { ProfileIdentityCard } from "@/components/profile/ProfileIdentityCard";
import { useMe } from "@/hooks/user/use-me";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-muted/10 pb-20 pt-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Identity Card (Sticky) */}
            <div className="lg:col-span-4 lg:sticky lg:top-8 z-10 animate-in slide-in-from-left-8 duration-500">
              <ProfileIdentityCard user={user} />
            </div>

            {/* Right Column: Social Dashboard */}
            <div className="lg:col-span-8">
              <ProfileDashboard user={user} />
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
