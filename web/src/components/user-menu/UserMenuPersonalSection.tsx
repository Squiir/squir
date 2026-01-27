import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Heart, User as UserIcon, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  favoritesCount: number;
  friendsCount: number;
}

export function UserMenuPersonalSection({ favoritesCount, friendsCount }: Props) {
  const navigate = useNavigate();

  return (
    <div className="p-1.5">
      <DropdownMenuItem
        onClick={() => navigate("/profile")}
        className="w-full cursor-pointer py-2.5 focus:bg-violet-500/10 focus:text-violet-700"
      >
        <UserIcon className="w-4 h-4 mr-3 text-muted-foreground group-focus:text-violet-700" />
        <span className="flex-1">Mon Profil</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => navigate("/profile")}
        className="w-full cursor-pointer py-2.5 focus:bg-violet-500/10 focus:text-violet-700"
      >
        <Heart className="w-4 h-4 mr-3 text-muted-foreground group-focus:text-violet-700" />
        <span className="flex-1">Lieux favoris</span>
        {favoritesCount > 0 && (
          <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            {favoritesCount}
          </span>
        )}
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => navigate("/social")}
        className="w-full cursor-pointer py-2.5 focus:bg-violet-500/10 focus:text-violet-700"
      >
        <Users className="w-4 h-4 mr-3 text-muted-foreground group-focus:text-violet-700" />
        <span className="flex-1">Mes Amis</span>
        {friendsCount > 0 && (
          <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            {friendsCount}
          </span>
        )}
      </DropdownMenuItem>
    </div>
  );
}
