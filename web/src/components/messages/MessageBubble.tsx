import { useAuthStore } from "@/store/auth.store";
import type { Message } from "@/types/messages";
import clsx from "clsx";

export function MessageBubble({ message, showRead }: { message: Message; showRead: boolean }) {
  const userId = useAuthStore.getState().userId;
  const isMine = message.senderId === userId;

  return (
    <div>
      <div
        className={clsx(
          "max-w-[70%] px-3 py-2 rounded-lg text-sm",
          isMine ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted",
        )}
      >
        {message.content}
      </div>
      {isMine && showRead && message.readAt && (
        <div className="mt-1 text-[10px] text-right opacity-70">Vu</div>
      )}
    </div>
  );
}
