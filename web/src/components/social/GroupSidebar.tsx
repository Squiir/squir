import { useSocialStore } from "@/store/social.store";
import { useQuery } from "@tanstack/react-query";
import { socialService } from "@/services/social.service";
import { SocialSkeleton } from "@/components/ui/skeletons/SocialSkeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ConversationDetails } from "@/types/social";
import { ScrollArea } from "@/components/ui/scroll-area";

export function GroupSidebar() {
  const conversationId = useSocialStore((s) => s.activeConversationId);

  const { data, isLoading } = useQuery<ConversationDetails>({
    queryKey: ["social", "conversationDetails", conversationId],
    queryFn: () => socialService.getConversationDetails(conversationId!),
    enabled: !!conversationId,
  });

  if (!conversationId) return <SocialSkeleton area="right" />;
  if (isLoading) return <SocialSkeleton area="right" />;
  if (!data) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="text-sm font-semibold">Chat Details</div>
        <div className="mt-1 text-lg font-bold">{data.name}</div>
      </div>

      <Separator />

      <ScrollArea className="h-full">
        <div className="p-4 space-y-5">
          <div>
            <div className="text-xs font-medium uppercase text-muted-foreground">
              Sortie
            </div>
            <div className="p-3 mt-2 text-sm border rounded-lg bg-muted/40">
              <div>Date : {data.nextEvent?.date ?? "—"}</div>
              <div>Lieu : {data.nextEvent?.place ?? "—"}</div>
              <div>Heure : {data.nextEvent?.time ?? "—"}</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-medium uppercase text-muted-foreground">
              Membres ({data.membersCount})
            </div>
            <div className="mt-2 space-y-2">
              {data.members.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={m.avatarUrl ?? undefined} />
                    <AvatarFallback>
                      {m.username.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{m.username}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
