import { OfferFormBody } from "@/components/offers/offer-form/OfferFormBody";
import {
  type OfferFormData,
  type OfferFormInput,
  offerSchema,
} from "@/components/offers/offer-form/offer-schema";
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
import { useCreateOffer } from "@/hooks/offers/use-offers";
import { offerService } from "@/services/offer.service";
import type { CreateOfferInput, PromotionRule } from "@/types/offer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateOfferDialogProps {
  open: boolean;
  onClose: () => void;
  barId: string;
}

export function CreateOfferDialog({ open, onClose, barId }: CreateOfferDialogProps) {
  const [hasPromotion, setHasPromotion] = useState(false);
  const [promotionType, setPromotionType] = useState<PromotionRule["type"] | "">("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const createOffer = useCreateOffer();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<OfferFormInput, any, OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      name: "",
      description: "",
      originalPrice: 0,
      stock: undefined,
      validUntil: "",
    },
  });

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

  const handleRemoveImage = () => {
    setPendingFile(null);
    setUploadedImage(null);
  };

  const onSubmit = async (data: OfferFormData) => {
    try {
      if (data.originalPrice === undefined) {
        toast.error("Le prix est requis");
        return;
      }

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

      const cleanedData = {
        ...data,
        originalPrice: data.originalPrice,
        stock: data.stock !== undefined ? data.stock : undefined,
      };

      const input: CreateOfferInput = {
        name: cleanedData.name!,
        description: cleanedData.description || undefined,
        originalPrice: cleanedData.originalPrice!,
        barId,
        stock: cleanedData.stock,
        imageUrl: finalImageUrl || undefined,
        validUntil: cleanedData.validUntil || undefined,
        promotionRule:
          hasPromotion && cleanedData.promotionRule ? cleanedData.promotionRule : undefined,
      };

      await createOffer.mutateAsync(input);
      reset();
      setHasPromotion(false);
      setPromotionType("");
      setUploadedImage(null);
      setPendingFile(null);
      onClose();
    } catch (error) {
      console.error("Failed to create offer:", error);
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle offre</DialogTitle>
          <DialogDescription>
            Remplissez les informations de votre offre. Elle sera visible immédiatement dans le feed
            Discovery.
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
          />

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || createOffer.isPending}>
              {(isSubmitting || createOffer.isPending) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Créer l'offre
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
