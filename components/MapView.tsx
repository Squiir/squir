import React, { useState, useEffect, useRef } from 'react';
import { Navigation, MapPin, Search, Loader2 } from 'lucide-react';
import * as L from 'leaflet';
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_VENUES } from '../constants';
import VenueDetails from './VenueDetails';
import { Venue, VenueType, UserState } from '../types';

interface MapViewProps {
  user: UserState;
}

const MapView: React.FC<MapViewProps> = ({ user }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [isSearching, setIsSearching] = useState(false);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // SVG strings for icons to use in Leaflet DivIcon
  const ICONS = {
    MARTINI: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg>`,
    BEER: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1.79 1.15-2.38 3.5-2.38 3.5s-2.38-2.35-2.38-3.5c0-1.25 1.07-2.5 2.38-2.5s2.38 1.25 2.38 2.5Z"/><path d="M5 7c0-2.35 1.77-4 4.09-4h5.82C17.23 3 19 4.65 19 7v10a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7Z"/></svg>`,
    MUSIC: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    DISC: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/></svg>`
  };

  const getIconSvg = (type: VenueType) => {
    switch (type) {
      case VenueType.ROOFTOP: return ICONS.MARTINI;
      case VenueType.BAR: return ICONS.BEER;
      case VenueType.CLUB: return ICONS.MUSIC;
      default: return ICONS.DISC;
    }
  };

  // Initialize Map
  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      const map = L.map(mapContainer.current, {
        center: [48.865, 2.375],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstance.current = map;
      markersRef.current = L.layerGroup().addTo(map);

      // User Location Pin
      const userIcon = L.divIcon({
        className: 'user-location-pin',
        html: `
          <div class="relative w-4 h-4">
            <div class="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"></div>
            <div class="relative w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      L.marker([48.866, 2.370], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
    }
  }, []);

  // Update Markers when venues change
  useEffect(() => {
    if (!mapInstance.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    venues.forEach(venue => {
      const hasPoints = (user.points[venue.id] || 0) > 0;
      const colorClass = hasPoints ? 'text-slate-900' : 'text-slate-300';
      const bgClass = hasPoints ? 'bg-amber-500 border-amber-300' : 'bg-slate-800 border-slate-600';
      const badgeHtml = hasPoints ? `<span class="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-slate-900 shadow-md font-sans">${user.points[venue.id]}</span>` : '';

      const iconHtml = `
        <div class="relative flex flex-col items-center justify-center transform transition-transform hover:scale-110">
          <div class="w-10 h-10 ${bgClass} rounded-full border-2 flex items-center justify-center shadow-lg backdrop-blur-md ${colorClass}">
            ${getIconSvg(venue.type)}
          </div>
          ${badgeHtml}
          <div class="mt-1 px-2 py-0.5 bg-slate-900/90 rounded text-[10px] font-bold text-white shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-sans pointer-events-none">
            ${venue.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-marker-pin group',
        html: iconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([venue.coordinates.lat, venue.coordinates.lng], { icon: customIcon });
      
      marker.on('click', () => {
        setSelectedVenue(venue);
        mapInstance.current?.setView([venue.coordinates.lat, venue.coordinates.lng], 16, { animate: true });
      });

      marker.addTo(markersRef.current!);
    });
  }, [venues, user]);

  const handleCenterMap = () => {
    if (mapInstance.current) {
      mapInstance.current.setView([48.866, 2.370], 15, { animate: true });
    }
  };

  const handleSearchArea = async () => {
    if (!mapInstance.current || isSearching) return;
    
    setIsSearching(true);
    const center = mapInstance.current.getCenter();
    const radius = 1000; // Roughly search nearby

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `List 15 real and popular bars, nightclubs, or restaurants within 1km of coordinates ${center.lat}, ${center.lng} in Paris. 
        Return a JSON array where each object has: name, type (must be strictly one of: BAR, CLUB, RESTAURANT, ROOFTOP), lat, lng, and a short French description.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['BAR', 'CLUB', 'RESTAURANT', 'ROOFTOP'] },
                lat: { type: Type.NUMBER },
                lng: { type: Type.NUMBER },
                description: { type: Type.STRING }
              },
              required: ['name', 'type', 'lat', 'lng', 'description']
            }
          }
        }
      });

      if (response.text) {
        const rawVenues = JSON.parse(response.text);
        
        // Transform API response to Venue objects
        const newVenues: Venue[] = rawVenues.map((v: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: v.name,
          type: v.type as VenueType,
          coordinates: { lat: v.lat, lng: v.lng },
          image: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`,
          logo: 'disc', // Default logo fallback
          description: v.description,
          currentTraffic: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as any,
          activeOffers: [] // New venues don't have offers yet in this mock
        }));

        // Merge with existing venues (avoiding exact duplicates by name)
        setVenues(prev => {
          const existingNames = new Set(prev.map(p => p.name));
          const filteredNew = newVenues.filter(v => !existingNames.has(v.name));
          return [...prev, ...filteredNew];
        });
      }

    } catch (error) {
      console.error("Failed to fetch venues", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-slate-900 overflow-hidden">
      {/* Search / Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-[1000] bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent pb-12 pointer-events-none flex flex-col gap-4">
        <div className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight inline-block">SQUIR <span className="text-amber-400">.</span></h1>
            <p className="text-slate-400 text-sm">Paris, Oberkampf</p>
          </div>
        </div>
      </div>

      {/* Floating Search Button */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-[900]">
        <button 
          onClick={handleSearchArea}
          disabled={isSearching}
          className="bg-slate-800/90 backdrop-blur text-white px-5 py-2.5 rounded-full shadow-lg border border-slate-600 flex items-center gap-2 text-sm font-semibold active:scale-95 transition-all hover:bg-slate-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSearching ? (
             <>
               <Loader2 size={16} className="animate-spin text-amber-400" />
               Recherche...
             </>
          ) : (
             <>
               <Search size={16} className="text-amber-400" />
               Rechercher dans cette zone
             </>
          )}
        </button>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full z-0" />

      {/* Action Floating Button - Center Map */}
      <button 
        onClick={handleCenterMap}
        className="absolute bottom-24 right-6 bg-slate-800 p-3 rounded-full text-white shadow-lg border border-slate-700 active:scale-95 transition-transform z-[900]"
      >
        <Navigation size={24} className="text-amber-400" />
      </button>

      {/* Details Modal */}
      <VenueDetails 
        venue={selectedVenue} 
        onClose={() => setSelectedVenue(null)} 
        userPoints={selectedVenue ? (user.points[selectedVenue.id] || 0) : 0}
      />
    </div>
  );
};

export default MapView;