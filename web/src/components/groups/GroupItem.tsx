import { ActionMenu } from "@/components/layout/ActionMenu";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { useLeaveGroup } from "@/hooks/groups/use-leave-group";
import type { Group } from "@/types/groups";
import { AddGroupMemberDialog } from "./AddGroupMemberDialog";
import { RenameGroupDialog } from "./RenameGroupDialog";

export function GroupItem({ group }: { group: Group }) {
  const leaveGroup = useLeaveGroup();

  return (
    <div className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-muted">
      <div>
        <div className="text-sm font-medium">{group.name}</div>
        <AvatarStack members={group.members} />
      </div>

      <ActionMenu
        actions={[
          {
            render: (
              <RenameGroupDialog groupId={group.id} initialName={group.name}>
                <button className="w-full px-2 py-1 text-left">Renommer</button>
              </RenameGroupDialog>
            ),
          },
          {
            render: (
              <AddGroupMemberDialog
                groupId={group.id}
                existingMemberIds={group.members.map((m) => m.id)}
              >
                <button className="w-full px-2 py-1 text-left">Ajouter un membre</button>
              </AddGroupMemberDialog>
            ),
          },
          {
            label: "Quitter le groupe",
            destructive: true,
            onClick: () => leaveGroup.mutate(group.id),
          },
        ]}
      />
    </div>
  );
}
