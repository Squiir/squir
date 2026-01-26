export interface DashboardStats {
  dailyRevenue: number;
  scannedKnownCount: number;
  mostPopularOffer: string;
  uniqueUsers: number;
  revenueHistory: {
    date: string;
    revenue: number;
  }[];
}
