import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export function NavPill({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}) {
  return (
    <NavLink
      to={to}
      className={cn(
        "group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ease-in-out",
        active
          ? "bg-background shadow-sm text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-background/50",
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-colors",
          active ? "text-primary fill-primary/20" : "group-hover:text-primary",
        )}
      />
      <span className={cn("text-sm font-medium", active ? "font-semibold" : "")}>{label}</span>
    </NavLink>
  );
}
