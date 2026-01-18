import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/image";
import { useUpdateStatus } from "@/hooks/user/use-update-status";
import { useUploadAvatar } from "@/hooks/user/use-upload-avatar";
import { getCroppedImg } from "@/lib/canvasUtils";
import type { User } from "@/types/user";
import { ChevronRight, Image as ImageIcon, Loader2, Pen, Star, Trash, Upload } from "lucide-react";
import { useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { toast } from "sonner";

interface Props {
  user?: User;
}

export function ProfileHeader({ user }: Props) {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState("");

  const { mutate: uploadAvatar, isPending: isAvatarPending } = useUploadAvatar();
  const { mutate: updateStatus, isPending: isStatusPending } = useUpdateStatus();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error("L'image est trop volumineuse (max 5Mo)");
        return;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(selectedFile.type)) {
        toast.error("Format d'image non supporté (JPG, PNG, WEBP)");
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result?.toString() || ""));
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAvatarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageSrc || !croppedAreaPixels) {
      toast.error("Veuillez sélectionner et redimensionner une image");
      return;
    }

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImage) throw new Error("Erreur lors du traitement de l'image");

      uploadAvatar(croppedImage, {
        onSuccess: () => {
          toast.success("Avatar mis à jour");
          handleCloseAvatar();
        },
        onError: () => toast.error("Erreur lors de la mise à jour de l'avatar"),
      });
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la création de l'image");
    }
  };

  const handleCloseAvatar = () => {
    setIsAvatarOpen(false);
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatus(status, {
      onSuccess: () => {
        toast.success("Statut mis à jour");
        setIsStatusOpen(false);
        setStatus("");
      },
      onError: () => toast.error("Erreur lors de la mise à jour du statut"),
    });
  };

  const openStatusDialog = () => {
    setStatus(user?.status || "");
    setIsStatusOpen(true);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => setIsAvatarOpen(true)}>
              <Avatar className="w-16 h-16 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                <AvatarImage src={user?.avatarUrl ?? undefined} className="object-cover" />
                <AvatarFallback className="text-lg font-medium">
                  {user?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-all duration-200 backdrop-blur-[1px]">
                <Pen className="text-white w-5 h-5 drop-shadow-md" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-semibold">{user?.username ?? "—"}</p>

              <div
                className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 group"
                onClick={openStatusDialog}
              >
                {user?.status ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{user.status}</span>
                    <Pen className="w-4 h-4 opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-muted transition-colors border border-transparent hover:border-border">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Ajoute ton statut</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isAvatarOpen} onOpenChange={(open) => !open && handleCloseAvatar()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier l'avatar</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {!imageSrc ? (
              <div
                className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50 transition-colors rounded-xl p-8 text-center cursor-pointer flex flex-col items-center gap-3 group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-4 rounded-full bg-muted group-hover:bg-background transition-colors">
                  <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">Cliquez pour importer</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP (Max 5Mo)</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative w-full h-64 bg-black/5 rounded-xl overflow-hidden ring-1 ring-border">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={(_, croppedAreaPixels) =>
                      setCroppedAreaPixels(croppedAreaPixels)
                    }
                    onZoomChange={setZoom}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    <span>Zoom</span>
                    <span>{Math.round(zoom * 100)}%</span>
                  </div>
                  <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={(value) => setZoom(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImageSrc(null);
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Remplacer
                  </Button>
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={handleCloseAvatar} disabled={isAvatarPending}>
                Annuler
              </Button>
              <Button onClick={handleAvatarSubmit} disabled={!imageSrc || isAvatarPending}>
                {isAvatarPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleStatusSubmit} className="space-y-4">
            <Input
              placeholder="Votre statut..."
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground text-right">{status.length}/50</p>
            <Button type="submit" disabled={isStatusPending} className="w-full">
              {isStatusPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
