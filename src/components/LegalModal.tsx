import React from 'react';
import { X, Scale, AlertOctagon, ShieldCheck, BookOpen } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl liquid-glass border border-white/15 p-5 sm:p-8 shadow-2xl text-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Bottom Sheet Grabber Pill */}
        <div className="sm:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Cadre Légal & Charte Déontologique
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400">
                Code Pénal Français & Règlement Général sur la Protection des Données
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white bg-white/5 active:scale-95 transition-all"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-5 text-sm text-zinc-300 leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs tracking-wide">
              <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
              INTERDICTION FORMELLE DE RECHERCHER UN TIERS
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Cet outil est strictement réservé au <strong>titulaire légitime</strong> dans un but de cyberhygiène personnelle. Toute utilisation des données d'un tiers sans son accord écrit préalable est illégale.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-zinc-400" />
              1. Dispositions du Code Pénal Français
            </h3>

            <div className="border border-white/10 rounded-2xl p-4 bg-black/40 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="font-semibold text-amber-300">Article 226-1</span>
                <span className="text-zinc-500">Atteinte à la vie privée</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Puni d'<strong>un an de prison et 45 000 € d'amende</strong> pour captation ou transmission de données personnelles sans le consentement de la personne.
              </p>
            </div>

            <div className="border border-white/10 rounded-2xl p-4 bg-black/40 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="font-semibold text-amber-300">Article 226-4-1</span>
                <span className="text-zinc-500">Usurpation d'identité</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Puni d'<strong>un an de prison et 15 000 € d'amende</strong> pour l'usage d'identifiants d'autrui troublant sa tranquillité.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              2. RGPD & Traitement Local sur Appareil
            </h3>
            <ul className="text-xs text-zinc-400 list-disc list-inside space-y-1">
              <li><strong>Zéro stockage distant :</strong> Analyse exécutée en mémoire vive sur votre iPhone.</li>
              <li><strong>Éphémère :</strong> Données purgées dès la fermeture du navigateur Safari.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold bg-white text-black hover:bg-zinc-200 active:scale-98 rounded-xl transition-all cursor-pointer"
          >
            J'ai compris et j'accepte
          </button>
        </div>

      </div>
    </div>
  );
};
