import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { Bar } from "@/types/bar";
import { ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OfferHostedByCardProps {
  bar: Bar;
}

export function OfferHostedByCard({ bar }: OfferHostedByCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors border-none shadow-sm bg-card"
      onClick={() => navigate(`/bars/${bar.id}`)}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={undefined} alt={bar.name} className="object-cover" />
          <AvatarFallback>{bar.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-sm leading-none">{bar.name}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{bar.address}</span>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Card>
  );
}
