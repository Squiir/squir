import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth/use-auth";
import { UserMenu } from "@/components/layout/UserMenu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex items-center justify-between gap-10 px-4 h-14">
        <Link to="/" className="text-lg font-bold">
          Squir
        </Link>

        {isLoggedIn && (
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex-wrap gap-10">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <NavLink to="/home">
                    <span className="font-bold text-md">Home</span>
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <NavLink to="/map">
                    <span className="font-bold text-md">Map</span>
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <NavLink to="/social">
                    <span className="font-bold text-md">Social</span>
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex justify-end w-12">{!isProfilePage && <UserMenu />}</div>
      </div>
    </header>
  );
}
