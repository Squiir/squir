import { useGetCurrentUserId } from "@/hooks/auth/use-get-current-user-id";
import type { Message } from "@/types/messages";
import clsx from "clsx";

export function MessageBubble({ message, showRead }: { message: Message; showRead: boolean }) {
  const { data: me } = useGetCurrentUserId();
  const myId = me?.id;
  const isMine = message.senderId === myId;

  return (
    <div>
      <div
        className={clsx(
          "max-w-[50%] px-3 py-2 rounded-lg text-sm",
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
