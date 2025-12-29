import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateGroup } from "@/hooks/groups/use-update-group";
import { useState } from "react";

export function RenameGroupDialog({
  groupId,
  initialName,
  children,
}: {
  groupId: string;
  initialName: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);

  const updateGroup = useUpdateGroup();

  function submit() {
    updateGroup.mutate(
      { id: groupId, name },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renommer le groupe</DialogTitle>
          <DialogDescription>Choisissez un nouveau nom pour le groupe.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Button
            onClick={submit}
            disabled={!name || name === initialName || updateGroup.isPending}
          >
            Renommer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
