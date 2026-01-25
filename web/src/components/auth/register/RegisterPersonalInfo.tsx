import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Path, UseFormReturn } from "react-hook-form";

interface Props<T extends { firstName?: string; lastName?: string }> {
  form: UseFormReturn<T>;
  isPending: boolean;
  onNext?: () => void;
}

export function RegisterPersonalInfo<T extends { firstName?: string; lastName?: string }>({
  form,
  isPending,
  onNext,
}: Props<T>) {
  const handleClick = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Input placeholder="Prénom (optionnel)" {...form.register("firstName" as Path<T>)} />
      </div>
      <div className="space-y-2">
        <Input placeholder="Nom (optionnel)" {...form.register("lastName" as Path<T>)} />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type={onNext ? "button" : "submit"}
          onClick={onNext ? handleClick : undefined}
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "..." : onNext ? "Suivant" : "S'inscrire"}
        </Button>
      </div>
    </>
  );
}
