import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMyId } from "@/hooks/user/use-my-id";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  barId: string;
  offerId: string;
  amount: number;
  onSuccess: () => void;
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    } else {
      onSuccess();
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full h-12 text-lg"
      >
        <span id="button-text">
          {isLoading ? <Loader2 className="animate-spin" /> : "Payer maintenant"}
        </span>
      </Button>
      {message && <div className="text-red-500 text-sm text-center mt-2">{message}</div>}
    </form>
  );
}

export function PaymentModal({
  open,
  onClose,
  barId,
  offerId,
  amount,
  onSuccess,
}: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState("");
  const { data: userData } = useMyId();
  const userId = userData?.id;

  useEffect(() => {
    if (open && barId && userId && offerId) {
      fetch("http://localhost:3000/stripe/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(amount * 100), barId, userId, offerId }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => console.error(err));
    }
  }, [open, barId, userId, offerId, amount]);

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#0f172a",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Paiement sécurisé</DialogTitle>
          <DialogDescription>Montant à régler : {amount.toFixed(2)}€</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {clientSecret && stripePromise ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm onSuccess={onSuccess} />
            </Elements>
          ) : (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
