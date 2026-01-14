import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateAvatar } from "@/hooks/user/use-update-avatar";
import { useUpdateStatus } from "@/hooks/user/use-update-status";
import type { User } from "@/types/user";
import { ChevronRight, Pen, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  user?: User;
  isLoading: boolean;
}

export function ProfileHeader({ user, isLoading }: Props) {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [status, setStatus] = useState("");

  const { mutate: updateAvatar, isPending: isAvatarPending } = useUpdateAvatar();
  const { mutate: updateStatus, isPending: isStatusPending } = useUpdateStatus();

  const handleAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAvatar(avatarUrl, {
      onSuccess: () => {
        toast.success("Avatar mis à jour");
        setIsAvatarOpen(false);
        setAvatarUrl("");
      },
      onError: () => toast.error("Erreur lors de la mise à jour de l'avatar"),
    });
  };

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatus(status, {
      onSuccess: () => {
        toast.success("Statut mis à jour");
        setIsStatusOpen(false);
        setStatus("");
      },
      onError: () => toast.error("Erreur lors de la mise à jour du statut"),
    });
  };

  const openAvatarDialog = () => {
    setAvatarUrl(user?.avatarUrl || "");
    setIsAvatarOpen(true);
  };

  const openStatusDialog = () => {
    setStatus(user?.status || "");
    setIsStatusOpen(true);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={openAvatarDialog}>
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.avatarUrl ?? undefined} className="object-cover" />
                <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200">
                <Pen className="text-white w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-semibold">{user?.username ?? "—"}</p>

              <div
                className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 group"
                onClick={openStatusDialog}
              >
                {user?.status ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{user.status}</span>
                    <Pen className="w-4 h-4 opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-2 py-1 rounded-md text-xs font-medium hover:bg-muted transition-colors">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>Ajoute ton statut</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'avatar</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAvatarSubmit} className="space-y-4">
            <Input
              placeholder="URL de l'image"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
            <Button type="submit" disabled={isAvatarPending} className="w-full">
              {isAvatarPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleStatusSubmit} className="space-y-4">
            <Input
              placeholder="Votre statut..."
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground text-right">{status.length}/50</p>
            <Button type="submit" disabled={isStatusPending} className="w-full">
              {isStatusPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
