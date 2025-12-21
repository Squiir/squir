import { User } from "@prisma/client";

export interface LoginDto extends Request {
  user: Pick<User, "id">;
}
