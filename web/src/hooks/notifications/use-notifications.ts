import { notificationsService } from "@/services/notifications.service";
import { useAuthStore } from "@/store/auth.store";
import type { Notification } from "@/types/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useNotifications() {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore.getState().accessToken;
  const socketRef = useRef<Socket | null>(null);

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationsService.getAll,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (!accessToken) return;

    const socketUrl = `${import.meta.env.VITE_API_URL}/notifications`;

    socketRef.current = io(socketUrl, {
      auth: { accessToken },
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to notifications socket");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("notification", (newNotification: Notification) => {
      console.log("New notification:", newNotification);
      queryClient.setQueryData(["notifications"], (old: Notification[] = []) => {
        const updatedList = [newNotification, ...old];
        return updatedList;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken, queryClient]);

  const markAsReadMutation = useMutation({
    mutationFn: notificationsService.markAsRead,
    onSuccess: (updatedNotification: Notification) => {
      queryClient.setQueryData(["notifications"], (old: Notification[] = []) => {
        return old.map((n) => (n.id === updatedNotification.id ? updatedNotification : n));
      });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsService.markAllAsRead,
    onSuccess: () => {
      queryClient.setQueryData(["notifications"], (old: Notification[] = []) => {
        return old.map((n) => ({ ...n, read: true }));
      });
    },
  });

  return {
    notifications,
    isLoading,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAsRead: (id: string) => markAsReadMutation.mutate(id),
    markAllAsRead: () => markAllAsReadMutation.mutate(),
  };
}
