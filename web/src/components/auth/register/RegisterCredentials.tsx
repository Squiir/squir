import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RegisterFormValues } from "@/types/register";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<RegisterFormValues>;
  onNext: () => void;
}

export function RegisterCredentials({ form, onNext }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Input placeholder="Email" type="email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-destructive text-xs">
            {form.formState.errors.email.message as string}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input placeholder="Nom d'utilisateur" {...form.register("username")} />
        {form.formState.errors.username && (
          <p className="text-destructive text-xs">
            {form.formState.errors.username.message as string}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input placeholder="Mot de passe" type="password" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="text-destructive text-xs">
            {form.formState.errors.password.message as string}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium pl-1 text-muted-foreground">Date de naissance</label>
        <Input type="date" {...form.register("birthDate")} />
        {form.formState.errors.birthDate && (
          <p className="text-destructive text-xs">
            {form.formState.errors.birthDate.message as string}
          </p>
        )}
      </div>

      <Button type="button" className="w-full" onClick={onNext}>
        Suivant
      </Button>

      <div className="text-center text-sm text-muted-foreground mt-2">
        Déjà un compte ?{" "}
        <a href="/login" className="underline hover:text-primary">
          Se connecter
        </a>
      </div>
    </>
  );
}
