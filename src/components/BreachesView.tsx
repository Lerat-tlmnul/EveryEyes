import React, { useState } from 'react';
import { DOCUMENTED_BREACHES } from '../data/breachCatalog';
import { Search, Database, ArrowRight, ShieldAlert, Filter } from 'lucide-react';

interface BreachesViewProps {
  onGoToSearch: () => void;
}

export const BreachesView: React.FC<BreachesViewProps> = ({ onGoToSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'DISCORD' | 'SNAPCHAT' | 'EMAIL' | 'IDENTITY'>('ALL');

  const filteredBreaches = DOCUMENTED_BREACHES.filter((b) => {
    const matchesFilter = 
      selectedFilter === 'ALL' ||
      (selectedFilter === 'DISCORD' && b.targetType === 'DISCORD') ||
      (selectedFilter === 'SNAPCHAT' && b.targetType === 'SNAPCHAT') ||
      (selectedFilter === 'EMAIL' && b.targetType === 'EMAIL') ||
      (selectedFilter === 'IDENTITY' && b.targetType === 'IDENTITY');

    const matchesSearch = 
      b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.attackVector.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-xs font-mono">
          <Database className="w-3.5 h-3.5" />
          <span>RÉPERTOIRE DES COMPROMISSIONS</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Bases de Données & Fuites Historiques
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Explorez les violations de données publiques et compilations cybercriminelles connues affectant Discord, Snapchat, les fournisseurs email et l'état civil.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une fuite (ex: Discord, Snapchat, COMB, Deezer...)"
            className="w-full pl-10 pr-4 h-12 bg-black/60 border border-white/10 rounded-2xl text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all"
          />
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {(['ALL', 'DISCORD', 'SNAPCHAT', 'EMAIL', 'IDENTITY'] as const).map((cat) => {
            const labels = {
              ALL: 'Toutes',
              DISCORD: 'Discord',
              SNAPCHAT: 'Snapchat',
              EMAIL: 'Email & Combos',
              IDENTITY: 'Identité Civile'
            };
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/10'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Breach cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBreaches.map((breach) => (
          <div 
            key={breach.id} 
            className="p-5 rounded-2xl liquid-glass-card border border-white/10 space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  {breach.service}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                  {breach.breachDate}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-amber-400 font-semibold">
                  {breach.recordsExposed}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400 text-[11px]">
                  {breach.attackVector}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {breach.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="flex flex-wrap gap-1.5">
                {breach.compromisedData.map((d, i) => (
                  <span key={i} className="text-[10px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-2 py-0.5 rounded-md">
                    {d}
                  </span>
                ))}
              </div>

              <button
                onClick={onGoToSearch}
                className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-xs text-zinc-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Vérifier mes identifiants dans cette fuite</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
