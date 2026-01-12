import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { QrCode } from "@/types/qrcode";
import { Check } from "lucide-react";

type ModalQrPreviewProps = {
  visible: boolean;
  onClose: () => void;
  qrcode?: QrCode;
};

export function ModalQrPreview({ visible, onClose, qrcode }: ModalQrPreviewProps) {
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-500 rounded-full">
            <Check className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold">QR Code généré !</DialogTitle>
          <DialogDescription className="text-center">
            {qrcode?.label ?? "Sans label"}
            <br />
            Retrouvez-le dans votre profil
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="w-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
