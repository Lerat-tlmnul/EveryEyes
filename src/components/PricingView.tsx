import React from 'react';
import { Check, Shield, Sparkles, HeartHandshake, ArrowRight, Lock, Gift } from 'lucide-react';

interface PricingViewProps {
  onGoToSearch: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onGoToSearch }) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 text-xs font-mono">
          <Gift className="w-3.5 h-3.5" />
          <span>ACCÈS LIBRE & 100% GRATUIT</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          La sécurité de votre identité n'a pas de prix
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Nous croyons fermement que la protection de vos données personnelles et la défense contre le doxxing doivent être accessibles à tous. Tous nos plans sont entièrement gratuits, sans carte bancaire ni publicité.
        </p>
      </div>

      {/* Pricing Cards Grid (All 0 € Free) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Plan 1: Essentiel */}
        <div className="rounded-3xl liquid-glass border border-white/10 p-5 sm:p-6 space-y-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                PARTICULIER
              </span>
              <h2 className="text-lg font-bold text-white">
                Plan Découverte
              </h2>
              <p className="text-xs text-zinc-400">
                Pour vérifier rapidement un pseudonyme ou une adresse email.
              </p>
            </div>

            <div className="flex items-baseline gap-1 py-2 border-y border-white/5">
              <span className="text-3xl font-extrabold text-white">0 €</span>
              <span className="text-xs text-zinc-400 font-mono">/ pour toujours</span>
            </div>

            <ul className="text-xs text-zinc-300 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Audit d'un pseudo ou d'un email isolé</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Consultation des 10+ méga-bases de fuites</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Requêtes Google Dorks directes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zéro création de compte requise</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onGoToSearch}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-all active:scale-95 cursor-pointer"
          >
            Utiliser Gratuitement
          </button>
        </div>

        {/* Plan 2: Pro Défense (Featured) */}
        <div className="relative rounded-3xl liquid-glass border-2 border-emerald-500/40 p-5 sm:p-6 space-y-5 flex flex-col justify-between shadow-2xl bg-emerald-950/10">
          
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold font-mono uppercase tracking-wider">
            Recommandé · 100% Offert
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                CYBER-DÉFENSE
              </span>
              <h2 className="text-lg font-bold text-white">
                Plan Défense Intégrale
              </h2>
              <p className="text-xs text-zinc-400">
                La suite complète d'audit et de remédiation personnelle.
              </p>
            </div>

            <div className="flex items-baseline gap-1 py-2 border-y border-white/5">
              <span className="text-3xl font-extrabold text-white">0 €</span>
              <span className="text-xs text-emerald-400 font-mono">/ gratuit à vie</span>
            </div>

            <ul className="text-xs text-zinc-300 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Corrélation complète</strong> : Nom, Discord, Snap, Email</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Calcul de l'indice de doxxing (0-100)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Générateur de <strong>lettre RGPD Art. 17</strong> officiel</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Export illimité en <strong>Markdown & JSON</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Checklist de remédiation interactive</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onGoToSearch}
            className="w-full min-h-[46px] py-2.5 px-4 rounded-2xl bg-white text-black hover:bg-zinc-200 font-semibold text-xs shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Démarrer l'Audit Gratuit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Plan 3: Sensibilisation & Famille */}
        <div className="rounded-3xl liquid-glass border border-white/10 p-5 sm:p-6 space-y-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                FAMILLE & ENTOURAGE
              </span>
              <h2 className="text-lg font-bold text-white">
                Plan Sensibilisation
              </h2>
              <p className="text-xs text-zinc-400">
                Pour auditer et protéger les membres de votre famille.
              </p>
            </div>

            <div className="flex items-baseline gap-1 py-2 border-y border-white/5">
              <span className="text-3xl font-extrabold text-white">0 €</span>
              <span className="text-xs text-zinc-400 font-mono">/ open source</span>
            </div>

            <ul className="text-xs text-zinc-300 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guide de sécurisation Snapchat pour adolescents</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Protection Discord contre les grabbers de token</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Accès aux fiches pratiques CNIL & cyberdéfense</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Audits successifs illimités pour le foyer</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onGoToSearch}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-all active:scale-95 cursor-pointer"
          >
            Accéder Gratuitement
          </button>
        </div>

      </div>

      {/* Manifest banner: Why is it 100% Free? */}
      <div className="p-5 sm:p-6 rounded-3xl liquid-glass border border-white/10 space-y-3">
        <div className="flex items-center gap-2.5 text-white font-bold text-sm">
          <HeartHandshake className="w-5 h-5 text-emerald-400" />
          <span>Pourquoi notre plateforme est-elle 100% gratuite ?</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          À une époque où les violations de données massives exposent des milliards d'individus, la protection de la vie privée ne doit pas devenir un produit de luxe. LeakTrace a été développé comme un service d'utilité publique : nous ne collectons aucune adresse email à des fins de marketing, nous n'affichons aucune publicité et l'ensemble des analyses est traité localement sur votre iPhone.
        </p>
      </div>

    </div>
  );
};
