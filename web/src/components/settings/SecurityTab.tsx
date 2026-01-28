import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userService } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z.string().min(6, "Le nouveau mot de passe doit faire au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function SecurityTab() {
  const updatePasswordMutation = useMutation({
    mutationFn: userService.updatePassword,
    onSuccess: () => {
      toast.success("Mot de passe mis à jour");
    },
    onError: () => toast.error("Erreur (vérifiez votre ancien mot de passe)"),
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mot de passe</CardTitle>
        <CardDescription>
          Mettez à jour votre mot de passe pour sécuriser votre compte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="password-form"
          onSubmit={passwordForm.handleSubmit((d) =>
            updatePasswordMutation.mutate({
              newPassword: d.newPassword,
              oldPassword: d.oldPassword,
            }),
          )}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Mot de passe actuel</Label>
            <Input id="oldPassword" type="password" {...passwordForm.register("oldPassword")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input id="newPassword" type="password" {...passwordForm.register("newPassword")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...passwordForm.register("confirmPassword")}
            />
            {passwordForm.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="px-6 py-2">
        <Button form="password-form" disabled={updatePasswordMutation.isPending}>
          {updatePasswordMutation.isPending ? "Mise à jour..." : "Mettre à jour le mot de passe"}
        </Button>
      </CardFooter>
    </Card>
  );
}
