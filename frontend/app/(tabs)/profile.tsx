import React from "react";
import { ActivityIndicator, ScrollView, Text, View, Alert } from "react-native";

import { useMe } from "@hooks/use-me";
import { useDeleteQrCode } from "@hooks/qrcode/use-delete-qrcode";
import { ProfileHeader } from "@components/profile/ProfileHeader";
import { useLogout } from "@hooks/auth/use-logout";
import { Button } from "@components/ui/Button";
import { QrCard } from "@components/qrcode/QrCard";
import { QrModal } from "@components/qrcode/QrModal";
import { useGetMyQrcodes } from "@hooks/qrcode/use-get-qrcodes";
import { Qrcode } from "@app-types/qrcode";

export default function ProfileScreen() {
  const { data: user } = useMe();
  const { mutate: logout } = useLogout();

  const {
    data: qrcodes,
    isLoading: qrsLoading,
    isError: qrsError,
    error: qrsErr,
  } = useGetMyQrcodes();

  const { mutateAsync: deleteQrcode, isPending } = useDeleteQrCode();

  const [selectedQr, setSelectedQr] = React.useState<null | {
    id: string;
    label?: string;
    used?: boolean;
    barId?: string;
    productId?: string;
  }>(null);

  function handleDeleteQr() {
    if (!selectedQr?.id) return;

    Alert.alert("Supprimer ce QR code ?", "Cette action est irréversible.", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteQrcode(selectedQr.id);
            setSelectedQr(null);
          } catch (e: any) {
            Alert.alert(
              "Erreur",
              e?.message ?? "Impossible de supprimer le QR code."
            );
          }
        },
      },
    ]);
  }

  if (!user) return null;

  return (
    <ScrollView className="flex-1 px-4 pt-6">
      {/* Header */}
      <ProfileHeader
        username={user.username}
        avatarUrl={user.avatarUrl}
        status={user.status}
      />

      {/* QR codes */}
      <View className="mt-8">
        <Text className="text-white text-lg font-bold mb-3">Mes QR codes</Text>

        {qrsLoading ? (
          <View className="py-6 items-center">
            <ActivityIndicator />
          </View>
        ) : qrsError ? (
          <Text className="text-red-400">
            {qrsErr instanceof Error ? qrsErr.message : "Erreur de chargement"}
          </Text>
        ) : !qrcodes || qrcodes.length === 0 ? (
          <Text className="text-white/70">Aucun QR code pour l’instant.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4 pr-4">
              {qrcodes.map((qr: Qrcode) => (
                <QrCard key={qr.id} qr={qr} onPress={() => setSelectedQr(qr)} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Modal QR */}
      <QrModal
        qr={selectedQr}
        deleting={isPending}
        onClose={() => setSelectedQr(null)}
        onDelete={handleDeleteQr}
      />

      {/* Actions */}
      <View className="px-6 pt-16 pb-6">
        <View className="gap-4">
          <Button
            title="Se déconnecter"
            variant="secondary"
            onPress={() => logout()}
          />

          <View className="h-2" />

          <Button title="Supprimer le compte" variant="danger" />
        </View>
      </View>
    </ScrollView>
  );
}
