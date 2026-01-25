import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RegisterProfessionalFormValues } from "@/types/register-professional";
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface RegisterEstablishmentInfoProps {
  register: UseFormRegister<RegisterProfessionalFormValues>;
  setValue: UseFormSetValue<RegisterProfessionalFormValues>;
  errors: FieldErrors<RegisterProfessionalFormValues>;
  isPending: boolean;
}

export function RegisterEstablishmentInfo({
  register,
  setValue,
  errors,
  isPending,
}: RegisterEstablishmentInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Informations du bar</h3>

      <div className="space-y-2">
        <Label htmlFor="barName">Nom du bar *</Label>
        <Input id="barName" {...register("barName")} placeholder="Ex: Le Comptoir" />
        {errors.barName && (
          <p className="text-sm text-destructive">{errors.barName.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="barAddress">Adresse complète *</Label>
        <Input
          id="barAddress"
          {...register("barAddress")}
          placeholder="Ex: 42 Rue de la Paix, 75002 Paris"
        />
        {errors.barAddress && (
          <p className="text-sm text-destructive">{errors.barAddress.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="arrondissement">Arrondissement *</Label>
        <Select onValueChange={(value) => setValue("arrondissement", parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un arrondissement" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
                {num === 1 ? "er" : "ème"} arrondissement
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.arrondissement && (
          <p className="text-sm text-destructive">{errors.arrondissement.message as string}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude *</Label>
          <Input
            id="latitude"
            type="number"
            step="0.000001"
            {...register("latitude", { valueAsNumber: true })}
            placeholder="48.8566"
          />
          {errors.latitude && (
            <p className="text-sm text-destructive">{errors.latitude.message as string}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude *</Label>
          <Input
            id="longitude"
            type="number"
            step="0.000001"
            {...register("longitude", { valueAsNumber: true })}
            placeholder="2.3522"
          />
          {errors.longitude && (
            <p className="text-sm text-destructive">{errors.longitude.message as string}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Création en cours..." : "Créer mon compte professionnel"}
      </button>
    </div>
  );
}
