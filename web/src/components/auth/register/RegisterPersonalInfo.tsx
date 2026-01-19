import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RegisterFormValues } from "@/types/register";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<RegisterFormValues>;
  isPending: boolean;
}

export function RegisterPersonalInfo({ form, isPending }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Input placeholder="Prénom (optionnel)" {...form.register("firstName")} />
      </div>
      <div className="space-y-2">
        <Input placeholder="Nom (optionnel)" {...form.register("lastName")} />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "..." : "S'inscrire"}
        </Button>
      </div>
    </>
  );
}
