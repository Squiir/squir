import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth/use-auth';
import { userService } from '@/services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Lock, Trash2, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const usernameSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit faire au moins 3 caractères"),
});

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Mot de passe actuel requis"),
  newPassword: z.string().min(6, "Le nouveau mot de passe doit faire au moins 6 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateUsernameMutation = useMutation({
    mutationFn: userService.updateUsername,
    onSuccess: () => {
      toast.success("Nom d'utilisateur mis à jour");
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: () => toast.error("Erreur lors de la mise à jour"),
  });

  const updatePasswordMutation = useMutation({
    mutationFn: userService.updatePassword,
    onSuccess: () => {
      toast.success("Mot de passe mis à jour");
    },
    onError: () => toast.error("Erreur (vérifiez votre ancien mot de passe)"),
  });

  const deleteAccountMutation = useMutation({
    mutationFn: userService.deleteMe,
    onSuccess: () => {
      toast.success("Compte supprimé avec succès");
      logout();
      navigate('/login');
    },
    onError: () => toast.error("Impossible de supprimer le compte"),
  });

  const usernameForm = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: user?.username || '' },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  return (
    <RequireAuth>
    <div className="min-h-screen pb-20">
      <DashboardHeader />

      <main className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-8">
            <TabsTrigger value="account" className="flex gap-2"><User size={16}/> Compte</TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2"><Lock size={16}/> Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">

            <Card>
              <CardHeader>
                <CardTitle>Identité</CardTitle>
                <CardDescription>Modifiez votre nom d'affichage public.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="username-form" onSubmit={usernameForm.handleSubmit((d) => updateUsernameMutation.mutate(d.username))} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input id="username" {...usernameForm.register('username')} />
                    {usernameForm.formState.errors.username && (
                      <p className="text-sm text-red-500">{usernameForm.formState.errors.username.message}</p>
                    )}
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button form="username-form" disabled={updateUsernameMutation.isPending}>
                  {updateUsernameMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
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
                    Cette action entraînera la perte définitive de vos accès pro et de votre historique.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="border-t border-red-100 dark:border-red-900/30 px-6 py-4 flex justify-end">
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
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
                <CardDescription>Mettez à jour votre mot de passe pour sécuriser votre compte.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="password-form" onSubmit={passwordForm.handleSubmit((d) => updatePasswordMutation.mutate(d))} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Mot de passe actuel</Label>
                    <Input id="oldPassword" type="password" {...passwordForm.register('oldPassword')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input id="newPassword" type="password" {...passwordForm.register('newPassword')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input id="confirmPassword" type="password" {...passwordForm.register('confirmPassword')} />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button form="password-form" disabled={updatePasswordMutation.isPending}>
                  {updatePasswordMutation.isPending ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
    </RequireAuth>
  );
}
