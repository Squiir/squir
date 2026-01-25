import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, QrCode, Ticket } from "lucide-react";
import { NavLink } from "react-router-dom";

export function ProNavbar() {
  return (
    <nav className="border-t bg-background p-2">
      <div className="grid grid-cols-3 gap-1 mx-auto max-w-md">
        <NavLink
          to="/scanner"
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: isActive ? "default" : "ghost" }),
              "flex flex-col items-center h-auto py-2 gap-1 rounded-xl",
            )
          }
        >
          <QrCode className="h-5 w-5" />
          <span className="text-[10px] font-medium">Scanner</span>
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: isActive ? "default" : "ghost" }),
              "flex flex-col items-center h-auto py-2 gap-1 rounded-xl",
            )
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/offers"
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: isActive ? "default" : "ghost" }),
              "flex flex-col items-center h-auto py-2 gap-1 rounded-xl",
            )
          }
        >
          <Ticket className="h-5 w-5" />
          <span className="text-[10px] font-medium">Offres</span>
        </NavLink>
      </div>
    </nav>
  );
}
