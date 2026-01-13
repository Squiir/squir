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

export const createBarIcon = (type: string) =>
  new DivIcon({
    className: "bg-transparent",
    html: `
    <div class="relative group cursor-pointer transition-transform hover:scale-110 w-8 h-8 flex items-center justify-center">
      <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-1000">
        ${type}
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
      </div>
      <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center" style="background-color: #fdcba2ff">
        <span class="text-base leading-none">🍻</span>
      </div>
    </div>
  `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

export const FRANCE_BOUNDS: LatLngBoundsExpression = [
  [41.303, -5.142],
  [51.124, 9.662],
];

export const DEFAULT_PARIS_CENTER: [number, number] = [48.8566, 2.3522];
export const DEFAULT_ZOOM = 13;
