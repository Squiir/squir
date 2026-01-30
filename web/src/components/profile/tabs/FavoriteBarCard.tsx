import { Card } from "@/components/ui/card";
import type { Bar } from "@/types/bar";
import { Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  bar: Pick<Bar, "id" | "name" | "address" | "arrondissement">;
}

export function FavoriteBarCard({ bar }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      className="group relative overflow-hidden flex p-4 gap-4 border-none bg-card hover:bg-card/80 transition-all cursor-pointer hover:border-primary/50 hover:ring-1 hover:ring-primary/50 shadow-md"
      onClick={() => navigate(`/bars/${bar.id}`)}
    >
      <div className="w-24 h-24 shrink-0 bg-muted/20 rounded-xl overflow-hidden flex items-center justify-center p-6">
        <Store className="w-full h-full text-muted-foreground/50" />
      </div>
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold leading-none group-hover:text-primary transition-colors text-foreground truncate">
            {bar.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {bar.address} {bar.arrondissement}e
          </p>
        </div>
      </div>
    </Card>
  );
}
