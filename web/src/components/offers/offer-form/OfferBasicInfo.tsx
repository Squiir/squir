import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import type { UpdateOfferFormInput } from "./offer-schema";

interface OfferBasicInfoProps<T extends UpdateOfferFormInput> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isEditing?: boolean;
}

export function OfferBasicInfo<T extends UpdateOfferFormInput>({
  register,
  errors,
  isEditing = false,
}: OfferBasicInfoProps<T>) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Informations de base</h3>

      <div className="space-y-2">
        <Label htmlFor="name">Titre de l'offre{isEditing ? "" : " *"}</Label>
        <Input id="name" {...register("name" as Path<T>)} placeholder="Ex: Pinte de bière" />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="originalPrice">Prix original (€){isEditing ? "" : " *"}</Label>
        <Input
          id="originalPrice"
          type="number"
          step="0.01"
          {...register("originalPrice" as Path<T>)}
          placeholder="10.00"
        />
        {errors.originalPrice && (
          <p className="text-sm text-destructive">{errors.originalPrice.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description{isEditing ? "" : " (optionnel)"}</Label>
        <Input
          id="description"
          {...register("description" as Path<T>)}
          placeholder="Décrivez votre offre (ingrédients, histoire...)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock disponible (optionnel)</Label>
        <Input
          id="stock"
          type="number"
          {...register("stock" as Path<T>)}
          placeholder="Laisser vide si illimité"
        />
        {errors.stock && (
          <p className="text-sm text-destructive">{errors.stock.message as string}</p>
        )}
        {!isEditing && (
          <p className="text-xs text-muted-foreground">
            Laissez vide si vous ne souhaitez pas limiter le stock
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="validUntil">Date d'expiration{isEditing ? "" : " (optionnel)"}</Label>
        <Input id="validUntil" type="datetime-local" {...register("validUntil" as Path<T>)} />
      </div>
    </div>
  );
}
