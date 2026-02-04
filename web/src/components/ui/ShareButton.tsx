import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  path: string;
  className?: string;
}

export const ShareButton = ({ path, className }: ShareButtonProps) => {
  const { shareUrl } = useShare();

  return (
    <Button
      onClick={() => shareUrl(path)}
      className={cn(
        "fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90",
        className,
      )}
      size="icon"
      aria-label="Partager"
    >
      <Share2 className="h-6 w-6 text-white" />
    </Button>
  );
};
