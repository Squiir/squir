import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetFriends } from "@/hooks/friends/use-friends";
import { useAddGroupMembers } from "@/hooks/groups/use-add-group-members";
import { useState } from "react";

export function AddGroupMemberDialog({
  groupId,
  existingMemberIds,
  children,
}: {
  groupId: string;
  existingMemberIds: string[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { data: friends = [] } = useGetFriends();
  const addMembers = useAddGroupMembers();

  const availableFriends = friends.filter((f) => !existingMemberIds.includes(f.id));

  function toggle(userId: string) {
    setSelected((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    );
  }

  function submit() {
    addMembers.mutate(
      { groupId, memberIds: selected },
      {
        onSuccess: () => {
          setSelected([]);
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
          <DialogTitle>Ajouter des membres</DialogTitle>
          <DialogDescription>Sélectionnez les amis à ajouter au groupe.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 overflow-auto max-h-64">
          {availableFriends.length === 0 ? (
            <div className="py-6 text-sm text-center text-muted-foreground">
              Tous vos amis sont déjà dans ce groupe
            </div>
          ) : (
            availableFriends.map((friend) => (
              <label key={friend.id} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selected.includes(friend.id)}
                  onCheckedChange={() => toggle(friend.id)}
                />
                <span>{friend.username}</span>
              </label>
            ))
          )}
        </div>

        <Button disabled={selected.length === 0 || availableFriends.length === 0} onClick={submit}>
          Ajouter
        </Button>
      </DialogContent>
    </Dialog>
  );
}
