import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserMenuBusinessSection } from "@/components/user-menu/UserMenuBusinessSection";
import { UserMenuFooter } from "@/components/user-menu/UserMenuFooter";
import { UserMenuHeader } from "@/components/user-menu/UserMenuHeader";
import { UserMenuPersonalSection } from "@/components/user-menu/UserMenuPersonalSection";
import { UserMenuSystemSection } from "@/components/user-menu/UserMenuSystemSection";
import { UserMenuTrigger } from "@/components/user-menu/UserMenuTrigger";
import { useAuth } from "@/hooks/auth/use-auth";
import { useLogout } from "@/hooks/auth/use-logout";
import { useGetFriends } from "@/hooks/friends/use-friends";
import { useGetMyQrCodes } from "@/hooks/qrcode/use-get-qr-codes";
import { useFavorites } from "@/hooks/useFavorites";
import { useMe } from "@/hooks/user/use-me";
import { Link } from "react-router-dom";

export function UserMenu() {
  const { isLoggedIn } = useAuth();
  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useMe();
  const { data: friends } = useGetFriends();
  const { favoriteVenues } = useFavorites();
  const { data: tickets } = useGetMyQrCodes();

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

  const friendsCount = friends?.length ?? 0;
  const favoritesCount = favoriteVenues.length;
  const ticketsCount = tickets?.length ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserMenuTrigger user={user} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0 animate-in fade-in slide-in-from-top-2">
        <UserMenuHeader user={user} />

        <UserMenuPersonalSection favoritesCount={favoritesCount} friendsCount={friendsCount} />

        <DropdownMenuSeparator className="bg-border/50" />

        <UserMenuBusinessSection ticketsCount={ticketsCount} userRole={user.role} />

        <DropdownMenuSeparator className="bg-border/50" />

        <UserMenuSystemSection />

        <DropdownMenuSeparator className="bg-border/50" />

        <UserMenuFooter onLogout={() => logout()} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
