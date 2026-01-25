import { PrismaClient, User } from "@prisma/client";

const PARIS_BARS = [
  {
    name: "Bar 1er",
    address: "1er Arrondissement, Paris",
    arrondissement: 1,
    latitude: 48.8626,
    longitude: 2.336,
    color: "#FF4D6D",
    ownerUsername: "bar1er", // Owner is the PROFESSIONAL user "bar1er"
    offers: [
      {
        name: "Bière pression 25cl",
        originalPrice: 6.0,
        squirPrice: 6.0,
        stock: 100,
        description: "Une bière pression 25cl",
        imageUrl: null,
        validUntil: null,
      },
      {
        name: "Mojito",
        originalPrice: 11.0,
        squirPrice: 11.0,
        stock: 50,
        description: "Une mojito",
        imageUrl: null,
        validUntil: null,
      },
    ],
  },
  {
    name: "Bar 2e",
    address: "2e Arrondissement, Paris",
    arrondissement: 2,
    latitude: 48.8686,
    longitude: 2.342,
    color: "#FF8FAB",
    ownerUsername: "bar2em", // Owner is the PROFESSIONAL user "bar2em"
    offers: [
      {
        name: "Verre de vin",
        originalPrice: 8.0,
        squirPrice: 8.0,
        stock: 75,
        description: "Un verre de vin",
        imageUrl: null,
        validUntil: null,
      },
      {
        name: "Spritz",
        originalPrice: 10.0,
        squirPrice: 10.0,
        stock: 60,
        description: "Un spritz",
        imageUrl: null,
        validUntil: null,
      },
    ],
  },
  {
    name: "Bar 3e",
    address: "3e Arrondissement, Paris",
    arrondissement: 3,
    latitude: 48.8635,
    longitude: 2.3615,
    color: "#FFD6A5",
    offers: [
      {
        name: "Cocktail classique",
        originalPrice: 12.0,
        squirPrice: 12.0,
        stock: 40,
        description: "Un cocktail classique",
        imageUrl: null,
        validUntil: null,
      },
      {
        name: "Cocktail spécial",
        originalPrice: 15.0,
        squirPrice: 15.0,
        stock: 30,
        description: "Un cocktail spécial",
        imageUrl: null,
        validUntil: null,
      },
    ],
  },
  {
    name: "Bar 4e",
    address: "4e Arrondissement, Paris",
    arrondissement: 4,
    latitude: 48.8557,
    longitude: 2.3622,
    color: "#FDFFB6",
    offers: [
      {
        name: "Ptite Garbiche",
        originalPrice: 6.5,
        squirPrice: 6.5,
        stock: 80,
        description: "Une ptite garbiche",
        imageUrl: null,
        validUntil: null,
      },
      {
        name: "Whisky",
        originalPrice: 13.0,
        squirPrice: 13.0,
        stock: 45,
        description: "Un whisky",
        imageUrl: null,
        validUntil: null,
      },
    ],
  },
  {
    name: "Bar 5e",
    address: "5e Arrondissement, Paris",
    arrondissement: 5,
    latitude: 48.8449,
    longitude: 2.347,
    color: "#CAFFBF",
    offers: [
      {
        name: "Snus",
        originalPrice: 9.0,
        squirPrice: 9.0,
        stock: 55,
        description: "Un snus",
        imageUrl: null,
        validUntil: null,
      },
      {
        name: "Long drink",
        originalPrice: 11.5,
        squirPrice: 11.5,
        stock: 65,
        description: "Un long drink",
        imageUrl: null,
        validUntil: null,
      },
    ],
  },
  {
    name: "Bar 6e",
    address: "6e Arrondissement, Paris",
    arrondissement: 6,
    latitude: 48.8508,
    longitude: 2.332,
    color: "#9BF6FF",
    offers: [],
  },
  {
    name: "Bar 7e",
    address: "7e Arrondissement, Paris",
    arrondissement: 7,
    latitude: 48.8566,
    longitude: 2.3126,
    color: "#A0C4FF",
    offers: [],
  },
  {
    name: "Bar 8e",
    address: "8e Arrondissement, Paris",
    arrondissement: 8,
    latitude: 48.872,
    longitude: 2.3126,
    color: "#BDB2FF",
    offers: [],
  },
  {
    name: "Bar 9e",
    address: "9e Arrondissement, Paris",
    arrondissement: 9,
    latitude: 48.876,
    longitude: 2.3372,
    color: "#FFC6FF",
    offers: [],
  },
  {
    name: "Bar 10e",
    address: "10e Arrondissement, Paris",
    arrondissement: 10,
    latitude: 48.8722,
    longitude: 2.36,
    color: "#FFADAD",
    offers: [],
  },
  {
    name: "Bar 11e",
    address: "11e Arrondissement, Paris",
    arrondissement: 11,
    latitude: 48.8579,
    longitude: 2.38,
    color: "#FFD6A5",
    offers: [],
  },
  {
    name: "Bar 12e",
    address: "12e Arrondissement, Paris",
    arrondissement: 12,
    latitude: 48.84,
    longitude: 2.395,
    color: "#FDFFB6",
    offers: [],
  },
  {
    name: "Bar 13e",
    address: "13e Arrondissement, Paris",
    arrondissement: 13,
    latitude: 48.8322,
    longitude: 2.356,
    color: "#CAFFBF",
    offers: [],
  },
  {
    name: "Bar 14e",
    address: "14e Arrondissement, Paris",
    arrondissement: 14,
    latitude: 48.8329,
    longitude: 2.326,
    color: "#9BF6FF",
    offers: [],
  },
  {
    name: "Bar 15e",
    address: "15e Arrondissement, Paris",
    arrondissement: 15,
    latitude: 48.8422,
    longitude: 2.3,
    color: "#A0C4FF",
    offers: [],
  },
  {
    name: "Bar 16e",
    address: "16e Arrondissement, Paris",
    arrondissement: 16,
    latitude: 48.8632,
    longitude: 2.275,
    color: "#BDB2FF",
    offers: [],
  },
  {
    name: "Bar 17e",
    address: "17e Arrondissement, Paris",
    arrondissement: 17,
    latitude: 48.884,
    longitude: 2.314,
    color: "#FFC6FF",
    offers: [],
  },
  {
    name: "Bar 18e",
    address: "18e Arrondissement, Paris",
    arrondissement: 18,
    latitude: 48.8925,
    longitude: 2.344,
    color: "#FF8FAB",
    offers: [],
  },
  {
    name: "Bar 19e",
    address: "19e Arrondissement, Paris",
    arrondissement: 19,
    latitude: 48.882,
    longitude: 2.384,
    color: "#9BF6FF",
    offers: [],
  },
  {
    name: "Bar 20e",
    address: "20e Arrondissement, Paris",
    arrondissement: 20,
    latitude: 48.864,
    longitude: 2.401,
    color: "#CAFFBF",
    offers: [],
  },
];

export async function seedBars(prisma: PrismaClient, users: User[]) {
  console.log("Seeding bars...");

  // Create a map of username to userId
  const userMap = new Map(users.map((u) => [u.username, u.id]));

  for (const barData of PARIS_BARS) {
    const { offers, ownerUsername, ...bar } = barData;

    // Connect owner if specified
    const usersConnect = ownerUsername
      ? { connect: { username: ownerUsername } }
      : undefined;

    await prisma.bar.create({
      data: {
        ...bar,
        users: usersConnect,
        offers: {
          create: offers,
        },
      },
    });
  }

  console.log(`Created ${PARIS_BARS.length} bars`);
}
