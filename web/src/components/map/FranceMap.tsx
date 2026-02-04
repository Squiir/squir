import { MapController } from "@/components/map/MapController";
import { OfferCard } from "@/components/map/OfferCard";
import { ZoomControlWithSlider } from "@/components/map/ZoomControlWithSlider";
import {
  DEFAULT_PARIS_CENTER,
  DEFAULT_ZOOM,
  FRANCE_BOUNDS,
  createBarIcon,
  userIcon,
} from "@/constants/map";
import { useTheme } from "@/contexts/ThemeProvider";
import { useBars } from "@/hooks/bars/use-bars";
import type { Bar } from "@/types/bar";
import type { Coordinate } from "@/types/map";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function FranceMap({
  latitude,
  longitude,
  readOnly = false,
}: Coordinate & { readOnly?: boolean }) {
  const { data: bars, isPending: isGetBarsPending } = useBars();
  const { theme } = useTheme();

  const [offerOpen, setOfferOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);

  const [isSystemDark, setIsSystemDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsSystemDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const isDark = theme === "dark" || (theme === "system" && isSystemDark);

  const handleOverlayClick = () => {
    if (readOnly && latitude && longitude) {
      window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
    }
  };

  const handleOverlayClick = () => {
    if (readOnly && latitude && longitude) {
      window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
    }
  };

  return (
    <div className="relative z-0 w-full h-full bg-slate-100 dark:bg-slate-900">
      {isGetBarsPending && !readOnly && (
        <div className="absolute inset-0 flex items-center justify-center z-1000 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      {readOnly && (
        <div
          className="absolute inset-0 z-[1001] cursor-pointer"
          onClick={handleOverlayClick}
          title="Ouvrir dans Google Maps"
        />
      )}

      <MapContainer
        center={latitude && longitude ? [latitude, longitude] : DEFAULT_PARIS_CENTER}
        zoom={readOnly && latitude && longitude ? 15 : DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={!readOnly}
        scrollWheelZoom={!readOnly}
        doubleClickZoom={!readOnly}
        touchZoom={!readOnly}
        boxZoom={!readOnly}
        keyboard={!readOnly}
        className="outline-none"
        minZoom={7}
        maxZoom={18}
        maxBounds={FRANCE_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={
            isDark
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          }
          subdomains="abcd"
          maxZoom={20}
        />

        <MapController latitude={latitude} longitude={longitude} />
        {!readOnly && <ZoomControlWithSlider />}

        {latitude && longitude && (
          <Marker
            position={[latitude, longitude]}
            icon={readOnly ? createBarIcon("Bar") : userIcon}
            interactive={false}
          />
        )}

        {!readOnly &&
          (bars ?? []).map((bar: Bar) => (
            <Marker
              key={bar.id}
              position={[bar.latitude, bar.longitude]}
              icon={createBarIcon("Bar")}
              eventHandlers={{
                click: () => {
                  setSelectedBar(bar);
                  setOfferOpen(true);
                },
              }}
            />
          ))}
      </MapContainer>

      {!readOnly && (
        <OfferCard
          offerOpen={offerOpen}
          setOfferOpen={setOfferOpen}
          selectedBar={selectedBar}
        />
      )}
    </div>
  );
}
