import React, { useState } from 'react';
import { X, Copy, Check, FileText } from 'lucide-react';
import { AuditInput } from '../types/audit';

interface RgpdModalProps {
  isOpen: boolean;
  onClose: () => void;
  input?: AuditInput;
}

export const RgpdModal: React.FC<RgpdModalProps> = ({ isOpen, onClose, input }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullName = [input?.firstName, input?.lastName].filter(Boolean).join(' ') || '[Votre Prénom et Nom]';
  const userEmail = input?.email || '[Votre Adresse Email]';
  const handles = [
    input?.discordHandle ? `Compte Discord : ${input.discordHandle}` : '',
    input?.snapchatHandle ? `Compte Snapchat : ${input.snapchatHandle}` : '',
    input?.phoneNumber ? `Numéro de Téléphone : ${input.phoneNumber}` : ''
  ].filter(Boolean).join('\n') || '[Identifiants des comptes concernés]';

  const letterText = `Objet : Demande de suppression de mes données personnelles (Article 17 du RGPD - Droit à l'effacement)

Madame, Monsieur le Délégué à la Protection des Données (DPO),

En application de l'article 17 du Règlement Général sur la Protection des Données (Règlement UE 2016/679), je vous adresse par la présente une demande formelle d'effacement de l'ensemble des données à caractère personnel me concernant figurant dans vos systèmes et bases de données.

Données d'identification relatives à ma demande :
- Nom et Prénom : ${fullName}
- Adresse email associée : ${userEmail}
${handles}

Je vous demande expressément de :
1. Procéder à la suppression définitive de mon compte et de toutes les données associées (profils, historiques, métadonnées, journaux de connexion et fichiers archivés).
2. Enjoindre l'ensemble des éventuels sous-traitants ou prestataires tiers auxquels mes données auraient été communiquées de procéder sans délai à leur effacement respectif (conformément à l'article 17 alinéa 2 du RGPD).
3. Me confirmer par retour de courrier électronique la bonne exécution de cette suppression dans un délai maximal d'un mois à compter de la réception de la présente demande (Article 12.3 du RGPD).

À défaut de réponse favorable de votre part dans les délais légaux impartis, je me verrai dans l'obligation de saisir l'autorité de contrôle compétente (la Commission Nationale de l'Informatique et des Libertés - CNIL).

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Fait pour valoir ce que de droit.
${fullName}
Date : ${new Date().toLocaleDateString('fr-FR')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl liquid-glass border border-white/15 p-5 sm:p-8 shadow-2xl text-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Grabber Pill */}
        <div className="sm:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Lettre RGPD - Droit à l'Effacement
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400">
                Article 17 du RGPD européen
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

        {/* Info Box */}
        <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-center justify-between gap-3">
          <span>Prêt à envoyer au DPO ou support du service à purger.</span>
          <button
            onClick={handleCopy}
            className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-semibold rounded-xl text-xs active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>

        {/* Letter Preview */}
        <div className="mt-3.5">
          <pre className="p-4 rounded-2xl bg-black border border-white/10 text-zinc-300 font-mono text-[11px] sm:text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[300px]">
            {letterText}
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 rounded-xl transition-all cursor-pointer"
          >
            Fermer
          </button>
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold bg-white text-black hover:bg-zinc-200 active:scale-98 rounded-xl transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copié dans le presse-papier' : 'Copier la lettre complète'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
