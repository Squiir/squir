import { RegisterCredentials } from "@/components/auth/register/RegisterCredentials";
import { RegisterPersonalInfo } from "@/components/auth/register/RegisterPersonalInfo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            {step === 1 && <RegisterCredentials form={form} onNext={onNext} />}
            {step === 2 && <RegisterPersonalInfo form={form} isPending={isPending} />}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
