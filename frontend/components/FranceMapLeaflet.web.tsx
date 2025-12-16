import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import type { ParisBar } from "../constants/parisBars";
import "leaflet/dist/leaflet.css";

// Fix icône marker
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
  latitude?: number;
  longitude?: number;
  bars: ParisBar[];
  onSelectBar: (bar: ParisBar) => void;
};

export default function FranceMapLeafletWeb({ latitude, longitude, bars, onSelectBar }: Props) {
  const center = useMemo<[number, number]>(() => {
    if (typeof latitude === "number" && typeof longitude === "number") return [latitude, longitude];
    return [48.8566, 2.3522]; // Paris
  }, [latitude, longitude]);

  const zoom = typeof latitude === "number" && typeof longitude === "number" ? 13 : 12;

  return (
    <View style={styles.container}>
      <div style={styles.mapWrapper as any}>
        <MapContainer center={center} zoom={zoom} style={styles.map as any}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {typeof latitude === "number" && typeof longitude === "number" && (
            <Marker position={[latitude, longitude]}>
              <Popup>Toi</Popup>
            </Marker>
          )}

          {bars.map((bar) => (
            <Marker
              key={bar.id}
              position={[bar.latitude, bar.longitude]}
              eventHandlers={{ click: () => onSelectBar(bar) }}
            >
              <Popup>
                <strong>{bar.name}</strong>
                <br />
                Paris {bar.arrondissement}e
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapWrapper: { width: "100%", height: "100%" },
  map: { width: "100%", height: "100%" },
});
