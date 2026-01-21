import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import type { ChangeEvent } from "react";

interface OfferImageUploadProps {
  uploadedImage: string | null;
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  inputId?: string;
  isUploading?: boolean;
}

export function OfferImageUpload({
  uploadedImage,
  onImageUpload,
  onRemoveImage,
  inputId = "image-upload",
  isUploading = false,
}: OfferImageUploadProps) {
  return (
    <div className="space-y-2">
      <Label>Image de l'offre (optionnel)</Label>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={() => document.getElementById(inputId)?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploadedImage ? "Changer l'image" : "Choisir une image"}
        </Button>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageUpload}
        />
        {uploadedImage && (
          <div className="flex items-center gap-2">
            <div className="relative w-16 h-16">
              <img
                src={uploadedImage}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={onRemoveImage}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
