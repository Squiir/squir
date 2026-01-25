import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PromotionRule } from "@/types/offer";
import { X } from "lucide-react";
import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import type { UpdateOfferFormInput } from "./offer-schema";

interface OfferPromotionRulesProps<T extends UpdateOfferFormInput> {
  hasPromotion: boolean;
  onTogglePromotion: () => void;
  promotionType: PromotionRule["type"] | "";
  onPromotionTypeChange: (value: PromotionRule["type"]) => void;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export function OfferPromotionRules<T extends UpdateOfferFormInput>({
  hasPromotion,
  onTogglePromotion,
  promotionType,
  onPromotionTypeChange,
  register,
  errors,
}: OfferPromotionRulesProps<T>) {
  const promotionErrors = errors.promotionRule as any;

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Règles de promotion</h3>
        <Button
          type="button"
          variant={hasPromotion ? "destructive" : "outline"}
          size="sm"
          onClick={onTogglePromotion}
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
              onValueChange={(val) => onPromotionTypeChange(val as PromotionRule["type"])}
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
                  {...register("promotionRule.buyQuantity" as Path<T>, {
                    valueAsNumber: true,
                  })}
                  placeholder="2"
                />
                {promotionErrors?.buyQuantity && (
                  <p className="text-sm text-destructive">{promotionErrors.buyQuantity.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="getQuantity">Quantité offerte</Label>
                <Input
                  id="getQuantity"
                  type="number"
                  {...register("promotionRule.getQuantity" as Path<T>, {
                    valueAsNumber: true,
                  })}
                  placeholder="1"
                />
                {promotionErrors?.getQuantity && (
                  <p className="text-sm text-destructive">{promotionErrors.getQuantity.message}</p>
                )}
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
                {...register("promotionRule.percentageOff" as Path<T>, {
                  valueAsNumber: true,
                })}
                placeholder="20"
              />
              {promotionErrors?.percentageOff && (
                <p className="text-sm text-destructive">{promotionErrors.percentageOff.message}</p>
              )}
            </div>
          )}

          {promotionType === "FIXED_AMOUNT_OFF" && (
            <div className="space-y-2">
              <Label htmlFor="amountOff">Montant de réduction (€)</Label>
              <Input
                id="amountOff"
                type="number"
                step="0.01"
                {...register("promotionRule.amountOff" as Path<T>, {
                  valueAsNumber: true,
                })}
                placeholder="5.00"
              />
              {promotionErrors?.amountOff && (
                <p className="text-sm text-destructive">{promotionErrors.amountOff.message}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
