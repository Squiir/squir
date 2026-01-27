import { Injectable } from "@nestjs/common";
import { NotificationsGateway } from "@notifications/notifications.gateway";
import { NotificationType } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    description: string,
    data?: Record<string, any>,
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        description,
        data: data || {},
      },
    });

    this.notificationsGateway.sendNotificationToUser(userId, notification);

    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }
}
