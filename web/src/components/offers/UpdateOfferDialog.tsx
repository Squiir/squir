import { OfferFormBody } from "@/components/offers/form/OfferFormBody";
import {
  type UpdateOfferFormData,
  type UpdateOfferFormInput,
  updateOfferSchema,
} from "@/components/offers/form/offer-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/image";
import { useUpdateOffer } from "@/hooks/offers/use-offers";
import { offerService } from "@/services/offer.service";
import type { Offer, PromotionRule, UpdateOfferInput } from "@/types/offer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpdateOfferDialogProps {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
}

export function UpdateOfferDialog({ open, onClose, offer }: UpdateOfferDialogProps) {
  const [hasPromotion, setHasPromotion] = useState(false);
  const [promotionType, setPromotionType] = useState<PromotionRule["type"] | "">("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const updateOffer = useUpdateOffer();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<UpdateOfferFormInput, any, UpdateOfferFormData>({
    resolver: zodResolver(updateOfferSchema),
  });

  useEffect(() => {
    if (offer && open) {
      reset({
        name: offer.name,
        description: offer.description || "",
        originalPrice: offer.originalPrice,
        stock: offer.stock || undefined,
        validUntil: offer.validUntil ? new Date(offer.validUntil).toISOString().slice(0, 16) : "",
      });
      const initialImageUrl = offer.imageUrl || null;
      setUploadedImage(initialImageUrl);
      setPendingFile(null);

      if (offer.promotionRule && offer.promotionRule.type) {
        setHasPromotion(true);
        setPromotionType(offer.promotionRule.type);
        setValue("promotionRule", {
          type: offer.promotionRule.type,
          buyQuantity: offer.promotionRule.buyQuantity,
          getQuantity: offer.promotionRule.getQuantity,
          percentageOff: offer.promotionRule.percentageOff,
          amountOff: offer.promotionRule.amountOff,
        });
      }
    }
  }, [offer, open, reset, setValue]);

  useEffect(() => {
    return () => {
      if (uploadedImage && uploadedImage.startsWith("blob:")) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("L'image est trop volumineuse (max 5Mo)");
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Format d'image non supporté (JPG, PNG, WEBP)");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPendingFile(file);
    setUploadedImage(previewUrl);
  };

  const onSubmit = async (data: UpdateOfferFormData) => {
    if (!offer) return;

    try {
      let finalImageUrl = uploadedImage;

      if (pendingFile) {
        try {
          finalImageUrl = await offerService.uploadOfferImage(pendingFile);
        } catch (error) {
          console.error("Failed to upload image:", error);
          toast.error("Échec de l'upload de l'image");
          return;
        }
      }

      let validUntilValue: string | undefined = undefined;
      if (data.validUntil && data.validUntil.trim() !== "") {
        validUntilValue = new Date(data.validUntil).toISOString();
      }

      const input: UpdateOfferInput = {
        name: data.name,
        description: data.description || null,
        originalPrice: data.originalPrice,
        stock: data.stock,
        imageUrl: finalImageUrl,
        validUntil: validUntilValue,
        promotionRule: hasPromotion && data.promotionRule ? data.promotionRule : null,
      };

      await updateOffer.mutateAsync({ id: offer.id, input });
      toast.success("Offre mise à jour avec succès");
      handleClose();
    } catch (error) {
      console.error("Failed to update offer:", error);
      toast.error("Échec de la mise à jour de l'offre");
    }
  };

  const handleClose = () => {
    reset();
    setHasPromotion(false);
    setPromotionType("");
    setUploadedImage(null);
    setPendingFile(null);
    onClose();
  };

  const handleRemoveImage = () => {
    setPendingFile(null);
    setUploadedImage(null);
  };
  if (!offer) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier l'offre</DialogTitle>
          <DialogDescription>
            Modifiez les informations de votre offre. Les changements seront visibles immédiatement.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <OfferFormBody
            register={register}
            errors={errors}
            uploadedImage={uploadedImage}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
            hasPromotion={hasPromotion}
            onTogglePromotion={() => {
              setHasPromotion(!hasPromotion);
              if (hasPromotion) {
                setPromotionType("");
                setValue("promotionRule", undefined);
              }
            }}
            promotionType={promotionType}
            onPromotionTypeChange={(value) => {
              setPromotionType(value);
              setValue("promotionRule.type", value);
            }}
            isEditing
            imageInputId="image-upload-update"
          />

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || updateOffer.isPending}>
              {(isSubmitting || updateOffer.isPending) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
