import { OfferBasicInfo } from "@/components/offers/offer-form/OfferBasicInfo";
import { OfferImageUpload } from "@/components/offers/offer-form/OfferImageUpload";
import { OfferPromotionRules } from "@/components/offers/offer-form/OfferPromotionRules";
import type { PromotionRule } from "@/types/offer";
import type { ChangeEvent } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UpdateOfferFormInput } from "./offer-schema";

interface OfferFormBodyProps<T extends UpdateOfferFormInput> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  uploadedImage: string | null;
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  hasPromotion: boolean;
  onTogglePromotion: () => void;
  promotionType: PromotionRule["type"] | "";
  onPromotionTypeChange: (value: PromotionRule["type"]) => void;
  isEditing?: boolean;
  imageInputId?: string;
  isUploadingImage?: boolean;
}

export function OfferFormBody<T extends UpdateOfferFormInput>({
  register,
  errors,
  uploadedImage,
  onImageUpload,
  onRemoveImage,
  hasPromotion,
  onTogglePromotion,
  promotionType,
  onPromotionTypeChange,
  isEditing = false,
  imageInputId = "image-upload",
}: OfferFormBodyProps<T>) {
  return (
    <div className="space-y-6">
      <OfferBasicInfo register={register} errors={errors} isEditing={isEditing} />

      <OfferImageUpload
        uploadedImage={uploadedImage}
        onImageUpload={onImageUpload}
        onRemoveImage={onRemoveImage}
        inputId={imageInputId}
      />

      <OfferPromotionRules
        hasPromotion={hasPromotion}
        onTogglePromotion={onTogglePromotion}
        promotionType={promotionType}
        onPromotionTypeChange={onPromotionTypeChange}
        register={register}
        errors={errors}
      />
    </div>
  );
}
