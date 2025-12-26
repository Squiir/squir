import { useSocialStore } from "@/store/social.store";
import { useMessages } from "@/hooks/social/use-messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/social/MessageBubble";
import { SocialSkeleton } from "@/components/ui/skeletons/SocialSkeleton";
import { useEffect, useRef } from "react";

export function MessageList() {
  const conversationId = useSocialStore((s) => s.activeConversationId);
  const { data, isLoading } = useMessages(conversationId);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.length]);

  if (!conversationId) return null;
  if (isLoading) return <SocialSkeleton area="center" />;

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-3">
        {(data ?? []).map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={endRef} />
      </div>
    </ScrollArea>
  );
}
