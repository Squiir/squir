import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/use-auth";
import { useLogin } from "@/hooks/auth/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  usernameOrEmail: z.string().min(1, "Username ou email requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { isLoggedIn } = useAuth();

  const { mutate: login, isPending } = useLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: FormValues) {
    login(values, {
      onSuccess: () => {
        toast.success("Connexion réussie");
      },
      onError: () => {
        toast.error("Identifiants incorrects");
      },
    });
  }

  if (isLoggedIn) return <Navigate to="/home" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Username ou email" {...form.register("usernameOrEmail")} />
            <Input type="password" placeholder="Mot de passe" {...form.register("password")} />

            <Button className="w-full" disabled={isPending}>
              {isPending ? "..." : "Se connecter"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Toujours pas de compte ?{" "}
              <a href="/register" className="underline hover:text-primary">
                S'inscrire
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
