import React from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { formatPrice } from "@utils/qrcode";
import { Bar, Offer } from "@app-types/bar";
import { QrCode } from "@app-types/qrcode"
import { QrCodeDto } from "@services/qrcode.service";

import clsx from "clsx";

interface OfferItemProps {
    key?: string;
    offer: Offer;
    selectedBar: Bar;
    alreadyHas: boolean;
    disabled: boolean;
    onCreateQrcode: (qr: QrCodeDto) => void;
}

function OfferItem({ offer, selectedBar, alreadyHas, disabled, onCreateQrcode }: OfferItemProps) {
    const handlePress = () => {
        onCreateQrcode({
            barId: selectedBar.id,
            productId: offer.id,
            label: `${selectedBar.name} • ${offer.name}${typeof offer.price === "number" ? ` • ${formatPrice(offer.price)}` : ""}`,
        });
    };

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            className={clsx(
                "py-3 px-3 rounded-[14px] border",
                alreadyHas ? "bg-white/6 border-white/14" : "bg-white/10 border-white/18",
                disabled && "opacity-65"
            )}
        >
            <View className="flex-row justify-between">
                <Text className="text-white font-extrabold">{offer.name}</Text>
                {alreadyHas && <Text className="text-white/65 font-extrabold">Déjà en stock</Text>}
            </View>
            {typeof offer.price === "number" && (
                <Text className="text-white/70 mt-1">{formatPrice(offer.price)}</Text>
            )}
        </Pressable>
    );
}

export function ModalOffer({
    offerOpen,
    setOfferOpen,
    selectedBar,
    qrcodes,
    onCreateQrcode,
    isCreateQrcodePending,
    isGetMyQrcodesPending,
}: {
    offerOpen: boolean;
    setOfferOpen: (open: boolean) => void;
    selectedBar: Bar | null | undefined;
    qrcodes: QrCode[] | null;
    onCreateQrcode: (qr: QrCodeDto) => void;
    isCreateQrcodePending: boolean;
    isGetMyQrcodesPending: boolean;
}) {
    const offers = selectedBar?.offers ?? [];

    return (
        <Modal
            visible={offerOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setOfferOpen(false)}
        >
            <Pressable
                onPress={() => setOfferOpen(false)}
                className="flex-1 bg-black/70 items-center justify-center p-[18px]"
            >
                <Pressable
                    className="w-full max-w-[380px] rounded-[22px] p-4 bg-black/92 border border-white/12"
                >
                    <Text className="text-white text-base font-black">
                        {selectedBar?.name ?? "Offres"}
                    </Text>
                    <Text className="text-white/70 mt-1.5">
                        Choisis une offre pour générer le QR code
                    </Text>

                    <View className="mt-3.5 gap-2.5">
                        {offers.map((offer) => (
                            <OfferItem
                                key={offer.id}
                                offer={offer}
                                selectedBar={selectedBar!}
                                alreadyHas={qrcodes?.some(
                                    (qr) => qr.barId === selectedBar!.id && qr.productId === offer.id
                                ) ?? false}
                                disabled={isCreateQrcodePending}
                                onCreateQrcode={onCreateQrcode}
                            />
                        ))}

                        {offers.length === 0 && (
                            <Text className="text-white/70">Aucune offre disponible.</Text>
                        )}
                    </View>

                    <View className="mt-3.5 flex-row items-center">
                        {(isCreateQrcodePending || isGetMyQrcodesPending) && (
                            <>
                                <ActivityIndicator />
                                <Text className="text-white/75 ml-2">
                                    {isCreateQrcodePending ? "Génération…" : "Chargement du stock…"}
                                </Text>
                            </>
                        )}
                    </View>

                    <Pressable
                        onPress={() => setOfferOpen(false)}
                        className="mt-3.5 py-3 rounded-[14px] bg-white/10 items-center"
                    >
                        <Text className="text-white font-extrabold">Fermer</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

