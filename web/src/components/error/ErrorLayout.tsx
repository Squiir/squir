import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ErrorLayoutProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  title: string;
  description?: string;
}

export function ErrorLayout({ children, className, icon, title, description }: ErrorLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[60vh] p-4 text-center max-w-md mx-auto",
        className,
      )}
    >
      {icon && <div className="mb-6 text-primary">{icon}</div>}
      <h1 className="text-2xl font-bold mb-2 tracking-tight">{title}</h1>
      {description && <p className="text-muted-foreground mb-8 text-lg">{description}</p>}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">{children}</div>
    </div>
  );
}
