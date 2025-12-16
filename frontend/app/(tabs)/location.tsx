import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Text,
  Image,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { Stack } from "expo-router";

import FranceMap from "../../components/FranceMap";
import { PARIS_BARS, type ParisBar } from "../../constants/parisBars";

export default function LocationScreen() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [selectedBar, setSelectedBar] = useState<ParisBar | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission refusée",
            "Autorise la localisation pour afficher ta position."
          );
          setLoading(false);
          return;
        }

        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      } catch (e) {
        Alert.alert("Erreur", "Impossible de récupérer la localisation.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Localisation" }} />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FranceMap
          latitude={coords?.latitude}
          longitude={coords?.longitude}
          bars={PARIS_BARS}
          onSelectBar={(bar: ParisBar) => setSelectedBar(bar)}
        />
      )}

      {/* ===== MODAL FICHE BAR ===== */}
      <Modal
        visible={!!selectedBar}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBar(null)}
      >
        {/* backdrop */}
        <Pressable
          style={styles.backdrop}
          onPress={() => setSelectedBar(null)}
        />

        {/* bottom sheet */}
        <View style={styles.sheet}>
          {selectedBar && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>{selectedBar.name}</Text>

              <Text style={styles.subtitle}>
                Paris {selectedBar.arrondissement}ᵉ arrondissement
              </Text>

              <Image
                source={{ uri: selectedBar.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />

              <Text style={styles.description}>
                {selectedBar.description}
              </Text>

              <Pressable
                style={styles.closeButton}
                onPress={() => setSelectedBar(null)}
              >
                <Text style={styles.closeText}>Fermer</Text>
              </Pressable>
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: "75%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.85,
    marginBottom: 16,
  },

  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#111",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  closeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
