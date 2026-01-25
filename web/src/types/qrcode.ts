export interface QrCode {
  id: string;
  label: string;
  used: boolean;
  userId: string;
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
    id: string;
  };
}

export interface ScannedQrCode {
  id: string;
  consumedAt: string;
  offer: {
    name: string;
    imageUrl: string | null;
    squirPrice: number;
    originalPrice: number;
  };
  user: {
    username: string;
    avatarUrl: string | null;
  };
}
