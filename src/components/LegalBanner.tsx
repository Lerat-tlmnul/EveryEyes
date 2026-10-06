import React from 'react';
import { AlertTriangle, Scale, Lock } from 'lucide-react';

interface LegalBannerProps {
  onOpenDetails: () => void;
}

export const LegalBanner: React.FC<LegalBannerProps> = ({ onOpenDetails }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl liquid-glass-card border border-amber-500/30 p-4 sm:p-5 shadow-xl transition-all">
      {/* Subtle top reflective rim */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="flex items-start gap-3 sm:gap-3.5">
        <div className="mt-0.5 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-sm">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-xs sm:text-sm text-amber-300 tracking-wide">
              USAGE STRICTEMENT PERSONNEL
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-amber-400/90 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Art. 226-1 Code Pénal & RGPD
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <strong className="text-white font-semibold">
              Il est strictement interdit de chercher quelqu'un d'autre que soi.
            </strong>{' '}
            Cet outil d'auto-défense simule les recoupements qu'un attaquant peut faire sur vous. Toute surveillance ou doxxing d'un tiers est passible de sanctions pénales (1 an de prison et 45 000 € d'amende).
          </p>

          <div className="pt-1.5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Calcul 100% local sur votre iPhone</span>
            </div>
            
            <button
              onClick={onOpenDetails}
              className="min-h-[32px] inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer active:scale-95"
            >
              <Scale className="w-3 h-3" />
              <span>Consulter le cadre juridique & peines</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
