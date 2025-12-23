import { User } from "@prisma/client";

export interface AuthDto extends Request {
  user: Pick<User, "id">;
}
