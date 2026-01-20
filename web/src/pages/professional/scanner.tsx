import { RequireAuth } from "@/components/auth/RequireAuth";
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
      <div className="flex flex-col items-center justify-center h-full max-h-screen bg-muted/20 p-4">
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
      </div>
    </RequireAuth>
  );
}
