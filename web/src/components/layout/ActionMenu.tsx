import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import type { ReactNode } from "react";

type Action =
  | {
      label: string;
      onClick: () => void;
      destructive?: boolean;
    }
  | {
      render: ReactNode;
    };

export function ActionMenu({ actions }: { actions: Action[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          if ("render" in action) {
            return <div key={index}>{action.render}</div>;
          }

          return (
            <DropdownMenuItem
              key={action.label}
              onClick={action.onClick}
              className={action.destructive ? "text-destructive" : ""}
            >
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
