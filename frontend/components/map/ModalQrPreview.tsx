import React from "react";
import { Modal, Pressable, Text, View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { QrCode } from "@app-types/qrcode";
import { API_URL } from "@constants/api";

type Props = {
    visible: boolean;
    onClose: () => void;
    qrcode?: QrCode;
};

export function ModalQrPreview({ visible, onClose, qrcode }: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                onPress={onClose}
                className="flex-1 bg-black/70 items-center justify-center p-[18px]"
            >
                <Pressable
                    className="w-full max-w-[380px] rounded-[22px] p-4 bg-black/92 border border-white/12"
                >
                    <Text className="text-white text-base font-black">
                        QR code généré
                    </Text>

                    <Text className="text-white/70 mt-1.5">
                        {qrcode?.label ?? "Sans label"}
                    </Text>

                    <View className="items-center mt-3.5">
                        {qrcode ? (
                            <Image
                                source={{
                                    uri: `${API_URL}${qrcode.url}`,
                                }}
                                style={{ width: 300, height: 300, borderRadius: 18 }}
                                contentFit="contain"
                            />
                        ) : (
                            <ActivityIndicator />
                        )}
                    </View>

                    <Pressable
                        onPress={onClose}
                        className="mt-3.5 py-3 rounded-[14px] bg-white/10 items-center"
                    >
                        <Text className="text-white font-extrabold">Fermer</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}
