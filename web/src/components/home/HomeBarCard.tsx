import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/user/use-favorites";
import type { Bar } from "@/types/bar";
import { Bookmark, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeBarCardProps {
  bar: Bar;
}

export function HomeBarCard({ bar }: HomeBarCardProps) {
  const navigate = useNavigate();
  const { toggleVenue, isVenueFavorite } = useFavorites();
  const displayImage = bar.offers?.[0]?.imageUrl;

  return (
    <div
      className="group cursor-pointer flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
      onClick={() => navigate(`/bars/${bar.id}`)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        {displayImage ? (
          <img
            src={displayImage}
            alt={bar.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Store className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-3 right-3 h-10 w-10 rounded-xl bg-background/90 text-foreground hover:bg-background/100 backdrop-blur-sm transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toggleVenue(bar.id);
          }}
        >
          <Bookmark
            className={`h-5 w-5 ${isVenueFavorite(bar.id) ? "fill-primary text-primary" : ""}`}
          />
          <span className="sr-only">Sauvegarder</span>
        </Button>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="font-semibold text-lg text-foreground truncate">{bar.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{bar.address}</p>
        <p className="text-xs text-muted-foreground/80">
          {bar.arrondissement ? `Paris ${bar.arrondissement}ème` : ""}
        </p>
      </div>
    </div>
  );
}
