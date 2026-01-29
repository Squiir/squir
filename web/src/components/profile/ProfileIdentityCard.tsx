import { AvatarUploadDialog } from "@/components/profile/AvatarUploadDialog";
import { StatusEditDialog } from "@/components/profile/StatusEditDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLogout } from "@/hooks/auth/use-logout";
import { useAddFriend } from "@/hooks/friends/use-add-friend";
import type { User } from "@/types/user";
import { Check, LogOut, Pen, Settings, Share2, Star, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  user?: User;
  friendsCount?: number;
  isOwnProfile?: boolean;
  isFriend?: boolean;
}

export function ProfileIdentityCard({
  user,
  friendsCount = 0,
  isOwnProfile = true,
  isFriend = false,
}: Props) {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { mutate: addFriend, isPending: isAddingFriend } = useAddFriend();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  if (!user) return null;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/share/${user.username}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setHasCopied(true);
      toast.success("Lien du profil copié !");
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      toast.error("Impossible de copier le lien");
    }
  };

  const handleAddFriend = () => {
    if (user.id) {
      addFriend({ friendId: user.id });
    }
  };

  return (
    <>
      <Card className="p-8 flex flex-col items-center text-center space-y-6 rounded-3xl border-primary/10 sticky top-6 h-fit bg-card/50 backdrop-blur-sm">
        <div
          className={`relative group ${isOwnProfile ? "cursor-pointer" : ""}`}
          onClick={() => isOwnProfile && setIsAvatarOpen(true)}
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110 opacity-50 group-hover:opacity-75 transition-opacity" />
          <Avatar className="w-32 h-32 ring-4 ring-background shadow-xl">
            <AvatarImage src={user.avatarUrl ?? undefined} className="object-cover" />
            <AvatarFallback className="text-4xl font-bold bg-muted">
              {user.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isOwnProfile && (
            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
              <Pen className="text-white w-8 h-8 drop-shadow-lg" />
            </div>
          )}
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full ring-4 ring-card" />
        </div>

        <div className="space-y-2 w-full">
          {(user.firstName && user.lastName && (
            <h2 className="text-2xl font-bold tracking-tight">{`${user.firstName} ${user.lastName}`}</h2>
          )) || <h2 className="text-2xl font-bold tracking-tight">{user.username}</h2>}
          <p className="text-muted-foreground text-sm font-medium">
            @{user.username?.toLowerCase()}
          </p>

          <div
            className={`flex items-center justify-center gap-2 mt-4 ${
              isOwnProfile ? "cursor-pointer group/status" : ""
            }`}
            onClick={() => isOwnProfile && setIsStatusOpen(true)}
          >
            <div className="bg-yellow-300/30 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-muted/80 transition-colors">
              {user.status ? (
                <>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{user.status}</span>
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>Prêt à sortir 🍻</span>
                </>
              )}
            </div>
            {isOwnProfile && (
              <Pen className="w-4 h-4 opacity-0 group-hover/status:opacity-100 transition-opacity" />
            )}
          </div>
        </div>

        <div className="w-full pt-6 border-t border-border/50">
          <div className="grid grid-cols-1 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-foreground">{friendsCount}</p>
              <p className="text-sm text-muted-foreground uppercase font-semibold tracking-wider">
                Amis
              </p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-3 pt-4">
          {isOwnProfile ? (
            <>
              <Button
                className="w-full rounded-xl h-12 font-semibold text-base shadow-lg shadow-primary/20"
                size="lg"
                onClick={handleShare}
              >
                {hasCopied ? (
                  <Check className="w-5 h-5 mr-2" />
                ) : (
                  <Share2 className="w-5 h-5 mr-2" />
                )}
                {hasCopied ? "Copié !" : "Partager mon profil"}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl h-11 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors text-sm font-medium"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl h-11 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors text-sm font-medium"
                  onClick={() => logout()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </>
          ) : isFriend ? (
            <Button
              className="w-full rounded-xl h-12 font-semibold text-base shadow-lg shadow-primary/20 bg-green-300/40 text-green-600 hover:bg-green-300/50 border border-green-200"
              size="lg"
              disabled
            >
              <Check className="w-5 h-5 mr-2" />
              Ami(e)
            </Button>
          ) : (
            <Button
              className="w-full rounded-xl h-12 font-semibold text-base shadow-lg shadow-primary/20 bg-violet-600 hover:bg-violet-700 text-white"
              size="lg"
              onClick={handleAddFriend}
              disabled={isAddingFriend}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {isAddingFriend ? "Envoi..." : "Ajouter en ami"}
            </Button>
          )}
        </div>
      </Card>

      <AvatarUploadDialog isOpen={isAvatarOpen} onOpenChange={setIsAvatarOpen} />
      <StatusEditDialog
        isOpen={isStatusOpen}
        onOpenChange={setIsStatusOpen}
        currentStatus={user.status}
      />
    </>
  );
}
