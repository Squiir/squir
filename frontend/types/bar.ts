export interface Offer {
    id: string;
    name: string;
    price: number;
}

export interface Bar {
    id: string;
    name: string;
    arrondissement: number;
    latitude: number;
    longitude: number;
    color: string;
    offers: Offer[];
    createdAt: string;
    updatedAt: string;
}
