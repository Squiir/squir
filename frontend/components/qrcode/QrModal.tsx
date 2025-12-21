import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Badge } from "@components/ui/Badge";
import { parseQrLabel } from "@utils/qrcode";
import { API_URL } from "@services/api";

type Props = {
  qr: {
    id: string;
    label?: string;
    used?: boolean;
    barId?: string;
  } | null;
  token: string | null;
  onClose: () => void;
  onDelete: () => void;
  deleting?: boolean;
};

export function QrModal({
  qr,
  token,
  onClose,
  onDelete,
  deleting,
}: Props) {
  if (!qr) return null;

  const { barName, offerName, priceText } = parseQrLabel(qr.label);
  const url = `${API_URL}/qrcodes/${qr.id}.png`;

  return (
    <Modal visible transparent animationType="fade">
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/70 items-center justify-center px-4"
      >
        <Pressable
          onPress={() => {}}
          className="w-full max-w-[400px] rounded-2xl bg-black/90 border border-white/10 p-4"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-white text-base font-extrabold">
                {offerName || qr.label}
              </Text>
              <Text className="text-white/70 mt-1">
                {barName ? `Chez ${barName}` : ""}
                {priceText ? ` • ${priceText}` : ""}
              </Text>
            </View>

            <Badge text="QR" variant={qr.used ? "warn" : "ok"} />
          </View>

          <Text className="text-white/60 mt-3">
            {qr.used ? "Statut : utilisé" : "Statut : disponible"}
            {qr.barId ? ` • ${qr.barId}` : ""}
          </Text>

          <View className="items-center mt-4">
            <Image
              source={{
                uri: url,
                headers: token
                  ? { Authorization: `Bearer ${token}` }
                  : undefined,
              }}
              className="w-[300px] h-[300px] rounded-xl"
              contentFit="contain"
            />
          </View>

          <Pressable
            onPress={onDelete}
            disabled={deleting}
            className="mt-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 items-center"
          >
            <Text className="text-red-300 font-bold">
              {deleting ? "Suppression..." : "Supprimer ce QR"}
            </Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            className="mt-3 py-3 rounded-xl bg-white/10 items-center"
          >
            <Text className="text-white font-bold">Fermer</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
