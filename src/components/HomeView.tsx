import React from 'react';
import { Shield, Search, Database, Lock, Eye, AlertTriangle, ArrowRight, CheckCircle2, Gift } from 'lucide-react';

interface HomeViewProps {
  onGoToSearch: () => void;
  onGoToBreaches: () => void;
  onGoToPricing: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onGoToSearch,
  onGoToBreaches,
  onGoToPricing
}) => {
  return (
    <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-200">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>Plateforme d'Auto-Défense Numérique</span>
          <span className="text-zinc-600">·</span>
          <span className="text-emerald-400 font-mono font-medium">100% Gratuit</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Visualisez tout ce que vos fuites de données révèlent sur vous
        </h1>

        <p className="text-xs sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Un pseudonyme Discord public, un compte Snapchat ou une adresse email suffisent souvent à un cybercriminel pour reconstituer votre identité civile complète et vos habitudes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onGoToSearch}
            className="w-full sm:w-auto min-h-[50px] px-6 py-3 rounded-2xl bg-white hover:bg-zinc-100 text-black font-semibold text-sm shadow-[0_12px_32px_rgba(255,255,255,0.18)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-black" />
            <span>Tester mes Identifiants Maintenant</span>
            <ArrowRight className="w-4 h-4 text-zinc-600" />
          </button>

          <button
            onClick={onGoToBreaches}
            className="w-full sm:w-auto min-h-[50px] px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Database className="w-4 h-4 text-zinc-400" />
            <span>Consulter les Bases Compromises</span>
          </button>
        </div>
      </div>

      {/* Live Counter / Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-center space-y-1">
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-white">3.2 Mrds</div>
          <div className="text-[11px] text-zinc-400">Identifiants (COMB)</div>
        </div>

        <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-center space-y-1">
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-amber-400">4.6 M</div>
          <div className="text-[11px] text-zinc-400">Comptes Snapchat API</div>
        </div>

        <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-center space-y-1">
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-indigo-400">760 000</div>
          <div className="text-[11px] text-zinc-400">Profils Discord.io</div>
        </div>

        <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/30 text-center space-y-1 bg-emerald-950/20">
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-400">0 €</div>
          <div className="text-[11px] text-emerald-300">100% Libre & Gratuit</div>
        </div>
      </div>

      {/* How Correlated OSINT Doxxing Works */}
      <div className="rounded-3xl liquid-glass border border-white/10 p-5 sm:p-8 space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
            MÉTHODOLOGIE D'ATTAQUE
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-white">
            Comment un attaquant relie-t-il vos comptes ?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold font-mono">
              <span className="w-5 h-5 rounded-full bg-white/10 text-center leading-5 text-[10px]">1</span>
              <span>Le Pivot du Pseudonyme</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Utiliser le même pseudonyme sur Discord et Snapchat permet de faire le pont instantanément entre vos passions publiques et vos cercles d'amis intimes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold font-mono">
              <span className="w-5 h-5 rounded-full bg-white/10 text-center leading-5 text-[10px]">2</span>
              <span>L'Ancre de l'Email</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Si votre email contient votre nom, chaque violation de données sur un forum ou site tiers révèle automatiquement votre identité civile complète.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold font-mono">
              <span className="w-5 h-5 rounded-full bg-white/10 text-center leading-5 text-[10px]">3</span>
              <span>L'Exploitation</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Une fois corrélées, ces données permettent le spear-phishing ciblé, les tentatives de credential stuffing ou le chantage au doxxing.
            </p>
          </div>
        </div>
      </div>

      {/* Free Access Callout */}
      <div className="p-5 sm:p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-sm sm:text-base text-emerald-300">
            Tous les outils et modèles juridiques sont 100% gratuits
          </h3>
          <p className="text-xs text-zinc-300">
            Aucun compte à créer, aucune carte requise. Utilisez la suite d'auto-défense librement.
          </p>
        </div>

        <button
          onClick={onGoToPricing}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs active:scale-95 transition-all cursor-pointer shrink-0"
        >
          Découvrir nos Engagements
        </button>
      </div>

    </div>
  );
};
