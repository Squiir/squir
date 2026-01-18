import { AvatarUploadDialog } from "@/components/profile/AvatarUploadDialog";
import { StatusEditDialog } from "@/components/profile/StatusEditDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { User } from "@/types/user";
import { ChevronRight, Pen, Star } from "lucide-react";
import { useState } from "react";

interface Props {
  user?: User;
}

export function ProfileHeader({ user }: Props) {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => setIsAvatarOpen(true)}>
              <Avatar className="w-16 h-16 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                <AvatarImage src={user?.avatarUrl ?? undefined} className="object-cover" />
                <AvatarFallback className="text-lg font-medium">
                  {user?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-all duration-200 backdrop-blur-[1px]">
                <Pen className="text-white w-5 h-5 drop-shadow-md" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-semibold">{user?.username ?? "—"}</p>

              <div
                className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 group"
                onClick={() => setIsStatusOpen(true)}
              >
                {user?.status ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{user.status}</span>
                    <Pen className="w-4 h-4 opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-muted transition-colors border border-transparent hover:border-border">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Ajoute ton statut</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                )}
              </div>
            </div>
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
