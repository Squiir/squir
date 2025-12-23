import { PrismaClient } from "@prisma/client";

const PARIS_BARS = [
    {
        name: "Bar 1er", arrondissement: 1, latitude: 48.8626, longitude: 2.3360, color: "#FF4D6D",
        offers: [
            { name: "Bière pression 25cl", price: 4.5 },
            { name: "Mojito", price: 9.0 },
        ],
    },
    {
        name: "Bar 2e", arrondissement: 2, latitude: 48.8686, longitude: 2.3420, color: "#FF8FAB",
        offers: [
            { name: "Verre de vin", price: 6.0 },
            { name: "Spritz", price: 8.5 },
        ],
    },
    {
        name: "Bar 3e", arrondissement: 3, latitude: 48.8635, longitude: 2.3615, color: "#FFD6A5",
        offers: [
            { name: "Cocktail classique", price: 10.0 },
            { name: "Cocktail spécial", price: 12.0 },
        ],
    },
    {
        name: "Bar 4e", arrondissement: 4, latitude: 48.8557, longitude: 2.3622, color: "#FDFFB6",
        offers: [
            { name: "Ptite Garbiche", price: 5.0 },
            { name: "Whisky", price: 11.0 },
        ],
    },
    {
        name: "Bar 5e", arrondissement: 5, latitude: 48.8449, longitude: 2.3470, color: "#CAFFBF",
        offers: [
            { name: "Snus", price: 7.5 },
            { name: "Long drink", price: 9.5 },
        ],
    },
    { name: "Bar 6e", arrondissement: 6, latitude: 48.8508, longitude: 2.3320, color: "#9BF6FF", offers: [] },
    { name: "Bar 7e", arrondissement: 7, latitude: 48.8566, longitude: 2.3126, color: "#A0C4FF", offers: [] },
    { name: "Bar 8e", arrondissement: 8, latitude: 48.8720, longitude: 2.3126, color: "#BDB2FF", offers: [] },
    { name: "Bar 9e", arrondissement: 9, latitude: 48.8760, longitude: 2.3372, color: "#FFC6FF", offers: [] },
    { name: "Bar 10e", arrondissement: 10, latitude: 48.8722, longitude: 2.3600, color: "#FFADAD", offers: [] },
    { name: "Bar 11e", arrondissement: 11, latitude: 48.8579, longitude: 2.3800, color: "#FFD6A5", offers: [] },
    { name: "Bar 12e", arrondissement: 12, latitude: 48.8400, longitude: 2.3950, color: "#FDFFB6", offers: [] },
    { name: "Bar 13e", arrondissement: 13, latitude: 48.8322, longitude: 2.3560, color: "#CAFFBF", offers: [] },
    { name: "Bar 14e", arrondissement: 14, latitude: 48.8329, longitude: 2.3260, color: "#9BF6FF", offers: [] },
    { name: "Bar 15e", arrondissement: 15, latitude: 48.8422, longitude: 2.3000, color: "#A0C4FF", offers: [] },
    { name: "Bar 16e", arrondissement: 16, latitude: 48.8632, longitude: 2.2750, color: "#BDB2FF", offers: [] },
    { name: "Bar 17e", arrondissement: 17, latitude: 48.8840, longitude: 2.3140, color: "#FFC6FF", offers: [] },
    { name: "Bar 18e", arrondissement: 18, latitude: 48.8925, longitude: 2.3440, color: "#FF8FAB", offers: [] },
    { name: "Bar 19e", arrondissement: 19, latitude: 48.8820, longitude: 2.3840, color: "#9BF6FF", offers: [] },
    { name: "Bar 20e", arrondissement: 20, latitude: 48.8640, longitude: 2.4010, color: "#CAFFBF", offers: [] },
];

export async function seedBars(prisma: PrismaClient) {
    console.log("Seeding bars...");

    for (const barData of PARIS_BARS) {
        const { offers, ...bar } = barData;
        await prisma.bar.create({
            data: {
                ...bar,
                offers: {
                    create: offers,
                },
            },
        });
    }

    console.log(`Created ${PARIS_BARS.length} bars`);
}
