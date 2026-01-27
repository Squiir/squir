import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types/user";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  user: User;
}

export const UserMenuTrigger = forwardRef<HTMLButtonElement, Props>(({ user, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm transition-colors hover:bg-secondary/80 outline-none group data-[state=open]:bg-secondary/80"
      {...props}
    >
      <Avatar className="w-9 h-9 border border-border/50">
        <AvatarImage src={user.avatarUrl ?? undefined} />
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start text-sm leading-none">
        <span className="font-bold text-foreground">{user.username}</span>
      </div>
      <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors ml-1" />
    </button>
  );
});

UserMenuTrigger.displayName = "UserMenuTrigger";
