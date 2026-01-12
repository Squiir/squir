import { RequireAuth } from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QR_HOSTNAME, QR_PROTOCOL } from "@/constants/scanner";
import { useConsumeQrCode } from "@/hooks/qrcode/use-consume-qr-code";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Camera, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ScannerPage() {
  const navigate = useNavigate();
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
          } catch (e) {}
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
          .catch((err) => console.error(err));
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
          qrbox: { width: 250, height: 250 },
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
            } catch {}

            if (!qrId) {
              toast.error("Ce QR Code n'est pas un code SQUIR valide");
              setTimeout(() => setScanned(false), 2000);
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
            } catch (e) {}
          }
        },
        (_errorMessage) => {},
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

  return (
    <RequireAuth>
      <div className="flex flex-col items-center pt-8 min-h-[calc(100vh-64px)] pb-12 gap-8">
        <div className="flex flex-col items-center gap-2 pb-4">
          <h1 className="text-2xl font-bold">Scanner</h1>
          <p className="text-muted-foreground text-center text-sm max-w-xs">
            Placez le QR Code dans le cadre
          </p>
        </div>

        <div className="relative">
          <div
            id="reader"
            className="w-[300px] h-[300px] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100"
          ></div>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[200px] h-[200px] border-2 border-transparent relative"></div>
          </div>
        </div>

        {cameras.length > 0 && (
          <div className="w-full max-w-[300px] z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <Camera className="w-4 h-4" />
                    <span className="truncate">
                      {cameras.find((c) => c.id === selectedCameraId)?.label ||
                        "Caméra automatique"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]">
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
