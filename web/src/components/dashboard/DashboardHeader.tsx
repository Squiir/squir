import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface DashboardHeaderProps {
  onOpenStripeDashboard: () => void;
}

export function DashboardHeader({ onOpenStripeDashboard }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité et performances.</p>
      </div>
      <Button onClick={onOpenStripeDashboard} className="gap-2">
        <CreditCard className="w-4 h-4" />
        Dashboard Financier
      </Button>
    </div>
  );
}
