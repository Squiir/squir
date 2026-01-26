import { api } from "@/services/api.service";
import type { Bar } from "@/types/bar";
import type { Offer } from "@/types/offer";
import type { User } from "@/types/user";

export const userService = {
  async getCurrentUser() {
    const { data } = await api.get<User>("/users/me");
    return data;
  },

  async getCurrentUserId() {
    const { data } = await api.get<{ id: string }>("/users/id");
    return data;
  },

  async updateAvatar(avatarUrl: string) {
    const { data } = await api.patch<User>("/users/me/avatar", { avatarUrl });
    return data;
  },

  async updateStatus(status: string) {
    const { data } = await api.patch<User>("/users/me/status", { status });
    return data;
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<User>("/users/me/avatar/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  async toggleFavoriteVenue(barId: string) {
    const { data } = await api.post<{ isFavorite: boolean }>(`/users/favorites/venues/${barId}`);
    return data;
  },

  async toggleSavedOffer(offerId: string) {
    const { data } = await api.post<{ isSaved: boolean }>(`/users/favorites/offers/${offerId}`);
    return data;
  },

  async getFavorites() {
    const { data } = await api.get<{
      favoriteVenues: Pick<Bar, "id" | "name" | "address" | "arrondissement">[];
      savedOffers: (Pick<Offer, "id" | "name" | "squirPrice" | "validUntil" | "imageUrl"> & {
        venueName: string;
      })[];
    }>("/users/profile/favorites");
    return data;
  },
};
