import { FriendSearch } from "@/components/friends/FriendSearch";
import { FriendsList } from "@/components/friends/FriendsList";
import { CreateGroupDialog } from "@/components/groups/CreateGroupDialog";
import { GroupsList } from "@/components/groups/GroupList";

export function SocialPanel({
  selectedFriendId,
  onSelectFriend,
}: {
  selectedFriendId?: string;
  onSelectFriend: (id: string) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <FriendSearch />
      <CreateGroupDialog />
      <GroupsList />
      <FriendsList selectedFriendId={selectedFriendId} onSelectFriend={onSelectFriend} />
    </div>
  );
}
