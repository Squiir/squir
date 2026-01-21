import { ScannerPermissionError } from "./ScannerPermissionError";

interface ScannerViewfinderProps {
  permissionError: boolean;
  onRetry: () => void;
}

export function ScannerViewfinder({ permissionError, onRetry }: ScannerViewfinderProps) {
  return (
    <div className="relative w-full max-w-[500px] aspect-square mb-8">
      <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50 z-10">
        <div id="reader" className="w-full h-full bg-black">
          {permissionError && <ScannerPermissionError onRetry={onRetry} />}
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none rounded-[40px]">
        <div className="absolute top-8 left-8 w-10 h-10 border-l-[6px] border-t-[6px] border-white rounded-tl-xl shadow-sm" />
        <div className="absolute top-8 right-8 w-10 h-10 border-r-[6px] border-t-[6px] border-white rounded-tr-xl shadow-sm" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-l-[6px] border-b-[6px] border-white rounded-bl-xl shadow-sm" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-r-[6px] border-b-[6px] border-white rounded-br-xl shadow-sm" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-50">
          <div className="absolute w-full h-1 bg-white/80 rounded-full" />
          <div className="absolute h-full w-1 bg-white/80 rounded-full" />
        </div>
      </div>
    </div>
  );
}
