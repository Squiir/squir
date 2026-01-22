import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ScannerPermissionErrorProps {
  onRetry: () => void;
}

export function ScannerPermissionError({ onRetry }: ScannerPermissionErrorProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 p-6 text-center">
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <h3 className="text-white font-semibold text-lg mb-2">Accès caméra refusé</h3>
      <p className="text-white/70 text-sm mb-6 max-w-[280px]">
        Veuillez autoriser l'accès à la caméra dans les paramètres de votre navigateur.
      </p>
      <Button onClick={onRetry} variant="secondary" className="gap-2 rounded-full font-medium">
        <RefreshCcw className="w-4 h-4" />
        Réessayer
      </Button>
      <span className="text-white/70 text-xs opacity-70 mt-6 block max-w-[280px]">
        (Cliquez sur l'icône 🔒 ou 📷 dans la barre d'adresse si la popup n'apparaît pas)
      </span>
    </div>
  );
}
