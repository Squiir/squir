import { Button } from "@/components/ui/button";
import type { Bar } from "@/types/bar";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface SavedVenuesListProps {
  venues: Pick<Bar, "id" | "name" | "address" | "arrondissement">[];
  isLoading: boolean;
  onToggleVenue: (id: string) => void;
}

export function SavedVenuesList({ venues, isLoading, onToggleVenue }: SavedVenuesListProps) {
  if (isLoading) {
    return <div className="p-4 text-center text-sm text-muted-foreground">Chargement...</div>;
  }

  if (venues.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground">
        Aucun établissement favori
      </div>
    );
  }

  return (
    <div className="grid gap-0">
      {venues.map((venue) => (
        <Link
          key={venue.id}
          to={`/bars/${venue.id}`}
          className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b last:border-0 group"
        >
          <div className="flex flex-col gap-1 overflow-hidden">
            <span className="font-semibold text-sm truncate">{venue.name}</span>
            <span className="text-xs text-muted-foreground truncate flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {venue.address}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-yellow-500 hover:text-yellow-600 hover:bg-transparent shrink-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleVenue(venue.id);
            }}
          >
            <Star className="w-4 h-4 fill-yellow-500" />
          </Button>
        </Link>
      ))}
    </div>
  );
}
