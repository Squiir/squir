import { AvatarUploadDialog } from "@/components/profile/AvatarUploadDialog";
import { StatusEditDialog } from "@/components/profile/StatusEditDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLogout } from "@/hooks/auth/use-logout";
import type { User } from "@/types/user";
import { LogOut, Pen, Settings, Share2, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  user?: User;
  friendsCount?: number;
}

export function ProfileIdentityCard({ user, friendsCount = 0 }: Props) {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <>
      <Card className="p-8 flex flex-col items-center text-center space-y-6 rounded-3xl border-primary/10 sticky top-6 h-fit bg-card/50 backdrop-blur-sm">
        <div className="relative group cursor-pointer" onClick={() => setIsAvatarOpen(true)}>
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110 opacity-50 group-hover:opacity-75 transition-opacity" />
          <Avatar className="w-32 h-32 ring-4 ring-background shadow-xl">
            <AvatarImage src={user?.avatarUrl ?? undefined} className="object-cover" />
            <AvatarFallback className="text-4xl font-bold bg-muted">
              {user?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
            <Pen className="text-white w-8 h-8 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full ring-4 ring-card" />
        </div>

        <div className="space-y-2 w-full">
          {(user?.firstName && user?.lastName && (
            <h2 className="text-2xl font-bold tracking-tight">{`${user?.firstName} ${user?.lastName}`}</h2>
          )) || <h2 className="text-2xl font-bold tracking-tight">{user?.username ?? "—"}</h2>}
          <p className="text-muted-foreground text-sm font-medium">
            @{user?.username?.toLowerCase() ?? "user"}
          </p>

          <div
            className="flex items-center justify-center gap-2 mt-4 cursor-pointer group/status"
            onClick={() => setIsStatusOpen(true)}
          >
            <div className="bg-yellow-300/30 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-muted/80 transition-colors">
              {user?.status ? (
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
            <Pen className="w-4 h-4 opacity-0 group-hover/status:opacity-100 transition-opacity" />
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
          <Button
            className="w-full rounded-xl h-12 font-semibold text-base shadow-lg shadow-primary/20"
            size="lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Partager mon profil
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
        </div>
      </Card>

      <AvatarUploadDialog isOpen={isAvatarOpen} onOpenChange={setIsAvatarOpen} />
      <StatusEditDialog
        isOpen={isStatusOpen}
        onOpenChange={setIsStatusOpen}
        currentStatus={user?.status}
      />
    </>
  );
}


// import { useState } from 'react';
// import { Share2, Lock, LogOut, UserPlus, Check, Copy } from 'lucide-react';
// import { toast } from 'sonner';
// import { User } from '@/types/user';
// import { useAuth } from '@/hooks/auth/use-auth';
// import { useAddFriend } from '@/hooks/friends/use-add-friend'; // Assure-toi d'avoir ce hook ou service
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { StatusEditDialog } from './StatusEditDialog';

// interface ProfileIdentityCardProps {
//   user: Partial<User>; // Partial car le profil partagé n'a pas toutes les infos
//   isOwnProfile?: boolean;
// }

// export function ProfileIdentityCard({ user, isOwnProfile = false }: ProfileIdentityCardProps) {
//   const { logout } = useAuth();
//   const { mutate: addFriend, isPending } = useAddFriend();
//   const [hasCopied, setHasCopied] = useState(false);

//   const handleShare = async () => {
//     // Génère le lien : https://squir.app/users/dydou/share
//     const shareUrl = `${window.location.origin}/users/${user.username}/share`;

//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setHasCopied(true);
//       toast.success("Lien du profil copié !");
//       setTimeout(() => setHasCopied(false), 2000);
//     } catch (err) {
//       toast.error("Impossible de copier le lien");
//     }
//   };

//   const handleAddFriend = () => {
//     if (user.username) {
//       // On suppose que l'API addFriend accepte un username ou qu'on a l'ID
//       // Si ton backend shareByUsername ne renvoie pas l'ID, il faudra l'ajouter au select backend !
//       addFriend(user.username);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm sticky top-6">

//       {/* Header Profil */}
//       <div className="flex flex-col items-center text-center space-y-4">
//         <div className="relative group cursor-pointer">
//           {/* Anneau de statut */}
//           <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
//           <Avatar className="relative w-32 h-32 border-4 border-white dark:border-gray-900">
//             <AvatarImage src={user.avatarUrl || undefined} alt={user.username} className="object-cover" />
//             <AvatarFallback className="text-4xl font-bold bg-gray-100 dark:bg-gray-800">
//               {user.username?.substring(0, 2).toUpperCase()}
//             </AvatarFallback>
//           </Avatar>

//           {/* Indicateur en ligne (décoratif) */}
//           <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
//             <div className="w-full h-full rounded-full animate-pulse bg-green-400 opacity-50 absolute"></div>
//           </div>
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
//             {user.username}
//           </h1>
//           {isOwnProfile && (
//             <div className="mt-2">
//                <StatusEditDialog currentStatus={user.status} />
//             </div>
//           )}
//           {!isOwnProfile && user.status && (
//              <p className="text-sm text-gray-500 mt-1">"{user.status}"</p>
//           )}
//         </div>

//         {/* Badges (Exemple) */}
//         <div className="flex flex-wrap gap-2 justify-center">
//           <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
//             SQUIR Member
//           </Badge>
//         </div>

//         {/* Stats (Optionnel, si dispo dans user) */}
//         {/* <div className="flex items-center gap-4 text-sm text-gray-500 py-2 border-t border-gray-100 dark:border-gray-800 w-full justify-center mt-4">
//            <span><b>142</b> Amis</span>
//         </div> */}
//       </div>

//       {/* Actions Principales */}
//       <div className="mt-8 space-y-3">

//         {isOwnProfile ? (
//           // --- VUE PROPRIÉTAIRE ---
//           <>
//             <Button
//               variant="default"
//               className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900"
//               onClick={handleShare}
//             >
//               {hasCopied ? <Check size={18} className="mr-2" /> : <Share2 size={18} className="mr-2" />}
//               {hasCopied ? "Copié !" : "Partager mon profil"}
//             </Button>

//             <div className="grid grid-cols-2 gap-3">
//                <Button variant="outline" className="w-full" size="sm">
//                 <Lock size={16} className="mr-2" /> Mdp
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-200 dark:border-red-900/30"
//                 size="sm"
//                 onClick={logout}
//               >
//                 <LogOut size={16} className="mr-2" />
//                 Déconnexion
//               </Button>
//             </div>
//           </>
//         ) : (
//           // --- VUE VISITEUR ---
//           <Button
//             className="w-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25"
//             onClick={handleAddFriend}
//             disabled={isPending}
//           >
//             <UserPlus size={18} className="mr-2" />
//             {isPending ? "Demande envoyée" : "Ajouter en ami"}
//           </Button>
//         )}

//       </div>
//     </div>
//   );
// }
