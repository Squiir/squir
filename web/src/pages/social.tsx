import { RequireAuth } from "@/components/auth/RequireAuth";
import { SocialPanel } from "@/components/layout/SocialPanel";
import { ConversationPanel } from "@/components/messages/ConversationPanel";
import { useMessageSocket } from "@/hooks/messages/use-message-socket";
import { useState } from "react";

export default function SocialPage() {
  const [selectedFriendId, setSelectedFriendId] = useState<string | undefined>();
  useMessageSocket();

  return (
    <RequireAuth>
      <div className="flex h-[calc(90vh)] w-full">
        <aside className="border-r grow-3 bg-background">
          <SocialPanel selectedFriendId={selectedFriendId} onSelectFriend={setSelectedFriendId} />
        </aside>

        <main className="grow-7">
          <ConversationPanel friendId={selectedFriendId} />
        </main>

        <aside className="hidden border-l grow-3 w-80 bg-background xl:block">
          <div className="p-4 text-muted-foreground">Détails de la conversation</div>
        </aside>
      </div>
    </RequireAuth>
  );
}
