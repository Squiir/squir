import { Venue, VenueType, UserState } from './types';

export const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'Le Perchoir',
    type: VenueType.ROOFTOP,
    coordinates: { lat: 48.8623, lng: 2.3831 }, // Menilmontant ish
    image: 'https://picsum.photos/400/300?random=1',
    logo: 'martini',
    description: 'Rooftop branché avec vue panoramique.',
    currentTraffic: 'High',
    activeOffers: [
      { id: 'o1', title: 'Shot Offert', cost: 5, description: 'Un shot gratuit pour toi.' },
      { id: 'o2', title: 'Coupe-file', cost: 20, description: 'Entrée prioritaire ce soir.' }
    ]
  },
  {
    id: '2',
    name: 'Rosa Bonheur',
    type: VenueType.BAR,
    coordinates: { lat: 48.8800, lng: 2.3833 }, // Buttes Chaumont
    image: 'https://picsum.photos/400/300?random=2',
    logo: 'beer',
    description: 'Guinguette festive au cœur du parc.',
    currentTraffic: 'Medium',
    activeOffers: [
      { id: 'o3', title: 'Pinte à 5€', cost: 8, description: 'Happy hour prolongé pour toi.' }
    ]
  },
  {
    id: '3',
    name: 'Silencio',
    type: VenueType.CLUB,
    coordinates: { lat: 48.8687, lng: 2.3437 }, // Montmartre
    image: 'https://picsum.photos/400/300?random=3',
    logo: 'music',
    description: 'Club select designé par David Lynch.',
    currentTraffic: 'High',
    activeOffers: [
      { id: 'o4', title: 'Accès Carré VIP', cost: 50, description: 'Accès zone membre pour la soirée.' }
    ]
  },
  {
    id: '4',
    name: 'Bambino',
    type: VenueType.RESTAURANT,
    coordinates: { lat: 48.8590, lng: 2.3780 }, // Near Voltaire
    image: 'https://picsum.photos/400/300?random=4',
    logo: 'disc',
    description: 'Bar à vin et musique live.',
    currentTraffic: 'Low',
    activeOffers: [
      { id: 'o5', title: 'Dessert Offert', cost: 12, description: 'Pour tout repas commandé.' }
    ]
  }
];

export const INITIAL_USER: UserState = {
  id: 'u1',
  name: 'Alex',
  points: {
    '1': 12, // Points at Perchoir
    '2': 4,  // Points at Rosa
    '3': 0,
    '4': 18
  },
  totalPoints: 34,
  friends: ['Sarah', 'Tom', 'Léa']
};