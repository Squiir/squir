import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/auth/use-logout";
import { useMe } from "@/hooks/user/use-me";
import { useAuth } from "@/hooks/auth/use-auth";

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
        <button className="flex items-center gap-4 outline-none">
          <span className="font-medium text-md">{user.username}</span>
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatarUrl ?? undefined} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="w-4 h-4 mr-2" />
          Profil
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => logout()}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
