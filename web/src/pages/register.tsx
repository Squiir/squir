import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/use-auth";
import { useRegister } from "@/hooks/auth/use-register";
import { authService } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  username: z.string().min(3, "3 caractères minimum").max(30, "30 caractères maximum"),
  password: z.string().min(8, "8 caractères minimum"),
  birthDate: z.string().min(1, "Date de naissance requise"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type FormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { isLoggedIn } = useAuth();
  const { mutate: register, isPending } = useRegister();
  const [step, setStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onNext = async () => {
    const valid = await form.trigger(["email", "username", "password", "birthDate"]);
    if (valid) {
      const username = form.getValues("username");
      const email = form.getValues("email");
      const birthDate = form.getValues("birthDate");
      try {
        const usernameAvailable = await authService.checkUsername(username);
        const emailAvailable = await authService.checkEmail(email);
        if (!usernameAvailable) {
          form.setError("username", { type: "manual", message: "Nom d'utilisateur déjà utilisé" });
          toast.error("Nom d'utilisateur déjà utilisé");
          return;
        }
        if (!emailAvailable) {
          form.setError("email", { type: "manual", message: "Email déjà utilisé" });
          toast.error("Email déjà utilisé");
          return;
        }
        if (new Date(birthDate).getTime() > new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000) {
          form.setError("birthDate", {
            type: "manual",
            message: "Vous devez avoir au moins 18 ans",
          });
          toast.error("Vous devez avoir au moins 18 ans");
          return;
        }
        setStep(2);
      } catch (err) {
        console.error(err);
        toast.error("Impossible de vérifier la disponibilité des informations");
      }
    }
  };

  const onSubmit = (values: FormValues) => {
    register(values, {
      onSuccess: () => {
        toast.success("Compte créé avec succès !");
      },
      onError: (err) => {
        console.error(err);
        toast.error("Erreur lors de l'inscription");
      },
    });
  };

  if (isLoggedIn) return <Navigate to="/home" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm relative">
        {step === 2 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-8 w-8"
            onClick={() => setStep(1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Créer un compte" : "Infos personnelles"}{" "}
            <span className="text-sm font-normal text-muted-foreground ml-2">({step}/2)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Input placeholder="Email" type="email" {...form.register("email")} />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input placeholder="Nom d'utilisateur" {...form.register("username")} />
                  {form.formState.errors.username && (
                    <p className="text-destructive text-xs">
                      {form.formState.errors.username.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Mot de passe"
                    type="password"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-destructive text-xs">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium pl-1 text-muted-foreground">
                    Date de naissance
                  </label>
                  <Input type="date" {...form.register("birthDate")} />
                  {form.formState.errors.birthDate && (
                    <p className="text-destructive text-xs">
                      {form.formState.errors.birthDate.message}
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
            )}

            {step === 2 && (
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
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
