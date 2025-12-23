import { User } from "@app-types/user";

export interface QrCode {
  id: string;
  label: string;
  used: boolean;
  url: string;

  user: User;

  barId: string;
  productId: string;

  createdAt: string;
}
