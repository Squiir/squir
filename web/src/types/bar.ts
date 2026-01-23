import type { Offer } from "./offer";

export interface Bar {
  id: string;
  name: string;
  address: string;
  arrondissement: number;
  latitude: number;
  longitude: number;
  color: string;
  offers: Offer[];
  createdAt: string;
  updatedAt: string;
}
