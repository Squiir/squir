export interface QrCode {
  id: string;
  label: string;
  used: boolean;
  userId: string;
  barId: string;
  offerId: string;
  consumedAt?: string;
  createdAt: string;
  updatedAt: string;
  url?: string;
  value?: string;
  offer?: {
    name: string;
    price: number;
  };
  bar?: {
    name: string;
  };
}
