import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

export function ZoomControlWithSlider() {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom());
    },
  });

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0];
    setZoom(newZoom);
    map.setZoom(newZoom);
  };

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="absolute flex flex-row items-center gap-4 p-3 -translate-x-1/2 border rounded-full shadow-xl bottom-8 left-1/2 z-1000 bg-white/90 backdrop-blur-sm border-slate-200">
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full hover:bg-slate-100"
        onClick={zoomOut}
      >
        <Minus className="w-5 h-5 text-slate-700" />
      </Button>

      <div className="flex items-center justify-center w-48 px-2">
        <Slider
          min={5}
          max={18}
          step={0.5}
          value={[zoom]}
          onValueChange={handleZoomChange}
          className="w-full cursor-pointer"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full hover:bg-slate-100"
        onClick={zoomIn}
      >
        <Plus className="w-5 h-5 text-slate-700" />
      </Button>
    </div>
  );
}
