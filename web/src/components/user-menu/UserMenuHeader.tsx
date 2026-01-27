import type { User } from "@/types/user";

interface Props {
  user: User;
}

export function UserMenuHeader({ user }: Props) {
  return (
    <div className="p-4 bg-muted/30 border-b">
      <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-2 flex items-center justify-between">
        <span>Mon Statut</span>
      </div>
      <div className="flex items-center gap-3 bg-background border rounded-lg p-2.5 shadow-sm">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium truncate">{user.status || "Prêt à sortir 🍻"}</span>
      </div>
    </div>
  );
}
