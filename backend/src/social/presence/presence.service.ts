import { Injectable } from "@nestjs/common";

@Injectable()
export class PresenceService {
  private onlineUsers = new Set<string>();

  setOnline(userId: string) {
    this.onlineUsers.add(userId);
  }

  setOffline(userId: string) {
    this.onlineUsers.delete(userId);
  }

  isOnline(userId: string): boolean {
    return this.onlineUsers.has(userId);
  }

  getOnlineUsers(): string[] {
    return Array.from(this.onlineUsers);
  }
}
