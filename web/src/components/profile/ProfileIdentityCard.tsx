import { AvatarUploadDialog } from "@/components/profile/AvatarUploadDialog";
import { StatusEditDialog } from "@/components/profile/StatusEditDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLogout } from "@/hooks/auth/use-logout";
import type { User } from "@/types/user";
import { KeyRound, LogOut, Pen, Share2, Shield, Star } from "lucide-react";
import { useState } from "react";

interface Props {
  user?: User;
}

export function ProfileIdentityCard({ user }: Props) {
  const { mutate: logout } = useLogout();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <>
      <Card className="p-8 flex flex-col items-center text-center space-y-6 rounded-3xl border-primary/10 sticky top-6 h-fit bg-card/50 backdrop-blur-sm">
        {/* Avatar Hero */}
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
          {/* Online Indicator */}
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full ring-4 ring-card" />
        </div>

        {/* Identity Info */}
        <div className="space-y-2 w-full">
          <h2 className="text-2xl font-bold tracking-tight">{user?.username ?? "—"}</h2>
          <p className="text-muted-foreground text-sm font-medium">
            @{user?.username?.toLowerCase() ?? "user"}
          </p>

          {/* Status Badge */}
          <div
            className="flex items-center justify-center gap-2 mt-3 cursor-pointer group/status"
            onClick={() => setIsStatusOpen(true)}
          >
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/20 transition-colors">
              {user?.role === "PROFESSIONAL" ? (
                <Shield className="w-3 h-3" />
              ) : (
                <Star className="w-3 h-3" />
              )}
              <span>{user?.role === "PROFESSIONAL" ? "Pro Account" : "SQUIR Member"}</span>
            </div>
            <div className="bg-muted px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-muted/80 transition-colors">
              {user?.status ? (
                <>
                  <span>{user.status}</span>
                  <Pen className="w-3 h-3 opacity-0 group-hover/status:opacity-100 transition-opacity" />
                </>
              ) : (
                <>
                  <span>Prêt à sortir 🍻</span>
                  <Pen className="w-3 h-3 opacity-0 group-hover/status:opacity-100 transition-opacity" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full pt-4 border-t border-border/50">
          <div className="grid grid-cols-1 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">142</p>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Amis
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3 pt-2">
          <Button
            className="w-full rounded-xl h-12 font-semibold text-base shadow-lg shadow-primary/20"
            size="lg"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager mon profil
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="rounded-xl h-11 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Mdp
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-11 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
              onClick={() => logout()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sortir
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
