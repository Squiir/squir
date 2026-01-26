import { WalletQRCodeModal } from "@/components/wallet/WalletQRCodeModal";
import { WalletTicketCard } from "@/components/wallet/WalletTicketCard";
import { cn } from "@/lib/utils";
import { userService } from "@/services/user.service";
import type { WalletActiveItem, WalletResponse } from "@/types/wallet";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";

type Tab = "active" | "history";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [walletData, setWalletData] = useState<WalletResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<WalletActiveItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await userService.getWallet();
      setWalletData(data);
    } catch (error) {
      console.error("Failed to fetch wallet", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketClick = (item: WalletActiveItem) => {
    setSelectedTicket(item);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6">
        <div className="flex justify-center items-center gap-2 my-8">
          <QrCode className="w-6 h-6" />
          <h1 className="text-3xl font-black uppercase tracking-wide">Mes Tickets</h1>
        </div>

        <div className="flex justify-center border-b border-white/10">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("active")}
              className={cn(
                "pb-2 text-lg font-medium transition-colors relative",
                activeTab === "active" ? "text-primary" : "text-gray-500 hover:text-gray-800",
              )}
            >
              À venir
              {activeTab === "active" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={cn(
                "pb-2 text-lg font-medium transition-colors relative",
                activeTab === "history" ? "text-primary" : "text-gray-500 hover:text-gray-800",
              )}
            >
              Historique
              {activeTab === "history" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === "active" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {walletData?.active.length === 0 ? (
                  <p className="text-gray-500 text-center py-10 col-span-full">
                    Aucun billet à venir.
                  </p>
                ) : (
                  walletData?.active.map((item) => (
                    <WalletTicketCard
                      key={item.offerId}
                      item={item}
                      onClick={() => handleTicketClick(item)}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {walletData?.history.length === 0 ? (
                  <p className="text-gray-500 text-center py-10 col-span-full">Aucun historique.</p>
                ) : (
                  walletData?.history.map((item) => (
                    <WalletTicketCard key={item.id} item={item} isHistory />
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <WalletQRCodeModal open={modalOpen} onOpenChange={setModalOpen} item={selectedTicket} />
    </div>
  );
}
