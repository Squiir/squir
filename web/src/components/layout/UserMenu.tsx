import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/auth/use-logout";
import { useMe } from "@/hooks/user/use-me";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { data: user } = useMe();

  if (!user) return (
    <Button>
      <Link to="/login">Se connecter</Link>
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage src={user.avatarUrl} alt="user profile" />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="w-4 h-4 mr-2" />
          Profil
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => logout()} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
