import { offerService } from "@/services/offer.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useSearchOffers(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return useQuery({
    queryKey: ["offers", "search", debouncedQuery],
    queryFn: () => offerService.search(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}
