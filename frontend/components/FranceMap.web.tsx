import React, { Suspense } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import type { ParisBar } from "../constants/parisBars";

type Props = {
  latitude?: number;
  longitude?: number;
  bars: ParisBar[];
  onSelectBar: (bar: ParisBar) => void;
};

// ✅ Lazy load : Leaflet ne s’importe pas tant que ce module n’est pas rendu sur web
const LeafletMap = React.lazy(() => import("./FranceMapLeaflet.web"));

export default function FranceMapWeb(props: Props) {
  return (
    <Suspense
      fallback={
        <View style={styles.loader}>
          <ActivityIndicator />
          <Text style={styles.text}>Chargement de la carte…</Text>
        </View>
      }
    >
      <LeafletMap {...props} />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { marginTop: 10, opacity: 0.7 },
});
