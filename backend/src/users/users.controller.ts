import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  getMe() {
    console.log("GET /users/me called");
    return this.usersService.findOne();
  }
}
