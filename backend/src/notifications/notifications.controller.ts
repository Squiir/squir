import { JwtAuthGuard } from "@auth/jwt-auth.guard";
import {
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getUserNotifications(@Request() req: any) {
    return this.notificationsService.getUserNotifications(req.user.id);
  }

  @Patch(":id/read")
  markAsRead(@Param("id") id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch("read-all")
  markAllAsRead(@Request() req: any) {
    return this.notificationsService.markAllAsRead(req.user.id);
  }
}
