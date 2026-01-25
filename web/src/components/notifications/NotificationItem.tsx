import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { type Notification, NotificationType } from "@/types/notification";
import { MessageCircle, QrCode, Users, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case NotificationType.NEW_GROUP:
        return <Users className="h-4 w-4 text-purple-500" />;
      case NotificationType.NEW_MESSAGE:
        return <MessageCircle className="h-4 w-4 text-purple-500" />;
      case NotificationType.BUY_QR_CODE:
        return <Wallet className="h-4 w-4 text-purple-500" />;
      case NotificationType.QR_CODE_SCANNED:
        return <QrCode className="h-4 w-4 text-purple-500" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getLink = () => {
    switch (notification.type) {
      case NotificationType.NEW_GROUP:
        return "/social";
      case NotificationType.NEW_MESSAGE:
        return "/social";
      case NotificationType.BUY_QR_CODE:
        return "/wallet";
      case NotificationType.QR_CODE_SCANNED:
      default:
        return "#";
    }
  };

  return (
    <Link
      to={getLink()}
      className={cn(
        "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors",
        !notification.read && "bg-muted/20",
      )}
      onClick={onClick}
    >
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background border shadow-sm">
        {notification.data?.avatarUrl ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={notification.data.avatarUrl} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ) : (
          getIcon()
        )}
      </div>
      <div className="flex-1 space-y-1">
        <p
          className={cn("text-sm font-medium leading-none", !notification.read && "font-semibold")}
        >
          {notification.title}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
        <p className="text-xs text-muted-foreground/60">
          {new Date(notification.createdAt).toLocaleDateString()}
        </p>
      </div>
      {!notification.read && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500 ring-2 ring-background" />
      )}
    </Link>
  );
}
