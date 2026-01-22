import { QR_HOSTNAME, QR_PROTOCOL, SCAN_DEBOUNCE_MS } from "@/constants/scanner";
import { useConsumeQrCode } from "@/hooks/qrcode/use-consume-qr-code";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useScanner() {
  const { mutateAsync: consumeQrCode, isPending } = useConsumeQrCode();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState(false);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMountedRef = useRef(true);

  const isPendingRef = useRef(isPending);
  const scannedRef = useRef(scanned);
  const processingRef = useRef(false);

  useEffect(() => {
    isPendingRef.current = isPending;
  }, [isPending]);

  useEffect(() => {
    scannedRef.current = scanned;
  }, [scanned]);

  const init = async () => {
    try {
      setPermissionError(false);
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
    } catch (err: any) {
      console.error("Initialization error", err);
      if (
        err?.name === "NotAllowedError" ||
        err?.name === "PermissionDeniedError" ||
        err?.message?.toLowerCase().includes("permission")
      ) {
        setPermissionError(true);
      } else {
        toast.error("Impossible d'initialiser le scanner");
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
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
          if (scannedRef.current || isPendingRef.current || processingRef.current) return;
          processingRef.current = true;
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
              processingRef.current = false;
              setTimeout(() => setScanned(false), SCAN_DEBOUNCE_MS);
              return;
            }

            if (scannerRef.current?.isScanning) {
              await scannerRef.current.stop();
            }

            const result = await consumeQrCode(qrId);
            toast.success(result.message || "QR Code validé !");
            setScannedData(result);
          } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Erreur lors de la validation");
            setScanned(false);
            processingRef.current = false;

            try {
              if (scannerRef.current && !scannerRef.current.isScanning && selectedCameraId) {
                await startScanner(selectedCameraId);
              }
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

  const handleRetry = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionError(false);
      await init();
    } catch (err) {
      console.error("Retry failed:", err);
      setPermissionError(true);
      toast.error("Impossible d'accéder à la caméra. Vérifiez vos paramètres navigateur.");
    }
  };

  const resetScan = () => {
    setScanned(false);
    setScannedData(null);
    processingRef.current = false;

    setTimeout(() => {
      try {
        if (scannerRef.current?.getState() === 2) {
          scannerRef.current?.resume();
        } else {
          throw new Error("Scanner not paused");
        }
      } catch (e) {
        if (selectedCameraId) {
          startScanner(selectedCameraId);
        } else {
          startScanner({ facingMode: "environment" });
        }
      }
    }, SCAN_DEBOUNCE_MS);
  };

  return {
    cameras,
    selectedCameraId,
    permissionError,
    scanned,
    scannedData,
    handleCameraChange,
    handleRetry,
    resetScan,
    init,
  };
}
