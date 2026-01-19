import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/image";
import { useUploadAvatar } from "@/hooks/user/use-upload-avatar";
import { getCroppedImg } from "@/lib/canvasUtils";
import { Image as ImageIcon, Loader2, Trash, Upload } from "lucide-react";
import { useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AvatarUploadDialog({ isOpen, onOpenChange }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadAvatar, isPending } = useUploadAvatar();

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setTimeout(() => {
        setImageSrc(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setCroppedAreaPixels(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 200);
    }
  };

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

  const handleSubmit = async () => {
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
          handleOpenChange(false);
        },
        onError: () => toast.error("Erreur lors de la mise à jour de l'avatar"),
      });
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la création de l'image");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                  onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
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
                  onClick={() => setImageSrc(null)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
                <Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
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
            <Button variant="ghost" onClick={() => handleOpenChange(false)} disabled={isPending}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={!imageSrc || isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
