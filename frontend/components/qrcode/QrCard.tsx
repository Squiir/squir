import { Pressable, Text, View } from "react-native";
import { Badge } from "@components/ui/Badge";
import { parseQrLabel } from "@utils/qrcode";

type Props = {
  qr: {
    id: string;
    label?: string;
    used?: boolean;
    barId?: string;
    productId?: string;
  };
  onPress: () => void;
};

export function QrCard({ qr, onPress }: Props) {
  const { barName, offerName, priceText } = parseQrLabel(qr.label);

  return (
    <Pressable
      onPress={onPress}
      className="w-[260px] rounded-2xl border border-white/10 bg-white/5 p-4"
    >
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-2">
          <Text className="text-white font-extrabold" numberOfLines={1}>
            {offerName || qr.label || "Offre"}
          </Text>
          <Text className="text-white/70 text-xs mt-1" numberOfLines={1}>
            {barName ? `Chez ${barName}` : `Bar: ${qr.barId}`}
          </Text>
        </View>

        <Badge text="QR" variant={qr.used ? "warn" : "ok"} />
      </View>

      {/* Infos */}
      <View className="mt-3 gap-1">
        <Text className="text-white/60 text-xs">
          {priceText ? `Prix: ${priceText}` : "Prix: —"}
        </Text>
        <Text className="text-white/60 text-xs">
          {qr.used ? "Statut: utilisé" : "Statut: disponible"}
        </Text>
        <Text className="text-white/50 text-[11px]">
          Offre ID: {qr.productId}
        </Text>
      </View>

      {/* CTA */}
      <View className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 items-center">
        <Text className="text-white/70 text-xs">
          Appuie pour afficher le QR
        </Text>
      </View>
    </Pressable>
  );
}
