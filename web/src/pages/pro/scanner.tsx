import { RequireAuth } from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QR_HOSTNAME, QR_PROTOCOL, SCAN_DEBOUNCE_MS } from "@/constants/scanner";
import { useConsumeQrCode } from "@/hooks/qrcode/use-consume-qr-code";
import { useMe } from "@/hooks/user/use-me";
import { UserRole } from "@/types/user";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Camera, ChevronDown, Loader, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProScannerPage() {
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { mutateAsync: consumeQrCode, isPending } = useConsumeQrCode();
  const [scanned, setScanned] = useState(false);
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMountedRef = useRef(true);

  const isPendingRef = useRef(isPending);
  const scannedRef = useRef(scanned);

  useEffect(() => {
    isPendingRef.current = isPending;
  }, [isPending]);

  useEffect(() => {
    scannedRef.current = scanned;
  }, [scanned]);

  useEffect(() => {
    if (!isUserLoading && user) {
      if (user.role !== UserRole.ADMIN && user.role !== UserRole.PROFESSIONAL) {
        toast.error("Vous n'avez pas accès à cette fonctionnalité.");
        navigate("/home");
      }
    }
  }, [user, isUserLoading, navigate]);

  useEffect(() => {
    isMountedRef.current = true;

    const init = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          setCameras(devices);
        }

        if (scannerRef.current) {
          try {
            if (scannerRef.current.isScanning) {
              await scannerRef.current.stop();
            }
            scannerRef.current.clear();
          } catch (e) {
            console.warn("Failed to clear previous scanner instance", e);
          }
        }

        const scanner = new Html5Qrcode("reader", {
          verbose: false,
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        });
        scannerRef.current = scanner;

        await startScanner({ facingMode: "environment" });
      } catch (err) {
        console.error("Initialization error", err);
        toast.error("Impossible d'initialiser le scanner");
      }
    };

    const timer = setTimeout(init, 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current?.clear())
          .catch((err) => console.error("Error stopping scanner on unmount", err));
      }
    };
  }, []);

  const startScanner = async (cameraIdOrConfig: string | { facingMode: string }) => {
    if (!scannerRef.current) return;

    try {
      if (scannerRef.current.isScanning) {
        await scannerRef.current.stop();
      }

      await scannerRef.current.start(
        cameraIdOrConfig,
        {
          fps: 10,
          aspectRatio: 1.0,
        },
        async (decodedText) => {
          if (scannedRef.current || isPendingRef.current) return;
          setScanned(true);

          try {
            let qrId: string | null = null;
            try {
              const url = new URL(decodedText);
              if (url.protocol === QR_PROTOCOL && url.hostname === QR_HOSTNAME) {
                qrId = url.searchParams.get("qr");
              }
            } catch (e) {
              console.warn("Failed to parse scanned text as URL", decodedText, e);
            }

            if (!qrId) {
              toast.error("Ce QR Code n'est pas un code SQUIR valide");
              setTimeout(() => setScanned(false), SCAN_DEBOUNCE_MS);
              return;
            }

            scannerRef.current?.pause(true);

            const result = await consumeQrCode(qrId);
            toast.success(result.message || "QR Code validé !");

            setTimeout(() => {
              if (isMountedRef.current) navigate(-1);
            }, 1500);
          } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Erreur lors de la validation");
            setScanned(false);
            try {
              scannerRef.current?.resume();
            } catch (e) {
              console.warn("Failed to resume scanner after error", e);
            }
          }
        },
        (errorMessage) => {
          console.log("Scan error", errorMessage);
        },
      );
    } catch (err) {
      console.error("Error starting scanner", err);
      toast.error("Impossible de démarrer la caméra sélectionnée");
    }
  };

  const handleCameraChange = (cameraId: string) => {
    setSelectedCameraId(cameraId);
    startScanner(cameraId);
  };

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

        <div className="relative w-full max-w-[500px] aspect-square mb-8">
          <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50 z-10">
            <div id="reader" className="w-full h-full bg-black" />
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

        {cameras.length > 0 && (
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
                        {cameras.find((c) => c.id === selectedCameraId)?.label ||
                          "Caméra automatique"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground/50 shrink-0 ml-2" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[300px] rounded-lg shadow-sm">
                {cameras.map((camera) => (
                  <DropdownMenuItem key={camera.id} onClick={() => handleCameraChange(camera.id)}>
                    {camera.label || `Camera ${camera.id}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
