export interface WalletQRCode {
  id: string;
  label?: string;
}

export interface WalletActiveItem {
  offerId: string;
  offerName: string;
  offerDescription?: string;
  offerImageUrl?: string;
  squirPrice: number;
  barName: string;
  barAddress?: string;
  quantity: number;
  qrCodes: WalletQRCode[];
}

export interface WalletHistoryItem {
  id: string;
  offerName: string;
  offerDescription?: string;
  offerImageUrl?: string;
  squirPrice: number;
  barName: string;
  barAddress?: string;
  usedAt: string;
  status: string;
}

export interface WalletResponse {
  active: WalletActiveItem[];
  history: WalletHistoryItem[];
}
