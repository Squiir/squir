import React, { useMemo } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { PARIS_BARS } from "@constants/bars-paris";
import type { Coordinate as Props } from "@components/map/Coordinate";


export default function FranceMap({ latitude, longitude }: Props) {
  const initialRegion = useMemo(
    () => ({
      latitude: latitude ?? 48.8566,
      longitude: longitude ?? 2.3522,
      latitudeDelta: 0.12,
      longitudeDelta: 0.12,
    }),
    [latitude, longitude]
  );

  return (
    <View className="flex-1">
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {!!latitude && !!longitude && (
          <Marker coordinate={{ latitude, longitude }} title="Moi" pinColor="#4D96FF" />
        )}

        {PARIS_BARS.map((bar) => (
          <Marker
            key={bar.id}
            coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
            pinColor={bar.color}
          >
            <Callout tooltip>
              <View className="rounded-2xl border border-white/15 bg-black/95 px-3 py-2 min-w-[170px]">
                <Text className="text-white font-extrabold text-[14px]">
                  {bar.name}
                </Text>
                <Text className="text-white/75 mt-1 text-[12px]">
                  Paris {bar.arrondissement}e
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
