import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFriends } from "@/hooks/friends/use-friends";
import { useCreateGroup } from "@/hooks/groups/use-create-group";
import { useState } from "react";

export function CreateGroupDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const { data: friends = [] } = useFriends();
  const { mutate: createGroup, isPending } = useCreateGroup();

  function toggle(userId: string) {
    setSelected((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    );
  }

  function resetForm() {
    setName("");
    setSelected([]);
  }

  function submit() {
    createGroup(
      { name, memberIds: selected },
      {
        onSuccess: () => {
          resetForm();
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Créer un groupe</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau groupe</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nom du groupe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="space-y-2">
            {friends.map((friend) => (
              <label key={friend.id} className="flex items-center gap-2">
                <Checkbox
                  checked={selected.includes(friend.id)}
                  onCheckedChange={() => toggle(friend.id)}
                />
                <span>{friend.username}</span>
              </label>
            ))}
          </div>

          <Button onClick={submit} disabled={!name || selected.length < 2 || isPending}>
            {isPending ? "Création…" : "Créer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
