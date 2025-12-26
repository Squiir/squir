import { ConversationItem } from "@/components/social/ConversationItem";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSkeleton } from "@/components/ui/skeletons/AppSkeleton";
import { useConversations } from "@/hooks/social/use-conversations";
import { useSocialStore } from "@/store/social.store";

export function ConversationList() {
  const { data, isLoading } = useConversations();
  const activeId = useSocialStore((s) => s.activeConversationId);

  if (isLoading) return <AppSkeleton />;

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <Input placeholder="Search" />
      </div>

      <ScrollArea className="h-full">
        <div className="p-2">
          <div className="space-y-1">
            {(data ?? []).map((c) => (
              <ConversationItem key={c.id} conversation={c} active={c.id === activeId} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
