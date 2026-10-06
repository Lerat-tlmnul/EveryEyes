import React from 'react';
import { Home, Search, Database, Sparkles, Tag } from 'lucide-react';

export type AppNavTab = 'home' | 'search' | 'breaches' | 'pricing';

interface BottomNavProps {
  activeTab: AppNavTab;
  onSelectTab: (tab: AppNavTab) => void;
  hasActiveReport?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  hasActiveReport = false
}) => {
  const navItems: { id: AppNavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'search', label: 'Recherche', icon: Search, badge: hasActiveReport ? 'Rapport' : undefined },
    { id: 'breaches', label: 'Bases Fuites', icon: Database },
    { id: 'pricing', label: 'Plans & Tarifs', icon: Tag, badge: 'Gratuit' },
  ];

  return (
    <nav 
      aria-label="Navigation principale"
      className="fixed bottom-0 inset-x-0 z-50 pointer-events-auto pb-safe"
    >
      <div className="max-w-md mx-auto px-4 pb-2 sm:pb-3">
        <div className="liquid-glass-dock rounded-full p-1.5 flex items-center justify-around shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-white/15">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative flex flex-col items-center justify-center min-h-[46px] min-w-[64px] flex-1 py-1 rounded-full text-xs transition-all active:scale-95 cursor-pointer select-none ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-3 text-[9px] font-mono px-1 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-black' : 'font-normal'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-black" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
