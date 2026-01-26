import { FriendRequestsDropdown } from "@/components/friends/FriendRequestsDropdown";
import { UserMenu } from "@/components/layout/UserMenu";
import { NavPill } from "@/components/navigation/NavPill";
import { SavedItemsDropdown } from "@/components/saved/SavedItemsDropdown";
import { useAuth } from "@/hooks/auth/use-auth";
import { Home, Map as MapIcon, Users, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/20">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <span className="text-2xl font-black tracking-tight">SHƎERS</span>
          </Link>
        </div>

        {isLoggedIn && (
          <div className="flex-1 flex justify-center">
            <nav className="flex items-center gap-1 p-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm">
              <NavPill to="/home" icon={Home} label="Home" active={location.pathname === "/home"} />
              <NavPill to="/map" icon={MapIcon} label="Map" active={location.pathname === "/map"} />
              <NavPill
                to="/social"
                icon={Users}
                label="Social"
                active={location.pathname === "/social"}
              />
              <NavPill
                to="/wallet"
                icon={Wallet}
                label="Wallet"
                active={location.pathname === "/wallet"}
              />
            </nav>
          </div>
        )}

        <div className="flex-1 flex items-center justify-end gap-3">
          {isLoggedIn && (
            <>
              <SavedItemsDropdown />
              <FriendRequestsDropdown />
              {!isProfilePage && <UserMenu />}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
