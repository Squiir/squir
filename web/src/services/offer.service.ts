import type { CreateOfferInput, Offer, UpdateOfferInput } from "@/types/offer";
import { api } from "./api.service";

export const offerService = {
  async getAllOffers() {
    const { data } = await api.get<Offer[]>("/offers");
    return data;
  },

  async getOffer(id: string) {
    const { data } = await api.get<Offer>(`/offers/${id}`);
    return data;
  },

  async getBarOffers(barId: string) {
    const { data } = await api.get<Offer[]>(`/offers/bar/${barId}`);
    return data;
  },

  async createOffer(input: CreateOfferInput) {
    const { data } = await api.post<Offer>("/offers", input);
    return data;
  },

  async updateOffer(id: string, input: UpdateOfferInput) {
    const { data } = await api.patch<Offer>(`/offers/${id}`, input);
    return data;
  },

  async deleteOffer(id: string) {
    await api.delete(`/offers/${id}`);
  },

  async uploadOfferImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<{ imageUrl: string }>("/offers/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.imageUrl;
  },

  getBestSelling: async () => {
    const { data } = await api.get<Offer[]>("/offers/best-selling");
    return data;
  },

  getNearby: async (lat: number, lng: number) => {
    const { data } = await api.get<Offer[]>(`/offers/nearby?latitude=${lat}&longitude=${lng}`);
    return data;
  },

  getRecommendations: async () => {
    const { data } = await api.get<Offer[]>("/offers/recommendations");
    return data;
  },

  search: async (query: string) => {
    const { data } = await api.get<Offer[]>(`/offers/search?q=${encodeURIComponent(query)}`);
    return data;
  },
};
