import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { GroupMember } from "@/types/groups";

type GroupMemberProps = {
  members: GroupMember[];
};

export function AvatarStack({ members }: GroupMemberProps) {
  return (
    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
      {members.slice(0, 3).map((member) => (
        <Avatar key={member.id} className="w-6 h-6">
          <AvatarImage src={member.avatarUrl ?? undefined} alt={member.username} />
          <AvatarFallback>{member.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      {members.length > 3 && (
        <Avatar className="w-6 h-6">
          <AvatarFallback>+{members.length - 3}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
