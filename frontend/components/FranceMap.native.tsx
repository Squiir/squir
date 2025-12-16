import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import type { ParisBar } from "../constants/parisBars";

type Props = {
  latitude?: number;
  longitude?: number;
  bars: ParisBar[];
  onSelectBar: (bar: ParisBar) => void;
};

export default function FranceMap({ latitude, longitude, bars, onSelectBar }: Props) {
  const region = {
    latitude: latitude ?? 46.6,
    longitude: longitude ?? 2.2,
    latitudeDelta: latitude && longitude ? 0.08 : 6.5,
    longitudeDelta: latitude && longitude ? 0.08 : 6.5,
  };

  return (
    <MapView style={styles.map} initialRegion={region}>
      {/* Position utilisateur */}
      {latitude && longitude ? (
        <Marker coordinate={{ latitude, longitude }} title="Toi" pinColor="blue" />
      ) : null}

      {/* Bars */}
      {bars.map((bar) => (
        <Marker
          key={bar.id}
          coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
          title={bar.name}
          pinColor="red"
          onPress={() => onSelectBar(bar)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
