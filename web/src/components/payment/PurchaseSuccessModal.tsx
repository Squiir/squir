import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PurchaseSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function PurchaseSuccessModal({ open, onClose }: PurchaseSuccessModalProps) {
  const navigate = useNavigate();

  const handleGoToWallet = () => {
    navigate("/wallet");
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader className="flex flex-col items-center space-y-4 pt-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="w-12 h-12 text-green-600 animate-in zoom-in duration-300" />
          </div>
          <div className="text-center space-y-2">
            <DialogTitle className="text-2xl font-bold text-center">Achat réussi !</DialogTitle>
            <p className="text-muted-foreground">Votre QR code est prêt</p>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-6 space-y-6">
          <div className="relative flex items-center justify-center w-48 h-48 bg-white border-2 border-dashed rounded-xl border-muted-foreground/20">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/30">
              <QrCode className="w-24 h-24 opacity-60" />
            </div>
          </div>

          <div className="flex flex-col w-full gap-3 pt-4">
            <Button
              onClick={handleGoToWallet}
              className="w-full text-lg h-12 font-semibold shadow-lg shadow-primary/10"
            >
              Voir mon Wallet
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full text-lg">
              Continuer à explorer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
