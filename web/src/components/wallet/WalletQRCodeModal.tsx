import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn, formatPrice } from "@/lib/utils";
import type { WalletActiveItem } from "@/types/wallet";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: WalletActiveItem | null;
}

export function WalletQRCodeModal({ open, onOpenChange, item }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
    }
  }, [open, item]);

  if (!item) return null;

  const currentQR = item.qrCodes[currentIndex];
  const total = item.qrCodes.length;

  const nextParams = () => {
    if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevParams = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl border-none shadow-2xl p-0 overflow-hidden h-screen sm:h-auto sm:rounded-[2rem] flex flex-col justify-center">
        <DialogHeader className="sr-only">
          <DialogTitle>{item.offerName}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-8 space-y-8 w-full h-full">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{item.offerName}</h2>
            <p className="text-sm text-muted-foreground">{item.offerDescription}</p>
            <p className="text-sm text-muted-foreground">{item.barName}</p>
            {total > 1 && (
              <div className="flex justify-center gap-1">
                {item.qrCodes.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      idx === currentIndex ? "w-6 bg-purple-400/60" : "w-1.5 bg-purple-400/20",
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full max-w-[300px] aspect-square">
            {total > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -left-12 top-1/2 -translate-y-1/2 hover:bg-transparent"
                  onClick={prevParams}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="w-10 h-10" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-12 top-1/2 -translate-y-1/2 hover:bg-transparent"
                  onClick={nextParams}
                  disabled={currentIndex === total - 1}
                >
                  <ChevronRight className="w-10 h-10" />
                </Button>
              </>
            )}

            <div className="bg-white p-6 rounded-3xl shadow-2xl w-full h-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-purple-600/60" />

              <div style={{ height: "auto", margin: "0 auto", maxWidth: "100%", width: "100%" }}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={currentQR?.id ? `squir://redeem?qr=${currentQR.id}` : "error"}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-widest font-medium">
              Billet {currentIndex + 1} / {total}
            </p>

            <div className="mt-2 bg-purple-600/20 px-3 py-1 rounded-full">
              <span className="font-bold">{formatPrice(item.squirPrice)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
