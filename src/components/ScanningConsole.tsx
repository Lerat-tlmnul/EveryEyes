import React, { useEffect, useState } from 'react';

interface ScanningConsoleProps {
  onComplete: () => void;
}

const SCAN_STEPS = [
  { text: 'INIT_SESSION : Initialisation en mémoire sandbox locale...', delay: 350 },
  { text: 'CRYPTO_HASH : Calcul des empreintes SHA-256 des identifiants...', delay: 700 },
  { text: 'CORRELATION_MATRIX : Analyse de proximité lexicale...', delay: 1100 },
  { text: 'BREACH_QUERY : Recherche croisée (COMB 3.2B, Collection #1-#5)...', delay: 1550 },
  { text: 'SERVICE_INTEL : Audit ciblé (Discord.io, Snapchat 4.6M, Deezer)...', delay: 2000 },
  { text: 'THREAT_VECTOR : Modélisation des surfaces de doxxing et credential stuffing...', delay: 2450 },
  { text: 'REMEDIATION_GEN : Synthèse du rapport et génération des requêtes...', delay: 2850 }
];

export const ScanningConsole: React.FC<ScanningConsoleProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    SCAN_STEPS.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStepIndex(index + 1);
        if (index === SCAN_STEPS.length - 1) {
          setTimeout(onComplete, 500);
        }
      }, step.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const progressPercent = Math.min(100, Math.round((currentStepIndex / SCAN_STEPS.length) * 100));

  return (
    <div className="w-full rounded-3xl liquid-glass border border-white/10 p-5 sm:p-8 shadow-2xl space-y-5 transition-all">
      
      {/* Console Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
          </div>
          <span className="text-xs font-mono text-zinc-400">
            leaktrace // exec
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>SCAN [{progressPercent}%]</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Terminal log output */}
      <div className="font-mono text-xs space-y-2.5 min-h-[180px]">
        {SCAN_STEPS.slice(0, currentStepIndex).map((step, idx) => (
          <div key={idx} className="flex items-start space-x-2 text-zinc-300 animate-in fade-in duration-150">
            <span className="text-zinc-600 select-none text-[11px]">[{idx + 1}/{SCAN_STEPS.length}]</span>
            <span className={idx === currentStepIndex - 1 ? 'text-white font-medium' : 'text-zinc-400'}>
              {step.text}
            </span>
          </div>
        ))}
        {currentStepIndex < SCAN_STEPS.length && (
          <div className="flex items-center space-x-2 text-zinc-500 animate-pulse text-xs">
            <span className="select-none">&gt;</span>
            <span>Traitement de l'empreinte...</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>IPHONE SANDBOX : 100% LOCAL</span>
        <span>ZERO_TELEMETRY</span>
      </div>
    </div>
  );
};
