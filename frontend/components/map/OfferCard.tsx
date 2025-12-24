import { Bar } from "@app-types/bar";
import { Offer } from "@app-types/offer";
import { QrCode } from "@app-types/qrcode";
import { QrCodeDto } from "@services/qrcode.service";
import { formatPrice } from "@utils/qrcode";
import React from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";

import clsx from "clsx";

interface OfferItemProps {
	key?: string;
	offer: Offer;
	selectedBar: Bar;
	alreadyHas: boolean;
	disabled: boolean;
	onCreateQrCode: (qr: QrCodeDto) => void;
}

function OfferItem({
	offer,
	selectedBar,
	alreadyHas,
	disabled,
	onCreateQrCode,
}: OfferItemProps) {
	const handlePress = () => {
		onCreateQrCode({
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
				"py-3 px-4 rounded-xl border-2",
				alreadyHas
					? "bg-gray-100 border-gray-300"
					: "bg-blue-50 border-blue-200",
				disabled && "opacity-50",
			)}
		>
			<View className="flex-row justify-between items-center">
				<Text className="text-gray-900 font-bold">{offer.name}</Text>
				{alreadyHas && (
					<Text className="text-gray-500 font-semibold text-sm">
						Déjà en stock
					</Text>
				)}
			</View>
			{typeof offer.price === "number" && (
				<Text className="text-gray-600 mt-1">{formatPrice(offer.price)}</Text>
			)}
		</Pressable>
	);
}

export function OfferCard({
	offerOpen,
	setOfferOpen,
	selectedBar,
	qrcodes,
	onCreateQrCode,
	isCreateQrCodePending,
	isGetMyQrCodesPending,
}: {
	offerOpen: boolean;
	setOfferOpen: (open: boolean) => void;
	selectedBar: Bar | null | undefined;
	qrcodes: QrCode[] | null;
	onCreateQrCode: (qr: QrCodeDto) => void;
	isCreateQrCodePending: boolean;
	isGetMyQrCodesPending: boolean;
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
				className="flex-1 items-center justify-center px-6"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				}}
			>
				<Pressable
					className="w-full max-w-[380px] rounded-3xl overflow-hidden p-6"
					style={{
						backgroundColor: "white",
						backgroundImage:
							"linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)",
					}}
				>
					<Text className="text-gray-900 text-xl font-bold mb-1">
						{selectedBar?.name ?? "Offres"}
					</Text>
					<Text className="text-gray-600 text-sm mb-4">
						Choisis une offre pour générer le QR code
					</Text>

					<View className="gap-2.5 mb-4">
						{offers.map((offer) => (
							<OfferItem
								key={offer.id}
								offer={offer}
								selectedBar={selectedBar!}
								alreadyHas={
									qrcodes?.some(
										(qr) =>
											qr.barId === selectedBar!.id && qr.productId === offer.id,
									) ?? false
								}
								disabled={isCreateQrCodePending}
								onCreateQrCode={onCreateQrCode}
							/>
						))}

						{offers.length === 0 && (
							<Text className="text-gray-500">Aucune offre disponible.</Text>
						)}
					</View>

					<View className="flex-row items-center mb-4 min-h-[24px]">
						{(isCreateQrCodePending || isGetMyQrCodesPending) && (
							<>
								<ActivityIndicator color="#3b82f6" />
								<Text className="text-gray-600 ml-2">
									{isCreateQrCodePending
										? "Génération…"
										: "Chargement du stock…"}
								</Text>
							</>
						)}
					</View>

					<Pressable
						onPress={() => setOfferOpen(false)}
						className="py-4 rounded-xl bg-blue-500 items-center"
					>
						<Text className="text-white font-bold text-base">Fermer</Text>
					</Pressable>
				</Pressable>
			</Pressable>
		</Modal>
	);
}
