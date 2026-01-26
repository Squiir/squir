import { ProfileToggleMode } from "@/components/profile/ProfileToggleMode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/auth/use-auth";
import { useLogout } from "@/hooks/auth/use-logout";
import { useMe } from "@/hooks/user/use-me";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function UserMenu() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useMe();

  if (!isLoggedIn) {
    return (
      <Link to="/login">
        <Button>Se connecter</Button>
      </Link>
    );
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-20 h-4" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm transition-colors hover:bg-secondary/80 outline-none group data-[state=open]:bg-secondary/80">
          <Avatar className="w-9 h-9 border border-border/50">
            <AvatarImage src={user.avatarUrl ?? undefined} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-sm leading-none">
            <span className="font-bold text-foreground">{user.username}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors ml-1" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="w-4 h-4 mr-2" />
          Profil
        </DropdownMenuItem>

        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          <ProfileToggleMode singleIcon />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
