import { useSocialStore } from "@/store/social.store";
import { MessageList } from "@/components/social/MessageList";
import { MessageComposer } from "@/components/social/MessageComposer";
import { Separator } from "@/components/ui/separator";
import { SocialSkeleton } from "@/components/ui/skeletons/SocialSkeleton";

export function ChatWindow() {
  const conversationId = useSocialStore((s) => s.activeConversationId);

  if (!conversationId) return <SocialSkeleton area="center" />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="font-semibold">Chat</div>
      </div>
      <Separator />
      <MessageList />
      <Separator />
      <MessageComposer />
    </div>
  );
}
