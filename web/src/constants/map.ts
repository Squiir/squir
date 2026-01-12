import { DivIcon, type LatLngBoundsExpression } from "leaflet";

export const userIcon = new DivIcon({
  className: "bg-transparent",
  html: `
    <div class="relative flex items-center justify-center w-6 h-6">
      <div class="absolute w-full h-full bg-blue-500 rounded-full opacity-30 animate-ping"></div>
      <div class="relative w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const createBarIcon = (color: string) =>
  new DivIcon({
    className: "bg-transparent",
    html: `
    <div class="relative group cursor-pointer transition-transform hover:scale-110 w-8 h-8 flex items-center justify-center">
      <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center" style="background-color: ${color}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 11h1a3 3 0 0 1 0 6h-1"></path>
            <path d="M9 12v6"></path>
            <path d="M13 12v6"></path>
            <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5V17c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V7.5Z"></path>
            <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"></path>
        </svg>
      </div>
      <div class="absolute mt-1 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-white drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

export const FRANCE_BOUNDS: LatLngBoundsExpression = [
  [41.303, -5.142],
  [51.124, 9.662],
];
