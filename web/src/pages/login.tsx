import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLogin } from "@/hooks/auth/use-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/auth/use-auth";

const schema = z.object({
  username: z.string().min(1, "Username requis"),
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
            <Input placeholder="Username" {...form.register("username")} />
            <Input
              type="password"
              placeholder="Mot de passe"
              {...form.register("password")}
            />

            <Button className="w-full" disabled={isPending}>
              {isPending ? "..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
