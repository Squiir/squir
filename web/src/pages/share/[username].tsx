import { ProfileIdentityCard } from "@/components/profile/ProfileIdentityCard";
import { Button } from "@/components/ui/button";
import { AppSkeleton } from "@/components/ui/skeletons/AppSkeleton";
import { useGetFriends } from "@/hooks/friends/use-friends";
import { useMe } from "@/hooks/user/use-me";
import { useSharedProfile } from "@/hooks/user/use-shared-profile";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SharedProfile() {
  const { username } = useParams<{ username: string }>();
  const { data: currentUser } = useMe();
  const { data: friends } = useGetFriends();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.username === username) {
      navigate("/profile");
    }
  }, [currentUser, username, navigate]);

  const { data: sharedUser, isLoading, error } = useSharedProfile(username);

  const isFriend = friends?.some((f) => f.username.toLowerCase() === username?.toLowerCase());

  if (isLoading) return <AppSkeleton />;

  if (error || !sharedUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-4 text-center">
        <div className="bg-red-100 p-4 rounded-full">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold">Utilisateur introuvable</h1>
        <p className="text-muted-foreground">Ce profil n'existe pas ou le lien est invalide.</p>
        <Button onClick={() => navigate("/home")}>Retour à l'accueil</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4 space-y-6">
            <ProfileIdentityCard
              user={sharedUser}
              friendsCount={(sharedUser as any).friendsCount}
              isOwnProfile={false}
              isFriend={isFriend}
            />
          </aside>

          <main className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl p-8 border text-center py-20">
              <h2 className="text-xl font-semibold mb-2">Profil Sheers</h2>
              <p className="text-muted-foreground">
                Ajoutez {sharedUser.username} en ami pour voir ses sorties !
              </p>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}
