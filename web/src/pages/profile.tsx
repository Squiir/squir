import { RequireAuth } from "@/components/auth/RequireAuth";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import { ProfileIdentityCard } from "@/components/profile/ProfileIdentityCard";
import { useGetFriends } from "@/hooks/friends/use-friends";
import { useFavorites } from "@/hooks/user/use-favorites";
import { useMe } from "@/hooks/user/use-me";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: user, isLoading: isUserLoading } = useMe();
  const { data: friends, isLoading: isFriendsLoading } = useGetFriends();
  const { favoriteVenues, savedOffers, isLoading: isFavoritesLoading } = useFavorites();

  const isLoading = isUserLoading || isFriendsLoading || isFavoritesLoading;

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
            <div className="lg:col-span-4 lg:sticky lg:top-8 z-10 animate-in slide-in-from-left-8 duration-500">
              <ProfileIdentityCard user={user} friendsCount={friends?.length ?? 0} />
            </div>
            <div className="lg:col-span-8">
              <ProfileDashboard
                user={user}
                favoriteVenues={favoriteVenues}
                savedOffers={savedOffers}
              />
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
