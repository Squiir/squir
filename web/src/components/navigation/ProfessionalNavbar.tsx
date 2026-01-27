import { Button, buttonVariants } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/use-logout";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, QrCode, Ticket } from "lucide-react";
import { NavLink } from "react-router-dom";

export function ProfessionalNavbar() {
  const { mutate: logout } = useLogout();

  return (
    <nav className="border-b bg-background px-6 py-3 flex items-center justify-end gap-2">
      <div className="flex items-center gap-2">
        <NavLink
          to="/scanner"
          className={({ isActive }) =>
            cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }), "gap-2")
          }
        >
          <QrCode className="h-4 w-4" />
          <span className="font-medium">Scanner</span>
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }), "gap-2")
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/offers"
          className={({ isActive }) =>
            cn(buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }), "gap-2")
          }
        >
          <Ticket className="h-4 w-4" />
          <span className="font-medium">Offres</span>
        </NavLink>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => logout()}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Déconnexion</span>
        </Button>
      </div>
    </nav>
  );
}
