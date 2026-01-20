import { LayoutDashboard } from "lucide-react";

export default function ProfessionalDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="p-4 bg-background rounded-full">
        <LayoutDashboard className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Placeholder for Dashboard</p>
    </div>
  );
}
