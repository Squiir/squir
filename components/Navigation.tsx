import React from 'react';
import { Map, QrCode, Users, User } from 'lucide-react';
import { ViewMode } from '../types';

interface NavigationProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
    { id: 'MAP', icon: <Map size={24} />, label: 'Carte' },
    { id: 'LOYALTY', icon: <QrCode size={24} />, label: 'Fidélité' },
    { id: 'SOCIAL', icon: <Users size={24} />, label: 'Club' },
    { id: 'PROFILE', icon: <User size={24} />, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-panel border-t border-white/10 pb-6 pt-3 px-6 flex justify-between items-end z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            currentView === item.id 
              ? 'text-amber-400 transform -translate-y-1' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`${currentView === item.id ? 'neon-glow rounded-full p-1 bg-amber-400/10' : ''}`}>
            {item.icon}
          </div>
          <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;