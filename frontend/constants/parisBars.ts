export type ParisBar = {
  id: string;
  name: string;
  arrondissement: number; // 1..20
  latitude: number;
  longitude: number;
  description: string;
  imageUrl: string; // pour <Image source={{ uri: bar.imageUrl }} />
};

export const PARIS_BARS: ParisBar[] = [
  // 1er
  {
    id: "paris-01-01",
    name: "Le Zinc du Louvre",
    arrondissement: 1,
    latitude: 48.8636,
    longitude: 2.3366,
    description: "Bar cosy à deux pas du Louvre, parfait pour un verre après une balade.",
    imageUrl: "https://picsum.photos/seed/paris-01-01/800/500",
  },
  {
    id: "paris-01-02",
    name: "La Verrière des Halles",
    arrondissement: 1,
    latitude: 48.8623,
    longitude: 2.3458,
    description: "Ambiance animée en soirée, cocktails simples et efficaces.",
    imageUrl: "https://picsum.photos/seed/paris-01-02/800/500",
  },

  // 2e
  {
    id: "paris-02-01",
    name: "Le Comptoir Montorgueil",
    arrondissement: 2,
    latitude: 48.8664,
    longitude: 2.3476,
    description: "Bar vivant, idéal pour commencer la soirée dans le quartier Montorgueil.",
    imageUrl: "https://picsum.photos/seed/paris-02-01/800/500",
  },
  {
    id: "paris-02-02",
    name: "Le Passage des Pintxos",
    arrondissement: 2,
    latitude: 48.8692,
    longitude: 2.3409,
    description: "Petite adresse type tapas, bon spot entre potes.",
    imageUrl: "https://picsum.photos/seed/paris-02-02/800/500",
  },

  // 3e
  {
    id: "paris-03-01",
    name: "Le Marais Brassé",
    arrondissement: 3,
    latitude: 48.8629,
    longitude: 2.3612,
    description: "Bières craft et ambiance Marais, plutôt chill en semaine.",
    imageUrl: "https://picsum.photos/seed/paris-03-01/800/500",
  },
  {
    id: "paris-03-02",
    name: "La Cave des Archives",
    arrondissement: 3,
    latitude: 48.8609,
    longitude: 2.3594,
    description: "Vin au verre et petites planches, parfait en fin d’aprem.",
    imageUrl: "https://picsum.photos/seed/paris-03-02/800/500",
  },

  // 4e
  {
    id: "paris-04-01",
    name: "L’Île Mojito",
    arrondissement: 4,
    latitude: 48.8543,
    longitude: 2.3564,
    description: "Spot détendu proche de l’Île de la Cité, cocktails fruités.",
    imageUrl: "https://picsum.photos/seed/paris-04-01/800/500",
  },
  {
    id: "paris-04-02",
    name: "Le Quai des Verres",
    arrondissement: 4,
    latitude: 48.8515,
    longitude: 2.3579,
    description: "Ambiance bord de Seine, bon pour un verre en fin de journée.",
    imageUrl: "https://picsum.photos/seed/paris-04-02/800/500",
  },

  // 5e
  {
    id: "paris-05-01",
    name: "Le Latin Spritz",
    arrondissement: 5,
    latitude: 48.8501,
    longitude: 2.3470,
    description: "Ambiance étudiante, prix corrects, bon pour les apéros rapides.",
    imageUrl: "https://picsum.photos/seed/paris-05-01/800/500",
  },
  {
    id: "paris-05-02",
    name: "La Pinte du Panthéon",
    arrondissement: 5,
    latitude: 48.8469,
    longitude: 2.3460,
    description: "Bières pression et terrasse quand il fait beau, quartier Panthéon.",
    imageUrl: "https://picsum.photos/seed/paris-05-02/800/500",
  },

  // 6e
  {
    id: "paris-06-01",
    name: "Saint-Germain Tonic",
    arrondissement: 6,
    latitude: 48.8533,
    longitude: 2.3337,
    description: "Cadre chic-décontracté, bon pour un date ou un afterwork.",
    imageUrl: "https://picsum.photos/seed/paris-06-01/800/500",
  },
  {
    id: "paris-06-02",
    name: "Le Tabouret de l’Odéon",
    arrondissement: 6,
    latitude: 48.8508,
    longitude: 2.3381,
    description: "Petit bar à l’ancienne, vin/bière, ambiance calme.",
    imageUrl: "https://picsum.photos/seed/paris-06-02/800/500",
  },

  // 7e
  {
    id: "paris-07-01",
    name: "La Terrasse des Invalides",
    arrondissement: 7,
    latitude: 48.8566,
    longitude: 2.3130,
    description: "Afterwork tranquille dans un coin élégant, bon choix de vins.",
    imageUrl: "https://picsum.photos/seed/paris-07-01/800/500",
  },
  {
    id: "paris-07-02",
    name: "Le Verre de la Tour",
    arrondissement: 7,
    latitude: 48.8584,
    longitude: 2.2945,
    description: "Spot touristique mais sympa, parfait pour une pause en journée.",
    imageUrl: "https://picsum.photos/seed/paris-07-02/800/500",
  },

  // 8e
  {
    id: "paris-08-01",
    name: "Champs Cocktail Club",
    arrondissement: 8,
    latitude: 48.8698,
    longitude: 2.3074,
    description: "Cocktails soignés, ambiance lounge, bon pour un afterwork.",
    imageUrl: "https://picsum.photos/seed/paris-08-01/800/500",
  },
  {
    id: "paris-08-02",
    name: "Le Zinc Haussmann",
    arrondissement: 8,
    latitude: 48.8732,
    longitude: 2.3204,
    description: "Brasserie-bar, pratique pour se poser après les boutiques.",
    imageUrl: "https://picsum.photos/seed/paris-08-02/800/500",
  },

  // 9e
  {
    id: "paris-09-01",
    name: "Pigalle Taproom",
    arrondissement: 9,
    latitude: 48.8827,
    longitude: 2.3370,
    description: "Bières craft, musique, bonne vibe le week-end.",
    imageUrl: "https://picsum.photos/seed/paris-09-01/800/500",
  },
  {
    id: "paris-09-02",
    name: "Le Verre des Martyrs",
    arrondissement: 9,
    latitude: 48.8802,
    longitude: 2.3416,
    description: "Petit bar de quartier, simple et efficace.",
    imageUrl: "https://picsum.photos/seed/paris-09-02/800/500",
  },

  // 10e
  {
    id: "paris-10-01",
    name: "Canal Aperitivo",
    arrondissement: 10,
    latitude: 48.8758,
    longitude: 2.3632,
    description: "Ambiance canal, parfait pour apéro au coucher du soleil.",
    imageUrl: "https://picsum.photos/seed/paris-10-01/800/500",
  },
  {
    id: "paris-10-02",
    name: "Gare du Nord Bar",
    arrondissement: 10,
    latitude: 48.8791,
    longitude: 2.3553,
    description: "Pratique avant/après train, ambiance animée.",
    imageUrl: "https://picsum.photos/seed/paris-10-02/800/500",
  },

  // 11e
  {
    id: "paris-11-01",
    name: "Bastille Beer Corner",
    arrondissement: 11,
    latitude: 48.8530,
    longitude: 2.3691,
    description: "Bières et planches, parfait pour les grandes tables.",
    imageUrl: "https://picsum.photos/seed/paris-11-01/800/500",
  },
  {
    id: "paris-11-02",
    name: "Rue Oberkampf Social",
    arrondissement: 11,
    latitude: 48.8649,
    longitude: 2.3771,
    description: "Quartier festif, bar simple et efficace pour sortir.",
    imageUrl: "https://picsum.photos/seed/paris-11-02/800/500",
  },

  // 12e
  {
    id: "paris-12-01",
    name: "Nation Negroni",
    arrondissement: 12,
    latitude: 48.8486,
    longitude: 2.3957,
    description: "Cocktails classiques, ambiance posée, bon afterwork.",
    imageUrl: "https://picsum.photos/seed/paris-12-01/800/500",
  },
  {
    id: "paris-12-02",
    name: "Bercy Wine Spot",
    arrondissement: 12,
    latitude: 48.8352,
    longitude: 2.3819,
    description: "Vin au verre et petites assiettes, quartier Bercy.",
    imageUrl: "https://picsum.photos/seed/paris-12-02/800/500",
  },

  // 13e
  {
    id: "paris-13-01",
    name: "Tolbiac Pub",
    arrondissement: 13,
    latitude: 48.8275,
    longitude: 2.3572,
    description: "Ambiance étudiante, bon pour matchs et soirées entre amis.",
    imageUrl: "https://picsum.photos/seed/paris-13-01/800/500",
  },
  {
    id: "paris-13-02",
    name: "La Pinte d’Italie",
    arrondissement: 13,
    latitude: 48.8199,
    longitude: 2.3658,
    description: "Bar de quartier, prix cool, très vivant le week-end.",
    imageUrl: "https://picsum.photos/seed/paris-13-02/800/500",
  },

  // 14e
  {
    id: "paris-14-01",
    name: "Montparnasse Afterwork",
    arrondissement: 14,
    latitude: 48.8422,
    longitude: 2.3210,
    description: "Afterwork facile, grande terrasse quand il fait beau.",
    imageUrl: "https://picsum.photos/seed/paris-14-01/800/500",
  },
  {
    id: "paris-14-02",
    name: "Le Verre d’Alésia",
    arrondissement: 14,
    latitude: 48.8289,
    longitude: 2.3266,
    description: "Bar simple, ambiance locale, parfait pour l’apéro.",
    imageUrl: "https://picsum.photos/seed/paris-14-02/800/500",
  },

  // 15e
  {
    id: "paris-15-01",
    name: "Convention Tapas Bar",
    arrondissement: 15,
    latitude: 48.8428,
    longitude: 2.2996,
    description: "Tapas + cocktails, ambiance conviviale en soirée.",
    imageUrl: "https://picsum.photos/seed/paris-15-01/800/500",
  },
  {
    id: "paris-15-02",
    name: "Javel Riverside",
    arrondissement: 15,
    latitude: 48.8461,
    longitude: 2.2758,
    description: "Spot près de la Seine, cool pour décompresser.",
    imageUrl: "https://picsum.photos/seed/paris-15-02/800/500",
  },

  // 16e
  {
    id: "paris-16-01",
    name: "Passy Lounge",
    arrondissement: 16,
    latitude: 48.8582,
    longitude: 2.2769,
    description: "Cadre calme, plutôt chic, parfait pour un verre tranquille.",
    imageUrl: "https://picsum.photos/seed/paris-16-01/800/500",
  },
  {
    id: "paris-16-02",
    name: "Trocadéro Rooftop Bar",
    arrondissement: 16,
    latitude: 48.8616,
    longitude: 2.2880,
    description: "Ambiance lounge, idéal pour une sortie 'vue sur Paris'.",
    imageUrl: "https://picsum.photos/seed/paris-16-02/800/500",
  },

  // 17e
  {
    id: "paris-17-01",
    name: "Batignolles Bar à Bières",
    arrondissement: 17,
    latitude: 48.8841,
    longitude: 2.3224,
    description: "Quartier Batignolles, bonnes pressions, vibe détendue.",
    imageUrl: "https://picsum.photos/seed/paris-17-01/800/500",
  },
  {
    id: "paris-17-02",
    name: "Wagram Social Club",
    arrondissement: 17,
    latitude: 48.8830,
    longitude: 2.3005,
    description: "Bar convivial, idéal pour afterwork entre collègues.",
    imageUrl: "https://picsum.photos/seed/paris-17-02/800/500",
  },

  // 18e
  {
    id: "paris-18-01",
    name: "Montmartre Gin Bar",
    arrondissement: 18,
    latitude: 48.8867,
    longitude: 2.3431,
    description: "Gins & tonic, ambiance Montmartre, parfait pour un date.",
    imageUrl: "https://picsum.photos/seed/paris-18-01/800/500",
  },
  {
    id: "paris-18-02",
    name: "La Pinte de Barbès",
    arrondissement: 18,
    latitude: 48.8835,
    longitude: 2.3499,
    description: "Ambiance vivante, musique, bar populaire.",
    imageUrl: "https://picsum.photos/seed/paris-18-02/800/500",
  },

  // 19e
  {
    id: "paris-19-01",
    name: "La Villette Aperobar",
    arrondissement: 19,
    latitude: 48.8898,
    longitude: 2.3939,
    description: "Proche parc, super pour apéro avant un concert/ciné.",
    imageUrl: "https://picsum.photos/seed/paris-19-01/800/500",
  },
  {
    id: "paris-19-02",
    name: "Buttes-Chaumont Bar",
    arrondissement: 19,
    latitude: 48.8758,
    longitude: 2.3818,
    description: "Bar de quartier près des Buttes, chill et sympa.",
    imageUrl: "https://picsum.photos/seed/paris-19-02/800/500",
  },

  // 20e
  {
    id: "paris-20-01",
    name: "Ménilmontant Night Bar",
    arrondissement: 20,
    latitude: 48.8675,
    longitude: 2.3837,
    description: "Quartier festif, bon spot le soir avec de la musique.",
    imageUrl: "https://picsum.photos/seed/paris-20-01/800/500",
  },
  {
    id: "paris-20-02",
    name: "Le Verre de Père-Lachaise",
    arrondissement: 20,
    latitude: 48.8611,
    longitude: 2.3932,
    description: "Ambiance posée, parfait pour un verre avant/après balade.",
    imageUrl: "https://picsum.photos/seed/paris-20-02/800/500",
  },
];
