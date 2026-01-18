import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateStatus } from "@/hooks/user/use-update-status";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus?: string;
}

export function StatusEditDialog({ isOpen, onOpenChange, currentStatus }: Props) {
  const [status, setStatus] = useState("");
  const { mutate: updateStatus, isPending } = useUpdateStatus();

  useEffect(() => {
    if (isOpen) {
      setStatus(currentStatus || "");
    }
  }, [isOpen, currentStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatus(status, {
      onSuccess: () => {
        toast.success("Statut mis à jour");
        onOpenChange(false);
      },
      onError: () => toast.error("Erreur lors de la mise à jour du statut"),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le statut</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Votre statut..."
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            maxLength={50}
          />
          <p className="text-xs text-muted-foreground text-right">{status.length}/50</p>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
