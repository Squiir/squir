import { RequireAuth } from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/button";
import { QR_HOSTNAME, QR_PROTOCOL } from "@/constants/scanner";
import { useConsumeQrCode } from "@/hooks/qrcode/use-consume-qr-code";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ScannerPage() {
  const navigate = useNavigate();
  const { mutateAsync: consumeQrCode, isPending } = useConsumeQrCode();
  const [scanned, setScanned] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Use refs to access latest state in scanner callback without re-initializing scanner
  const isPendingRef = useRef(isPending);
  useEffect(() => {
    isPendingRef.current = isPending;
  }, [isPending]);

  const scannedRef = useRef(scanned);
  useEffect(() => {
    scannedRef.current = scanned;
  }, [scanned]);

  useEffect(() => {
    // Only initialize scanner once
    if (scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        aspectRatio: 1.0,
      },
      /* verbose= */ false,
    );
    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        // Use refs to check current state
        if (scannedRef.current || isPendingRef.current) return;

        // Basic check to prevent multiple rapid triggers
        setScanned(true); // optimistically lock

        try {
          let qrId: string | null = null;
          try {
            const url = new URL(decodedText);
            if (url.protocol === QR_PROTOCOL && url.hostname === QR_HOSTNAME) {
              qrId = url.searchParams.get("qr");
            }
          } catch {
            // Ignore parsing errors
          }

          if (!qrId) {
            toast.error("Ce QR Code n'est pas un code SQUIR valide");
            // Reset scan lock after delay
            setTimeout(() => setScanned(false), 2000);
            return;
          }

          scanner.pause(true); // visual pause

          const result = await consumeQrCode(qrId);
          toast.success(result.message || "QR Code validé !");

          setTimeout(() => {
            navigate(-1);
          }, 1500);
        } catch (error: any) {
          console.error(error);
          toast.error(error?.response?.data?.message || "Erreur lors de la validation");
          // Resume
          setScanned(false);
          scanner.resume();
        }
      },
      (_errorMessage) => {
        // Ignored
      },
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
    // We intentionally ignore dependency changes to avoid re-init of scanner
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequireAuth>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50 text-white hover:bg-white/20"
          onClick={() => {
            if (scannerRef.current) {
              scannerRef.current.clear().catch(console.error);
            }
            navigate(-1);
          }}
        >
          <X className="w-6 h-6" />
        </Button>

        <h1 className="text-2xl font-bold mb-8">Scanner un QR Code</h1>

        <div
          id="reader"
          className="w-full max-w-sm overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-900"
        ></div>

        <p className="mt-4 text-slate-400 text-sm">Placez le QR Code dans le cadre</p>
      </div>
    </RequireAuth>
  );
}
