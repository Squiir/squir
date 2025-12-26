import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { SocialLayout } from "@/components/social/SocialLayout";
import { ConversationList } from "@/components/social/ConversationList";
import { ChatWindow } from "@/components/social/ChatWindow";
import { GroupSidebar } from "@/components/social/GroupSidebar";
import { useSocialStore } from "@/store/social.store";

export default function SocialConversationPage() {
  const { conversationId } = useParams();
  const setActive = useSocialStore((s) => s.setActiveConversationId);

  useEffect(() => {
    setActive(conversationId ?? null);
  }, [conversationId, setActive]);

  return (
    <RequireAuth>
      <SocialLayout
        left={<ConversationList />}
        center={<ChatWindow />}
        right={<GroupSidebar />}
      />
    </RequireAuth>
  );
}
