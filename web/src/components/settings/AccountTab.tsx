import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useDeleteAccount } from "@/hooks/user/use-delete-account";
import { useMe } from "@/hooks/user/use-me";
import { useUpdateUsername } from "@/hooks/user/use-update-username";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const usernameSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit faire au moins 3 caractères"),
});

export default function AccountTab() {
  const { data: user } = useMe();
  const updateUsernameMutation = useUpdateUsername();
  const deleteAccountMutation = useDeleteAccount();

  const usernameForm = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: user?.username || "" },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Identité</CardTitle>
          <CardDescription>Modifiez votre nom d'affichage public.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="username-form"
            onSubmit={usernameForm.handleSubmit((d) => updateUsernameMutation.mutate(d.username))}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input id="username" {...usernameForm.register("username")} />
              {usernameForm.formState.errors.username && (
                <p className="text-sm text-red-500">
                  {usernameForm.formState.errors.username.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="px-6 py-2">
          <Button form="username-form" disabled={updateUsernameMutation.isPending}>
            {updateUsernameMutation.isPending ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-red-200 dark:border-red-900/50">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Zone Danger</CardTitle>
          <CardDescription>
            La suppression de votre compte est irréversible. Toutes vos données seront effacées.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Cette action entraînera la perte définitive de vos accès et de votre historique.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="px-6 py-4 flex justify-end">
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
                deleteAccountMutation.mutate();
              }
            }}
            disabled={deleteAccountMutation.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer mon compte
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
