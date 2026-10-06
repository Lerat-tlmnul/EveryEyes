import React, { useState } from 'react';
import { AuditInput } from '../types/audit';
import { Shield, ChevronDown, ChevronUp, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

interface AuditFormProps {
  onStartAudit: (input: AuditInput) => void;
  isLoading: boolean;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onStartAudit, isLoading }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [discordHandle, setDiscordHandle] = useState('');
  const [snapchatHandle, setSnapchatHandle] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasConfirmedHonor, setHasConfirmedHonor] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const hasAnyField = Boolean(
      firstName.trim() ||
      lastName.trim() ||
      discordHandle.trim() ||
      snapchatHandle.trim() ||
      email.trim() ||
      phoneNumber.trim() ||
      city.trim()
    );

    if (!hasAnyField) {
      setValidationError('Veuillez renseigner au moins un élément (Nom, Discord, Snapchat, Email ou Téléphone) pour lancer l\'analyse.');
      return;
    }

    if (email.trim() && !email.includes('@')) {
      setValidationError('L\'adresse email saisie n\'est pas valide.');
      return;
    }

    if (!hasConfirmedHonor) {
      setValidationError('Vous devez obligatoirement certifier être le propriétaire légitime de ces données pour démarrer l\'audit.');
      return;
    }

    onStartAudit({
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      discordHandle: discordHandle.trim() || undefined,
      snapchatHandle: snapchatHandle.trim() || undefined,
      email: email.trim() || undefined,
      phoneNumber: phoneNumber.trim() || undefined,
      city: city.trim() || undefined
    });
  };

  const loadPreset = (presetType: 'discordOnly' | 'nameOnly' | 'full') => {
    if (presetType === 'discordOnly') {
      setFirstName('');
      setLastName('');
      setDiscordHandle('shadow_phantom99');
      setSnapchatHandle('');
      setEmail('');
      setPhoneNumber('');
      setCity('');
    } else if (presetType === 'nameOnly') {
      setFirstName('Julien');
      setLastName('Lemoine');
      setDiscordHandle('');
      setSnapchatHandle('');
      setEmail('');
      setPhoneNumber('');
      setCity('Bordeaux');
    } else {
      setFirstName('Lucas');
      setLastName('Moreau');
      setDiscordHandle('lucas_m75');
      setSnapchatHandle('lucas.moreau75');
      setEmail('lucas.moreau@gmail.com');
      setPhoneNumber('+33 6 12 34 56 78');
      setCity('Paris');
    }
    setHasConfirmedHonor(true);
    setValidationError(null);
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setDiscordHandle('');
    setSnapchatHandle('');
    setEmail('');
    setPhoneNumber('');
    setCity('');
    setHasConfirmedHonor(false);
    setValidationError(null);
  };

  const fieldsCount = [firstName, lastName, discordHandle, snapchatHandle, email, phoneNumber, city].filter(s => s.trim().length > 0).length;

  return (
    <div className="relative rounded-3xl liquid-glass border border-white/10 p-5 sm:p-8 shadow-2xl transition-all">
      
      {/* Liquid glass specular rim */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Form Header */}
      <div className="flex flex-col gap-3 pb-5 sm:pb-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Scanner d'Empreinte Modulaire
            </h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
            {fieldsCount} actif{fieldsCount > 1 ? 's' : ''}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400">
          Champs 100% optionnels : entrez un ou plusieurs éléments pour auditer vos fuites.
        </p>

        {/* Preset pill carousel (thumb-scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none no-scrollbar -mx-1 px-1">
          <button
            type="button"
            onClick={() => loadPreset('discordOnly')}
            className="min-h-[36px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-xs text-zinc-300 active:scale-95 transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            Seulement Discord
          </button>
          <button
            type="button"
            onClick={() => loadPreset('nameOnly')}
            className="min-h-[36px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-xs text-zinc-300 active:scale-95 transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            Seulement Nom
          </button>
          <button
            type="button"
            onClick={() => loadPreset('full')}
            className="min-h-[36px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 text-xs text-zinc-300 active:scale-95 transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            Complet
          </button>
          {fieldsCount > 0 && (
            <button
              type="button"
              onClick={clearForm}
              className="min-h-[36px] px-2.5 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors cursor-pointer shrink-0"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:space-y-5">
        
        {/* Name Fields (Prénom / Nom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-zinc-300 flex items-center justify-between">
              <span>PRÉNOM</span>
              <span className="text-[10px] text-zinc-500 font-sans">Optionnel</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex : Lucas"
                className="w-full pl-10 pr-3 h-12 bg-black/60 border border-white/10 rounded-2xl text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-zinc-300 flex items-center justify-between">
              <span>NOM DE FAMILLE</span>
              <span className="text-[10px] text-zinc-500 font-sans">Optionnel</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ex : Moreau"
                className="w-full pl-10 pr-3 h-12 bg-black/60 border border-white/10 rounded-2xl text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Discord & Snapchat Handles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-zinc-300 flex items-center justify-between">
              <span>PSEUDO DISCORD</span>
              <span className="text-[10px] text-zinc-500 font-sans">Optionnel</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <input
                type="text"
                value={discordHandle}
                onChange={(e) => setDiscordHandle(e.target.value)}
                placeholder="Ex : shadow_dev"
                className="w-full pl-10 pr-3 h-12 bg-black/60 border border-white/10 rounded-2xl text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition-all font-mono"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-zinc-300 flex items-center justify-between">
              <span>PSEUDO SNAPCHAT</span>
              <span className="text-[10px] text-zinc-500 font-sans">Optionnel</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-yellow-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.003 2c-3.69 0-6.002 2.62-6.002 6.096 0 1.24.28 2.378.71 3.255.08.16.14.3.17.41.04.14.01.27-.08.38-.28.35-.91.73-1.66.97-.24.08-.4.29-.4.54 0 .33.26.6.61.64.91.1 1.72.39 2.17 1.02.16.22.18.5.07.76-.32.76-.78 1.43-1.39 1.84-.23.15-.36.41-.32.68.04.28.24.5.51.56 1.48.33 3.01.12 4.41-.33.4-.13.84-.13 1.24 0 1.4.45 2.93.66 4.41.33.27-.06.47-.28.51-.56.04-.27-.09-.53-.32-.68-.61-.41-1.07-1.08-1.39-1.84-.11-.26-.09-.54.07-.76.45-.63 1.26-.92 2.17-1.02.35-.04.61-.31.61-.64 0-.25-.16-.46-.4-.54-.75-.24-1.38-.62-1.66-.97-.09-.11-.12-.24-.08-.38.03-.11.09-.25.17-.41.43-.877.71-2.015.71-3.255C18.005 4.62 15.693 2 12.003 2z" />
                </svg>
              </div>
              <input
                type="text"
                value={snapchatHandle}
                onChange={(e) => setSnapchatHandle(e.target.value)}
                placeholder="Ex : shadow_snap75"
                className="w-full pl-10 pr-3 h-12 bg-black/60 border border-white/10 rounded-2xl text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all font-mono"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-medium text-zinc-300 flex items-center justify-between">
            <span>ADRESSE EMAIL</span>
            <span className="text-[10px] text-zinc-500 font-sans">Optionnel</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex : contact@domaine.com"
              className="w-full pl-10 pr-3 h-12 bg-black/60 border border-white/10 rounded-2xl text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-mono"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Advanced Optional Collapsible */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="min-h-[44px] flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 active:text-white transition-colors cursor-pointer py-1"
          >
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>Autres paramètres (téléphone portable, ville)</span>
          </button>

          {showAdvanced && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-black/50 border border-white/10 animate-in fade-in duration-150">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-zinc-400">
                  NUMÉRO MOBILE (OPT.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex : +33 6 12 34 56 78"
                    className="w-full pl-9 pr-3 h-11 bg-zinc-950 border border-white/10 rounded-xl text-base sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20 font-mono"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-zinc-400">
                  VILLE / RÉGION (OPT.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex : Paris, Lyon..."
                    className="w-full pl-9 pr-3 h-11 bg-zinc-950 border border-white/10 rounded-xl text-base sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/20"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-medium animate-in fade-in">
            {validationError}
          </div>
        )}

        {/* Mandatory Ethical & Legal Checkbox (touch-friendly on iPhone) */}
        <div className="pt-1">
          <label className="min-h-[48px] flex items-start gap-3 p-3.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasConfirmedHonor}
              onChange={(e) => setHasConfirmedHonor(e.target.checked)}
              className="mt-0.5 h-5 w-5 rounded-lg border-zinc-700 bg-black text-white focus:ring-0 accent-white shrink-0 cursor-pointer"
              disabled={isLoading}
            />
            <span className="text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white">Engagement d'auto-audit :</strong> Je certifie formellement être le titulaire légitime des données saisies et m'engage à ne pas rechercher un tiers (interdit par l'Art. 226-1 du Code Pénal).
            </span>
          </label>
        </div>

        {/* Submit Button (Thumb-friendly height >= 52px on iPhone with spring press) */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-14 rounded-2xl font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] ${
              isLoading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white hover:bg-zinc-100 text-black shadow-[0_8px_24px_rgba(255,255,255,0.15)]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin" />
                <span className="font-mono text-xs">Analyse cryptographique en cours...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-black" />
                <span>Lancer l'Audit ({fieldsCount || '0'} renseigné{fieldsCount > 1 ? 's' : ''})</span>
                <span className="text-zinc-500 font-mono">→</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
