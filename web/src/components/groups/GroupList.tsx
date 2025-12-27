import { useGroups } from "@/hooks/groups/use-group";
import { GroupItem } from "./GroupItem";

export function GroupsList() {
  const { data = [], isLoading } = useGroups();

  if (data.length === 0) {
    return <div className="px-2 text-sm text-muted-foreground">Aucun groupe</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Groupes</h3>
      {isLoading && <div className="text-sm">Chargement…</div>}

      <div className="space-y-1">
        {data.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
