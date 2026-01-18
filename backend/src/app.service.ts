import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  /**
   * Returns a health check message
   * @returns { message: "OK" }
   */
  getHealthCheck(): { message: string } {
    return { message: "OK" };
  }
}
