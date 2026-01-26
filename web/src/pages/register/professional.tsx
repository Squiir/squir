import { RegisterEstablishmentInfo } from "@/components/auth/register/RegisterBarInfo";
import { RegisterCredentials } from "@/components/auth/register/RegisterCredentials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegisterProfessional } from "@/hooks/auth/use-register-professional";
import { authService } from "@/services/auth.service";
import {
  registerProfessionalSchema,
  type RegisterProfessionalFormValues,
} from "@/types/register-professional";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterProfessionalPage() {
  const { mutate: registerProfessional, isPending } = useRegisterProfessional();
  const [step, setStep] = useState(1);

  const form = useForm<RegisterProfessionalFormValues>({
    resolver: zodResolver(registerProfessionalSchema),
    mode: "onChange",
  });

  const onNextStep1 = async () => {
    const valid = await form.trigger(["email", "username", "password"]);
    if (valid) {
      const username = form.getValues("username");
      const email = form.getValues("email");
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
        setStep(2);
      } catch (err) {
        console.error(err);
        toast.error("Impossible de vérifier la disponibilité des informations");
      }
    }
  };

  const onSubmit = (values: RegisterProfessionalFormValues) => {
    registerProfessional(
      {
        ...values,
      },
      {
        onSuccess: (data) => {
          toast.success("Compte professionnel créé avec succès !");
          if (data.stripeOnboardingUrl) {
            window.location.href = data.stripeOnboardingUrl;
          } else {
            toast.error("Erreur: Lien Stripe manquant");
          }
        },
        onError: (err: AxiosError<any>) => {
          const messages = err.response?.data?.message;
          if (messages) {
            if (Array.isArray(messages)) {
              messages.forEach((msg: string) => toast.error(msg));
            } else {
              toast.error(messages);
            }
          } else {
            toast.error("Erreur lors de l'inscription");
          }
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm relative">
        {step === 2 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-8 w-8"
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <CardHeader>
          <CardTitle>
            {step === 1 && "Créer un compte professionnel"}
            {step === 2 && "Informations du bar"}
            <span className="text-sm font-normal text-muted-foreground ml-2">({step}/2)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <RegisterCredentials form={form} onNext={onNextStep1} showBirthDate={false} />
            )}
            {step === 2 && (
              <RegisterEstablishmentInfo
                register={form.register}
                setValue={form.setValue}
                errors={form.formState.errors}
                isPending={isPending}
              />
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
