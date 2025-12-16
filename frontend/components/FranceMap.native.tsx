import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  latitude?: number;
  longitude?: number;
};

export default function FranceMap({ latitude, longitude }: Props) {
  const region = {
    latitude: latitude ?? 46.6,
    longitude: longitude ?? 2.2,
    latitudeDelta: latitude && longitude ? 0.08 : 6.5,
    longitudeDelta: latitude && longitude ? 0.08 : 6.5,
  };

  return (
    <MapView style={styles.map} initialRegion={region}>
      {latitude && longitude ? (
        <Marker coordinate={{ latitude, longitude }} title="Toi" />
      ) : null}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
