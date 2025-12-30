import { FriendList } from "@/components/friends/FriendList";
import { FriendSearch } from "@/components/friends/FriendSearch";
import { CreateGroupDialog } from "@/components/groups/CreateGroupDialog";
import { GroupList } from "@/components/groups/GroupList";

export function SocialPanel({
  selectedFriendId,
  onSelectFriend,
}: {
  selectedFriendId?: string;
  onSelectFriend: (id: string) => void;
}) {
  return (
    <div className="flex flex-col w-full max-w-lg gap-4 p-4">
      <FriendSearch />
      <CreateGroupDialog />
      <GroupList />
      <FriendList selectedFriendId={selectedFriendId} onSelectFriend={onSelectFriend} />
    </div>
  );
}
