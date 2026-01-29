import { useLogout } from "@/hooks/auth/use-logout";
import { userService } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useDeleteAccount = () => {
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userService.deleteMe,
    onSuccess: () => {
      toast.success("Compte supprimé avec succès");
      logout();
      navigate("/login");
    },
    onError: () => toast.error("Impossible de supprimer le compte"),
  });
};
