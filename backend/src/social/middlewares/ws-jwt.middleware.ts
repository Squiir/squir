import type { JwtPayload } from "@auth/jwt-payload";
import { JwtService } from "@nestjs/jwt";
import type { Socket } from "socket.io";

export const createWsJwtMiddleware =
  (jwtService: JwtService) =>
  async (socket: Socket, next: (err?: Error) => void) => {
    try {
      const auth = socket.handshake.auth as { token?: string };
      const token = auth?.token;

      if (!token || typeof token !== "string") {
        return next(new Error("Missing auth token"));
      }

      const payload = await jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.ACCESS_TOKEN_SECRET!,
      });

      socket.data.userId = payload.sub;

      return next();
    } catch {
      return next(new Error("Invalid or expired token"));
    }
  };
