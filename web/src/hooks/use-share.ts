import { toast } from "sonner";

export const useShare = () => {
  const shareUrl = (url: string) => {
    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;

    let fullUrl = url;
    if (!url.startsWith("http")) {
      const cleanBase = baseUrl.replace(/\/$/, "");
      const cleanPath = url.startsWith("/") ? url : `/${url}`;
      fullUrl = `${cleanBase}${cleanPath}`;
    }

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(fullUrl)
        .then(() => {
          toast.success("Lien copié !");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.error("Erreur lors de la copie du lien.");
        });
    } else {
      toast.error("Presse-papier non disponible.");
    }
  };

  return { shareUrl };
};
