import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { UserRole } from "@/types/user";
import { Briefcase, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  ticketsCount: number;
  userRole: UserRole;
}

export function UserMenuBusinessSection({ ticketsCount, userRole }: Props) {
  const navigate = useNavigate();

  return (
    <div className="p-1.5">
      <DropdownMenuItem
        onClick={() => navigate("/wallet")}
        className="w-full cursor-pointer py-2.5 focus:bg-violet-500/10 focus:text-violet-700"
      >
        <Ticket className="w-4 h-4 mr-3" />
        <span className="flex-1">Mes Tickets</span>
        {ticketsCount > 0 && (
          <span className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 text-xs font-bold px-2 py-0.5 rounded-full">
            {ticketsCount}
          </span>
        )}
      </DropdownMenuItem>

      {userRole === "PROFESSIONAL" && (
        <DropdownMenuItem
          onClick={() => navigate("/professional")}
          className="w-full cursor-pointer py-2.5 items-start focus:bg-violet-500/10 focus:text-violet-700"
        >
          <Briefcase className="w-4 h-4 mr-3 mt-0.5 text-muted-foreground group-focus:text-violet-700" />
          <div className="flex flex-col gap-0.5">
            <span>Espace Pro</span>
            <span className="text-xs text-muted-foreground group-focus:text-violet-600">
              Gérer mon établissement
            </span>
          </div>
        </DropdownMenuItem>
      )}
    </div>
  );
}
