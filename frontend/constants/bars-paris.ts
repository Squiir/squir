export type BarSpot = {
	id: string;
	name: string;
	arrondissement: number;
	latitude: number;
	longitude: number;
	color: string;
	offers?: { id: string; name: string; price: number }[];
};

// ✅ Coordonnées "approx" par arrondissement (centres) — remplace par tes bars exacts quand tu veux
export const PARIS_BARS: BarSpot[] = [
	{
		id: "bar-01",
		name: "Bar 1er",
		arrondissement: 1,
		latitude: 48.8626,
		longitude: 2.336,
		color: "#FF4D6D",
		offers: [
			{ id: "beer-25cl", name: "Bière pression 25cl", price: 4.5 },
			{ id: "mojito", name: "Mojito", price: 9.0 },
		],
	},
	{
		id: "bar-02",
		name: "Bar 2e",
		arrondissement: 2,
		latitude: 48.8686,
		longitude: 2.342,
		color: "#FF8FAB",
		offers: [
			{ id: "wine-glass", name: "Verre de vin", price: 6.0 },
			{ id: "spritz", name: "Spritz", price: 8.5 },
		],
	},
	{
		id: "bar-03",
		name: "Bar 3e",
		arrondissement: 3,
		latitude: 48.8635,
		longitude: 2.3615,
		color: "#FFD6A5",
		offers: [
			{ id: "cocktail-classic", name: "Cocktail classique", price: 10.0 },
			{ id: "cocktail-special", name: "Cocktail spécial", price: 12.0 },
		],
	},
	{
		id: "bar-04",
		name: "Bar 4e",
		arrondissement: 4,
		latitude: 48.8557,
		longitude: 2.3622,
		color: "#FDFFB6",
		offers: [
			{ id: "garbiche", name: "Ptite Garbiche", price: 5.0 },
			{ id: "whisky", name: "Whisky", price: 11.0 },
		],
	},
	{
		id: "bar-05",
		name: "Bar 5e",
		arrondissement: 5,
		latitude: 48.8449,
		longitude: 2.347,
		color: "#CAFFBF",
		offers: [
			{ id: "snus", name: "Snus", price: 7.5 },
			{ id: "long-drink", name: "Long drink", price: 9.5 },
		],
	},
	{
		id: "bar-06",
		name: "Bar 6e",
		arrondissement: 6,
		latitude: 48.8508,
		longitude: 2.332,
		color: "#9BF6FF",
	},
	{
		id: "bar-07",
		name: "Bar 7e",
		arrondissement: 7,
		latitude: 48.8566,
		longitude: 2.3126,
		color: "#A0C4FF",
	},
	{
		id: "bar-08",
		name: "Bar 8e",
		arrondissement: 8,
		latitude: 48.872,
		longitude: 2.3126,
		color: "#BDB2FF",
	},
	{
		id: "bar-09",
		name: "Bar 9e",
		arrondissement: 9,
		latitude: 48.876,
		longitude: 2.3372,
		color: "#FFC6FF",
	},
	{
		id: "bar-10",
		name: "Bar 10e",
		arrondissement: 10,
		latitude: 48.8722,
		longitude: 2.36,
		color: "#FFADAD",
	},
	{
		id: "bar-11",
		name: "Bar 11e",
		arrondissement: 11,
		latitude: 48.8579,
		longitude: 2.38,
		color: "#FFD6A5",
	},
	{
		id: "bar-12",
		name: "Bar 12e",
		arrondissement: 12,
		latitude: 48.84,
		longitude: 2.395,
		color: "#FDFFB6",
	},
	{
		id: "bar-13",
		name: "Bar 13e",
		arrondissement: 13,
		latitude: 48.8322,
		longitude: 2.356,
		color: "#CAFFBF",
	},
	{
		id: "bar-14",
		name: "Bar 14e",
		arrondissement: 14,
		latitude: 48.8329,
		longitude: 2.326,
		color: "#9BF6FF",
	},
	{
		id: "bar-15",
		name: "Bar 15e",
		arrondissement: 15,
		latitude: 48.8422,
		longitude: 2.3,
		color: "#A0C4FF",
	},
	{
		id: "bar-16",
		name: "Bar 16e",
		arrondissement: 16,
		latitude: 48.8632,
		longitude: 2.275,
		color: "#BDB2FF",
	},
	{
		id: "bar-17",
		name: "Bar 17e",
		arrondissement: 17,
		latitude: 48.884,
		longitude: 2.314,
		color: "#FFC6FF",
	},
	{
		id: "bar-18",
		name: "Bar 18e",
		arrondissement: 18,
		latitude: 48.8925,
		longitude: 2.344,
		color: "#FF8FAB",
	},
	{
		id: "bar-19",
		name: "Bar 19e",
		arrondissement: 19,
		latitude: 48.882,
		longitude: 2.384,
		color: "#9BF6FF",
	},
	{
		id: "bar-20",
		name: "Bar 20e",
		arrondissement: 20,
		latitude: 48.864,
		longitude: 2.401,
		color: "#CAFFBF",
	},
];
