export enum VenueType {
  BAR = 'BAR',
  CLUB = 'CLUB',
  RESTAURANT = 'RESTAURANT',
  ROOFTOP = 'ROOFTOP'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Offer {
  id: string;
  title: string;
  cost: number; // Points required
  description: string;
}

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  coordinates: Coordinates;
  image: string;
  logo: string; // Emoji or Icon name for POC
  description: string;
  currentTraffic: 'Low' | 'Medium' | 'High';
  activeOffers: Offer[];
}

export interface UserState {
  id: string;
  name: string;
  points: Record<string, number>; // VenueID -> Points
  totalPoints: number; // Global score for "Club" wars
  friends: string[];
}

export type ViewMode = 'MAP' | 'LOYALTY' | 'SOCIAL' | 'PROFILE';