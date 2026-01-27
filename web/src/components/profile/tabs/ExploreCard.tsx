import { Card } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function ExploreCard({ icon: Icon, label, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-muted bg-transparent text-center h-full min-h-[140px] hover:bg-muted/30 transition-colors cursor-pointer group shadow-none"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
      </div>
    </Card>
  );
}
