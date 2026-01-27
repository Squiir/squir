import { useMyId } from "@/hooks/user/use-my-id";
import type { Message } from "@/types/messages";
import clsx from "clsx";

export function MessageBubble({ message, showRead }: { message: Message; showRead: boolean }) {
  const { data: me } = useMyId();
  const myId = me?.id;
  const isMine = message.senderId === myId;

  return (
    <div>
      <div
        className={clsx(
          "max-w-[85%] md:max-w-[70%] lg:max-w-[500px] px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap shadow-sm",
          isMine
            ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
            : "mr-auto bg-background border rounded-bl-none",
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
