import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function ProfileToggleMode() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3">
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] scale-100 transition-all",
          isDark ? "dark:-rotate-90" : "rotate-0"
        )}
      />
      <Switch
        id="theme-mode"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon
        className={cn(
          "h-[1.2rem] w-[1.2rem] scale-100 transition-all",
          isDark ? "dark:rotate-0" : "-rotate-90"
        )}
      />
    </div>
  );
}
