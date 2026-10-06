import React from 'react';
import { FileText, Scale } from 'lucide-react';

interface HeaderProps {
  onOpenLegalModal: () => void;
  onOpenRgpdModal: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLegalModal, onOpenRgpdModal, onNavigateHome }) => {
  return (
    <header className="sticky top-0 z-40 w-full liquid-glass border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Emblem & Dynamic Island style status */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center space-x-2.5 sm:space-x-3 text-left cursor-pointer active:scale-98 transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-zinc-900/90 border border-white/15 flex items-center justify-center text-white shadow-sm">
            {/* Vercel geometric triangle logo */}
            <svg
              className="w-4 h-4 fill-white"
              viewBox="0 0 1155 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M577.346 0L1154.69 1000H0L577.346 0Z" />
            </svg>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm tracking-tight text-white font-mono">LEAKTRACE</span>
              {/* Dynamic Island mini pill */}
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-300 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                iOS 27
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 hidden xs:inline truncate max-w-[200px] sm:max-w-none">
              Audit d'Empreinte Numérique
            </span>
          </div>
        </button>

        {/* Action buttons (min 44px touch targets on mobile) */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          
          <button
            onClick={onOpenRgpdModal}
            className="min-h-[40px] sm:min-h-[36px] flex items-center space-x-1.5 text-xs text-zinc-200 hover:text-white px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer"
            title="Générer une demande d'effacement RGPD"
            aria-label="Modèle RGPD"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Modèle RGPD</span>
            <span className="sm:hidden font-mono text-[11px]">RGPD</span>
          </button>

          <button
            onClick={onOpenLegalModal}
            className="min-h-[40px] sm:min-h-[36px] flex items-center space-x-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 px-3 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 active:scale-[0.97] transition-all cursor-pointer"
            aria-label="Cadre Légal"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Cadre Légal</span>
            <span className="sm:hidden font-mono text-[11px]">Lois</span>
          </button>
        </div>

      </div>
    </header>
  );
};
