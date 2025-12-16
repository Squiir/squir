import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  latitude?: number;
  longitude?: number;
};

export default function FranceMap({ latitude, longitude }: Props) {
  const lat = latitude ?? 46.6;
  const lon = longitude ?? 2.2;

  // zoom approx: si on a la position -> zoom plus fort
  const delta = latitude && longitude ? 0.2 : 6;

  const left = lon - delta;
  const bottom = lat - delta;
  const right = lon + delta;
  const top = lat + delta;

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <View style={styles.container}>
      <iframe title="map" src={src} style={styles.iframe as any} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  iframe: { width: "100%", height: "100%"},
});
