import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Camera, ChevronDown } from "lucide-react";

interface ScannerCameraSelectorProps {
  cameras: Array<{ id: string; label: string }>;
  selectedCameraId: string | null;
  onCameraChange: (cameraId: string) => void;
}

export function ScannerCameraSelector({
  cameras,
  selectedCameraId,
  onCameraChange,
}: ScannerCameraSelectorProps) {
  if (cameras.length === 0) return null;

  return (
    <div className="w-full max-w-[350px] z-30">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 rounded-full border-border/50 shadow-sm bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <div className="flex items-center justify-between w-full px-2 max-w-full">
              <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                <Camera className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="font-medium truncate text-sm">
                  {cameras.find((c) => c.id === selectedCameraId)?.label || "Caméra automatique"}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground/50 shrink-0 ml-2" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[300px] rounded-lg shadow-sm">
          {cameras.map((camera) => (
            <DropdownMenuItem key={camera.id} onClick={() => onCameraChange(camera.id)}>
              {camera.label || `Camera ${camera.id}`}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
