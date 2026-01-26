import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { useDasboardStat } from "@/hooks/dashboard/use-dashboard-stat";
import { useMe } from "@/hooks/user/use-me";
import { barService } from "@/services/bar.service";

export default function ProfessionalDashboardPage() {
  const { data: user } = useMe();
  const barId = user?.barId;

  const { data: stats, isLoading } = useDasboardStat(barId);

  const handleOpenStripeDashboard = async () => {
    if (!barId) return;
    try {
      const url = await barService.getStripeDashboardLink(barId);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Failed to get Stripe dashboard link", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Chargement des données...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Aucune donnée disponible.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-8 h-full overflow-y-auto">
      <DashboardHeader onOpenStripeDashboard={handleOpenStripeDashboard} />
      <DashboardStats stats={stats} />
      <RevenueChart data={stats.revenueHistory} />
    </div>
  );
}
