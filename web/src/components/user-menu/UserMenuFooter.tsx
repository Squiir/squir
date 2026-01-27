import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

interface Props {
  onLogout: () => void;
}

export function UserMenuFooter({ onLogout }: Props) {
  return (
    <div className="p-1.5">
      <DropdownMenuItem
        onClick={onLogout}
        className="w-full cursor-pointer py-2.5 text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
      >
        <LogOut className="w-4 h-4 mr-3" />
        <span className="font-medium">Se déconnecter</span>
      </DropdownMenuItem>
    </div>
  );
}
