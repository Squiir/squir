export const NotificationType = {
  NEW_GROUP: "NEW_GROUP",
  NEW_MESSAGE: "NEW_MESSAGE",
  BUY_QR_CODE: "BUY_QR_CODE",
  QR_CODE_SCANNED: "QR_CODE_SCANNED",
} as const;

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  data?: {
    groupId?: string;
    userId?: string;
    offerId?: string;
    qrCodeId?: string;
    avatarUrl?: string;
  };
}
