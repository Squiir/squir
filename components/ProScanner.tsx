import React, { useState, useEffect } from 'react';
import { Camera, X, CheckCircle, Zap } from 'lucide-react';

interface ProScannerProps {
  onExit: () => void;
}

const ProScanner: React.FC<ProScannerProps> = ({ onExit }) => {
  const [scanning, setScanning] = useState(true);
  const [success, setSuccess] = useState(false);

  // Simulate scanning process
  useEffect(() => {
    if (scanning && !success) {
      const timer = setTimeout(() => {
        setScanning(false);
        setSuccess(true);
      }, 3000); // Fake scan after 3s
      return () => clearTimeout(timer);
    }
  }, [scanning, success]);

  const resetScan = () => {
    setSuccess(false);
    setScanning(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-black/50 backdrop-blur-md absolute top-0 w-full z-20">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <Zap className="text-amber-400 fill-amber-400" size={20} />
          SQUIR <span className="text-slate-400 font-normal">PRO</span>
        </h2>
        <button 
          onClick={onExit}
          className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20"
        >
          <X size={24} />
        </button>
      </div>

      {/* Camera Area */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden">
        {success ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-900/20 z-10 p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
               <CheckCircle size={48} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Point Ajouté !</h3>
            <p className="text-slate-300 mb-8">+1 point pour Alex au "Le Perchoir"</p>
            <button 
              onClick={resetScan}
              className="w-full bg-white text-emerald-900 font-bold py-4 rounded-xl hover:bg-emerald-50"
            >
              Scanner le suivant
            </button>
          </div>
        ) : (
          <>
             {/* Simulated Camera Feed Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale" />
             
             {/* Scanning Frame */}
             <div className="absolute inset-0 flex items-center justify-center p-10">
               <div className="w-64 h-64 border-2 border-amber-400/50 rounded-3xl relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-amber-400 -mt-1 -ml-1 rounded-tl-xl"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-amber-400 -mt-1 -mr-1 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-amber-400 -mb-1 -ml-1 rounded-bl-xl"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-amber-400 -mb-1 -mr-1 rounded-br-xl"></div>
                  
                  {/* Scanning Line Animation */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-[scan_2s_ease-in-out_infinite]"></div>
               </div>
             </div>
             <p className="absolute bottom-20 left-0 right-0 text-center text-slate-300 text-sm animate-pulse">
               Recherche de QR Code client...
             </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProScanner;