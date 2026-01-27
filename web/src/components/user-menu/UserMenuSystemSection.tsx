import { ProfileToggleMode } from "@/components/profile/ProfileToggleMode";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CircleHelp, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserMenuSystemSection() {
  const navigate = useNavigate();

  return (
    <div className="p-1.5">
      <DropdownMenuItem
        onClick={() => navigate("/settings")}
        className="w-full cursor-pointer py-2.5 focus:bg-violet-500/10 focus:text-violet-700"
      >
        <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
        <span>Paramètres</span>
      </DropdownMenuItem>

      <div className="px-2 py-1.5 flex items-center w-full outline-none hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors cursor-default">
        <div className="flex flex-1 items-center">
          <ProfileToggleMode singleIcon />
        </div>
      </div>

      <DropdownMenuItem
        onClick={() => navigate("/help")}
        className="w-full cursor-pointer py-2.5 focus:bg-violet-500/10 focus:text-violet-700"
      >
        <CircleHelp className="w-4 h-4 mr-3 text-muted-foreground" />
        <span>Aide</span>
      </DropdownMenuItem>
    </div>
  );
}
