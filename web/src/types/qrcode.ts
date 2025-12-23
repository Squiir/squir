import type { User } from "@/types/user";

export interface QRcode {
  id: string;
  label: string;
  used: boolean;
  url: string;

  user: User;

  barId: string;
  productId: string;

  createdAt: string;
}
