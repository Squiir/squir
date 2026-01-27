import { ProfileWallet } from "@/components/profile/ProfileWallet";
import { ProfileTabs } from "@/components/profile/tabs/ProfileTabs";
import type { Bar } from "@/types/bar";
import type { Offer } from "@/types/offer";
import type { User } from "@/types/user";

interface Props {
  user?: User;
  favoriteVenues: Pick<Bar, "id" | "name" | "address" | "arrondissement">[];
  savedOffers: (Pick<
    Offer,
    | "id"
    | "name"
    | "squirPrice"
    | "validUntil"
    | "imageUrl"
    | "barId"
    | "originalPrice"
    | "description"
  > & {
    venueName: string;
    venueAddress: string;
    venueArrondissement: number;
  })[];
}

export function ProfileDashboard({ user, favoriteVenues, savedOffers }: Props) {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 delay-100">
      <ProfileWallet user={user} />
      <ProfileTabs favoriteVenues={favoriteVenues} savedOffers={savedOffers} />
    </div>
  );
}
