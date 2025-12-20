import { ScrollView, Text, View } from "react-native";
import type { QRCodeCarouselProps } from "./types";

export function QRCodeCarousel({ qrCodes }: QRCodeCarouselProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-3">
        {qrCodes.map((qr: any) => (
          <View
            key={qr.id}
            className="items-center justify-center w-40 h-24 bg-gray-200 rounded-xl dark:bg-gray-700"
          >
            <Text className="text-sm text-white">{qr.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
