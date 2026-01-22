import { RequireAuth } from "@/components/auth/RequireAuth";
import { ScannedHistory } from "@/components/scanner/ScannedHistory";
import { ScannerCameraSelector } from "@/components/scanner/ScannerCameraSelector";
import { ScannerViewfinder } from "@/components/scanner/ScannerViewfinder";
import { useScanner } from "@/hooks/scanner/use-scanner";
import { useMe } from "@/hooks/user/use-me";
import { UserRole } from "@/types/user";
import { Loader, QrCode } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProfessionalScannerPage() {
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { cameras, selectedCameraId, permissionError, handleCameraChange, handleRetry } =
    useScanner();

  useEffect(() => {
    if (!isUserLoading && user) {
      if (user.role !== UserRole.ADMIN && user.role !== UserRole.PROFESSIONAL) {
        toast.error("Vous n'avez pas accès à cette fonctionnalité.");
        navigate("/home");
      }
    }
  }, [user, isUserLoading, navigate]);

  if (isUserLoading) return <Loader />;

  return (
    <RequireAuth>
      <div className="flex h-full bg-muted/20 overflow-hidden">
        <aside className="hidden lg:flex flex-col w-96 p-6 border-r bg-muted/10 h-full overflow-hidden shrink-0">
          <ScannedHistory />
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-y-auto">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="p-4 bg-background rounded-2xl shadow-sm">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Scanner</h1>
              <p className="text-muted-foreground text-sm">Placez le QR Code dans le cadre</p>
            </div>
          </div>

          <ScannerViewfinder permissionError={permissionError} onRetry={handleRetry} />

          <ScannerCameraSelector
            cameras={cameras}
            selectedCameraId={selectedCameraId}
            onCameraChange={handleCameraChange}
          />

          <div className="lg:hidden w-full max-w-md mt-8">
            <ScannedHistory />
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
