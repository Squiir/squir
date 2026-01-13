import { Moon, Sun } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/lib/utils";

interface Props {
  singleIcon?: boolean;
}

export function ProfileToggleMode({ singleIcon }: Props) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  if (singleIcon) {
    return (
      <div className="flex items-center w-full">
        {isDark ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
        <span className="flex-1">Thème</span>
        <Switch
          id="theme-mode-single"
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] scale-100 transition-all",
          isDark ? "dark:-rotate-90" : "rotate-0",
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
          isDark ? "dark:rotate-0" : "-rotate-90",
        )}
      />
    </div>
  );
}
