import { useState } from "react";

export default function Onboarding() {
  const [loading, setLoading] = useState(false);
  const [barId, setBarId] = useState("");

  const handleConnect = async () => {
    if (!barId) {
      alert("Please enter a Bar ID (simulated)");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/stripe/onboarding/${barId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshUrl: window.location.href,
          returnUrl: window.location.href + "?success=true",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Failed to start onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="p-6 pt-12 max-w-md mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-8">
          Onboarding
        </h1>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6">
          <p className="text-zinc-400">
            Connecter votre bar avec Stripe pour accepter les paiements et recevoir les retraits.
          </p>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-zinc-300">Bar ID (Debug)</label>
            <input
              type="text"
              value={barId}
              onChange={(e) => setBarId(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Enter Bar ID"
            />
          </div>

          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-xl py-4 active:scale-95 transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <span>Connecter avec Stripe</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
