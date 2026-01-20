import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/image";
import { useUpdateOffer } from "@/hooks/offers/use-offers";
import { offerService } from "@/services/offer.service";
import type { Offer, PromotionRule, UpdateOfferInput } from "@/types/offer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const promotionRuleSchema = z.object({
  type: z.enum(["BUY_X_GET_Y", "PERCENTAGE_OFF", "FIXED_AMOUNT_OFF"]),
  buyQuantity: z.number().int().min(1).optional(),
  getQuantity: z.number().int().min(1).optional(),
  percentageOff: z.number().min(0).max(100).optional(),
  amountOff: z.number().min(0).optional(),
});

const offerSchema = z.object({
  name: z.string().min(1, "Le nom est requis").optional(),
  originalPrice: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === "" || val === null) return undefined;
      const num = typeof val === "string" ? parseFloat(val) : val;
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val === undefined || val >= 0, {
      message: "Le prix doit être positif",
    }),
  stock: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === "" || val === null) return undefined;
      const num = typeof val === "string" ? parseInt(val, 10) : val;
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val === undefined || (Number.isInteger(val) && val >= 0), {
      message: "Le stock doit être un nombre entier positif",
    }),
  validUntil: z.string().optional().or(z.literal("")),
  promotionRule: promotionRuleSchema.optional(),
});

type OfferFormData = z.output<typeof offerSchema>;
type OfferFormInput = z.input<typeof offerSchema>;

interface UpdateOfferDialogProps {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
}

export function UpdateOfferDialog({ open, onClose, offer }: UpdateOfferDialogProps) {
  const [hasPromotion, setHasPromotion] = useState(false);
  const [promotionType, setPromotionType] = useState<PromotionRule["type"] | "">("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [previousImageUrl, setPreviousImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const updateOffer = useUpdateOffer();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<OfferFormInput, any, OfferFormData>({
    resolver: zodResolver(offerSchema),
  });

  useEffect(() => {
    if (offer && open) {
      reset({
        name: offer.name,
        originalPrice: offer.originalPrice,
        stock: offer.stock || undefined,
        validUntil: offer.validUntil ? new Date(offer.validUntil).toISOString().slice(0, 16) : "",
      });
      const initialImageUrl = offer.imageUrl || null;
      setUploadedImage(initialImageUrl);
      setPreviousImageUrl(initialImageUrl);

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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("L'image est trop volumineuse (max 5Mo)");
      return;
    }

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Format d'image non supporté (JPG, PNG, WEBP)");
      return;
    }

    setIsUploadingImage(true);
    try {
      const imageUrl = await offerService.uploadOfferImage(file);
      setUploadedImage(imageUrl);
      toast.success("Image téléchargée avec succès");
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Échec de l'upload de l'image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (data: OfferFormData) => {
    if (!offer) return;

    try {
      // Convert validUntil: empty string -> undefined, valid date -> ISO string
      let validUntilValue: string | undefined = undefined;
      if (data.validUntil && data.validUntil.trim() !== "") {
        validUntilValue = new Date(data.validUntil).toISOString();
      }

      const input: UpdateOfferInput = {
        name: data.name,
        originalPrice: data.originalPrice,
        stock: data.stock,
        imageUrl: uploadedImage || undefined,
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
    setPreviousImageUrl(null);
    onClose();
  };

  const handleRemoveImage = () => {
    // Just remove from state - image will be deleted from blob when offer is updated without imageUrl
    // or when offer is deleted entirely
    setUploadedImage(null);
    toast.success("Image supprimée");
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Informations de base</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Titre de l'offre</Label>
              <Input id="name" {...register("name")} placeholder="Ex: Pinte de bière" />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Prix original (€)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                {...register("originalPrice")}
                placeholder="10.00"
              />
              {errors.originalPrice && (
                <p className="text-sm text-destructive">{errors.originalPrice.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock disponible (optionnel)</Label>
              <Input
                id="stock"
                type="number"
                {...register("stock")}
                placeholder="Laisser vide si illimité"
              />
              {errors.stock && <p className="text-sm text-destructive">{errors.stock.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Date d'expiration</Label>
              <Input id="validUntil" type="datetime-local" {...register("validUntil")} />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image de l'offre</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploadingImage}
                  onClick={() => document.getElementById("image-upload-update")?.click()}
                >
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadedImage ? "Changer l'image" : "Ajouter une image"}
                    </>
                  )}
                </Button>
                <input
                  id="image-upload-update"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {uploadedImage && (
                  <div className="flex items-center gap-2">
                    <div className="relative w-16 h-16">
                      <img
                        src={uploadedImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={handleRemoveImage}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Promotion Rules */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Règles de promotion</h3>
              <Button
                type="button"
                variant={hasPromotion ? "destructive" : "outline"}
                size="sm"
                onClick={() => {
                  setHasPromotion(!hasPromotion);
                  if (hasPromotion) {
                    setPromotionType("");
                    setValue("promotionRule", undefined);
                  }
                }}
              >
                {hasPromotion ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Retirer
                  </>
                ) : (
                  "Ajouter une promotion"
                )}
              </Button>
            </div>

            {hasPromotion && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Type de promotion</Label>
                  <Select
                    value={promotionType}
                    onValueChange={(value) => {
                      setPromotionType(value as PromotionRule["type"]);
                      setValue("promotionRule.type", value as PromotionRule["type"]);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUY_X_GET_Y">Achetez X, obtenez Y</SelectItem>
                      <SelectItem value="PERCENTAGE_OFF">Réduction en pourcentage</SelectItem>
                      <SelectItem value="FIXED_AMOUNT_OFF">Réduction fixe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {promotionType === "BUY_X_GET_Y" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buyQuantity">Quantité à acheter</Label>
                      <Input
                        id="buyQuantity"
                        type="number"
                        {...register("promotionRule.buyQuantity", {
                          valueAsNumber: true,
                        })}
                        placeholder="2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="getQuantity">Quantité offerte</Label>
                      <Input
                        id="getQuantity"
                        type="number"
                        {...register("promotionRule.getQuantity", {
                          valueAsNumber: true,
                        })}
                        placeholder="1"
                      />
                    </div>
                  </div>
                )}

                {promotionType === "PERCENTAGE_OFF" && (
                  <div className="space-y-2">
                    <Label htmlFor="percentageOff">Pourcentage de réduction (%)</Label>
                    <Input
                      id="percentageOff"
                      type="number"
                      step="0.01"
                      max="100"
                      {...register("promotionRule.percentageOff", {
                        valueAsNumber: true,
                      })}
                      placeholder="20"
                    />
                  </div>
                )}

                {promotionType === "FIXED_AMOUNT_OFF" && (
                  <div className="space-y-2">
                    <Label htmlFor="amountOff">Montant de réduction (€)</Label>
                    <Input
                      id="amountOff"
                      type="number"
                      step="0.01"
                      {...register("promotionRule.amountOff", {
                        valueAsNumber: true,
                      })}
                      placeholder="5.00"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
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
