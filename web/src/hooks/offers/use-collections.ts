import { useMyLocation } from "@/hooks/user/use-my-location";
import { offerService } from "@/services/offer.service";
import { useQuery } from "@tanstack/react-query";

export function useCollections() {
  const { location } = useMyLocation();

  const bestSellingQuery = useQuery({
    queryKey: ["offers", "best-selling"],
    queryFn: offerService.getBestSelling,
  });

  const nearbyQuery = useQuery({
    queryKey: ["offers", "nearby", location?.latitude, location?.longitude],
    queryFn: () => {
      if (!location) return [];
      return offerService.getNearby(location.latitude, location.longitude);
    },
    enabled: !!location,
  });

  const recommendationsQuery = useQuery({
    queryKey: ["offers", "recommendations"],
    queryFn: offerService.getRecommendations,
  });

  return {
    bestSelling: bestSellingQuery.data || [],
    nearby: nearbyQuery.data || [],
    recommendations: recommendationsQuery.data || [],
    isLoading:
      bestSellingQuery.isLoading || nearbyQuery.isLoading || recommendationsQuery.isLoading,
  };
}
