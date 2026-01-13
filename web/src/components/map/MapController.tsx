import { Button } from "@/components/ui/button";
import { DEFAULT_ZOOM } from "@/constants/map";
import type { Coordinate } from "@/types/map";
import { LocateFixed } from "lucide-react";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export function MapController({ latitude, longitude }: Coordinate) {
  const map = useMap();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (latitude && longitude && !initializedRef.current) {
      map.flyTo([latitude, longitude], DEFAULT_ZOOM, { duration: 1 });
      initializedRef.current = true;
    }
  }, [latitude, longitude, map]);

  if (!latitude || !longitude) return null;

  return (
    <div className="absolute -translate-x-1/2 bottom-24 left-1/2 z-1000">
      <Button
        variant="secondary"
        className="h-auto gap-2 px-4 py-2 bg-white border rounded-full shadow-lg border-slate-200 hover:bg-slate-50"
        onClick={() => map.flyTo([latitude, longitude], DEFAULT_ZOOM, { duration: 1 })}
      >
        <LocateFixed className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-slate-700">Ma position</span>
      </Button>
    </div>
  );
}
