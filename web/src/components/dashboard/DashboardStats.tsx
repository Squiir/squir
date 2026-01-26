import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardStats as DashboardStatsType } from "@/types/dashboard";
import { BarChart3, QrCode, TrendingUp, Users } from "lucide-react";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenus du jour</CardTitle>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.dailyRevenue.toFixed(2)} €</div>
          <p className="text-xs text-muted-foreground">Total généré aujourd'hui</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">QR Scannés</CardTitle>
          <QrCode className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.scannedKnownCount}</div>
          <p className="text-xs text-muted-foreground">Offres consommées aujourd'hui</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offre Populaire</CardTitle>
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate">{stats.mostPopularOffer}</div>
          <p className="text-xs text-muted-foreground">Meilleure vente (historique)</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilisateurs Uniques</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
          <p className="text-xs text-muted-foreground">Clients distincts</p>
        </CardContent>
      </Card>
    </div>
  );
}
