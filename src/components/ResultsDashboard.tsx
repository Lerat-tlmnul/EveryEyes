import React, { useState } from 'react';
import { AuditReport, RiskLevel } from '../types/audit';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  FileText, 
  Download, 
  RefreshCw, 
  CheckSquare, 
  Square, 
  Search, 
  UserCheck, 
  Lock,
  Database
} from 'lucide-react';

interface ResultsDashboardProps {
  report: AuditReport;
  onReset: () => void;
  onOpenRgpd: () => void;
  onOpenExport: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  report,
  onReset,
  onOpenRgpd,
  onOpenExport
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'threats' | 'breaches' | 'osint' | 'defense'>('profile');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = report.remediationPlan.length;

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          badge: 'bg-rose-950/60 text-rose-300 border-rose-500/40'
        };
      case 'HIGH':
        return {
          text: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          badge: 'bg-amber-950/60 text-amber-300 border-amber-500/40'
        };
      case 'MEDIUM':
        return {
          text: 'text-yellow-400',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          badge: 'bg-yellow-950/60 text-yellow-300 border-yellow-500/40'
        };
      default:
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
        };
    }
  };

  const riskStyle = getRiskColor(report.riskLevel);

  return (
    <div className="space-y-5 sm:space-y-6 pb-20 sm:pb-6">

      {/* Top Banner & Score Overview (Liquid Glass) */}
      <div className="rounded-3xl liquid-glass border border-white/10 p-5 sm:p-8 shadow-2xl relative overflow-hidden transition-all">
        
        {/* Specular lighting effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 pb-5 sm:pb-6 border-b border-white/10">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${riskStyle.badge}`}>
                RISQUE {report.riskLevel === 'CRITICAL' ? 'CRITIQUE' : report.riskLevel === 'HIGH' ? 'ÉLEVÉ' : 'MODÉRÉ'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                AUDIT // {new Date(report.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
              Synthèse d'Exposition Numérique
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {report.executiveSummary}
            </p>
          </div>

          {/* Radial score gauge & stats */}
          <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 bg-black/50 border border-white/10 p-4 sm:p-5 rounded-2xl shrink-0">
            <div className="relative w-18 h-18 sm:w-22 sm:h-22 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={report.riskLevel === 'CRITICAL' ? '#f43f5e' : report.riskLevel === 'HIGH' ? '#f59e0b' : '#10b981'}
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * report.overallScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {report.overallScore}
                </span>
                <span className="text-[9px] text-zinc-500 uppercase font-sans">/ 100</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-zinc-400">
              <div className="flex items-center justify-between gap-4">
                <span>VECTEURS :</span>
                <span className="text-white font-semibold">{report.threatVectors.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>FUITES :</span>
                <span className="text-white font-semibold">{report.breaches.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>POINTS :</span>
                <span className="text-white font-semibold">{report.identityDeductions.length}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Action button toolbar (Desktop & tablet) */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenExport}
              className="min-h-[44px] flex items-center gap-1.5 text-xs font-medium text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Exporter Rapport</span>
            </button>

            <button
              onClick={onOpenRgpd}
              className="min-h-[44px] flex items-center gap-1.5 text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Lettre RGPD Art. 17</span>
            </button>
          </div>

          <button
            onClick={onReset}
            className="min-h-[44px] flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-black/60 border border-white/10 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer ml-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Nouveau Scan</span>
          </button>
        </div>

      </div>

      {/* Segmented Navigation Bar (Horizontal scrollable with smooth iOS feel) */}
      <div className="flex overflow-x-auto p-1.5 liquid-glass border border-white/10 rounded-2xl gap-1 text-xs font-medium scrollbar-none no-scrollbar">
        
        <button
          onClick={() => setActiveTab('profile')}
          className={`min-h-[40px] flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-white text-black shadow-md font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Profil Déduit</span>
          <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'profile' ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-300'}`}>
            {report.identityDeductions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('threats')}
          className={`min-h-[40px] flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
            activeTab === 'threats'
              ? 'bg-white text-black shadow-md font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <AlertTriangle className={`w-4 h-4 ${activeTab === 'threats' ? 'text-amber-600' : 'text-amber-400'}`} />
          <span>Vecteurs Menaces</span>
          <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'threats' ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-300'}`}>
            {report.threatVectors.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('breaches')}
          className={`min-h-[40px] flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
            activeTab === 'breaches'
              ? 'bg-white text-black shadow-md font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Database className={`w-4 h-4 ${activeTab === 'breaches' ? 'text-indigo-600' : 'text-indigo-400'}`} />
          <span>Bases Fuites</span>
          <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'breaches' ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-300'}`}>
            {report.breaches.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('osint')}
          className={`min-h-[40px] flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
            activeTab === 'osint'
              ? 'bg-white text-black shadow-md font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Search className={`w-4 h-4 ${activeTab === 'osint' ? 'text-cyan-600' : 'text-cyan-400'}`} />
          <span>Dorks OSINT</span>
          <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'osint' ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-300'}`}>
            Live
          </span>
        </button>

        <button
          onClick={() => setActiveTab('defense')}
          className={`min-h-[40px] flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
            activeTab === 'defense'
              ? 'bg-white text-black shadow-md font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Lock className={`w-4 h-4 ${activeTab === 'defense' ? 'text-emerald-600' : 'text-emerald-400'}`} />
          <span>Sécurisation</span>
          <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'defense' ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-300'}`}>
            {completedCount}/{totalSteps}
          </span>
        </button>

      </div>

      {/* Tab 1: Reconstitution de profil & Doxxing */}
      {activeTab === 'profile' && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          
          <div className="p-4 rounded-2xl liquid-glass-card border border-white/10 text-xs text-zinc-300 space-y-1">
            <span className="font-bold text-white uppercase font-mono tracking-wider block">
              Analyse du croisement de données :
            </span>
            <p className="text-zinc-400 leading-relaxed">
              {(() => {
                const elements = [
                  (report.input.firstName || report.input.lastName) ? `votre Nom (${[report.input.firstName, report.input.lastName].filter(Boolean).join(' ')})` : '',
                  report.input.discordHandle ? `votre Discord (${report.input.discordHandle})` : '',
                  report.input.snapchatHandle ? `votre Snapchat (${report.input.snapchatHandle})` : '',
                  report.input.email ? `votre Email (${report.input.email})` : '',
                  report.input.phoneNumber ? `votre Téléphone (${report.input.phoneNumber})` : ''
                ].filter(Boolean);

                if (elements.length > 1) {
                  return `En croisant ${elements.join(', ')}, les algorithmes de corrélation et les cybercriminels peuvent relier vos différents univers (vie réelle, cercles d'amis, communautés en ligne) et faciliter le doxxing ou le phishing ciblé.`;
                } else if (elements.length === 1) {
                  return `À partir de ${elements[0]}, un attaquant peut déjà retrouver les bases compromises associées, les traces publiques indexées et tenter des attaques ciblées.`;
                }
                return 'Analyse des identifiants fournis pour identifier la surface d\'exposition et les fuites associées.';
              })()}
            </p>
          </div>

          {/* Correlation Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {report.identityDeductions.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl liquid-glass-card border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">
                    {item.dataPoint}
                  </span>
                  <span className="font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                    {item.certaintyPercent}%
                  </span>
                </div>

                <div className="text-xs text-zinc-400">
                  <span className="text-zinc-500 uppercase font-mono text-[10px] block mb-0.5">Vecteur source :</span>
                  <span className="font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded-md inline-block border border-white/10">
                    {item.exposedThrough}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed pt-1 border-t border-white/5">
                  {item.deduction}
                </p>
              </div>
            ))}
          </div>

          {/* Correlation Highlights */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              Indicateurs de Corrélation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 flex items-start gap-2.5">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${report.correlationPivots.handlesMatch ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                <div>
                  <strong className="text-white block">Pseudos Discord / Snapchat identiques</strong>
                  <span className="text-zinc-400 text-xs">
                    {report.correlationPivots.handlesMatch 
                      ? 'OUI : Relie instantanément votre univers public et vos cercles privés.' 
                      : 'NON : Pseudonymes distincts ou isolés.'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 flex items-start gap-2.5">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${report.correlationPivots.nameInEmail ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div>
                  <strong className="text-white block">Nom civil dans l'adresse email</strong>
                  <span className="text-zinc-400 text-xs">
                    {report.correlationPivots.nameInEmail 
                      ? 'OUI : Chaque fuite mentionnant cet email expose votre vrai nom.' 
                      : 'NON : Pas d\'association civile directe.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Threat Vectors */}
      {activeTab === 'threats' && (
        <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
          {report.threatVectors.map((vector) => {
            const vStyle = getRiskColor(vector.severity);
            return (
              <div 
                key={vector.id} 
                className="p-5 sm:p-6 rounded-2xl liquid-glass-card border border-white/10 space-y-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${vStyle.badge}`}>
                      {vector.severity}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {vector.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <span>Impact :</span>
                    <span className="text-rose-400 font-semibold">+{vector.scoreImpact} pts</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {vector.description}
                </p>

                {/* Exploit Scenario & Remediation box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/60 border border-rose-500/20 space-y-1">
                    <span className="font-mono text-rose-400 text-[11px] font-semibold uppercase flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Scénario d'Attaque Concret
                    </span>
                    <p className="text-zinc-400 leading-relaxed text-xs">
                      {vector.exploitScenario}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/20 space-y-1">
                    <span className="font-mono text-emerald-400 text-[11px] font-semibold uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Mesure de Remédiation
                    </span>
                    <p className="text-zinc-400 leading-relaxed text-xs">
                      {vector.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Documented Breaches */}
      {activeTab === 'breaches' && (
        <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {report.breaches.map((breach) => (
              <div 
                key={breach.id} 
                className="p-5 rounded-2xl liquid-glass-card border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">
                      {breach.service}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                      {breach.breachDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-amber-400 font-semibold">
                      {breach.recordsExposed}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      {breach.attackVector}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {breach.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Données compromises :
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {breach.compromisedData.map((d, i) => (
                      <span key={i} className="text-[10px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-2 py-0.5 rounded-md">
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-zinc-400 bg-white/5 p-2 rounded-xl border border-white/10 mt-2">
                    <strong className="text-zinc-300">Impact :</strong> {breach.relevanceReason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Direct OSINT Dorks */}
      {activeTab === 'osint' && (
        <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
          
          <div className="p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 text-xs text-cyan-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-cyan-300 uppercase font-mono">
              <Search className="w-4 h-4 text-cyan-400" />
              Vérification OSINT en Direct (Google Dorking)
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Touchez chaque lien pour vérifier directement sur Google ce qui est indexé sur vos identifiants.
            </p>
          </div>

          <div className="space-y-3">
            {report.osintDorks.map((dork) => (
              <div 
                key={dork.id} 
                className="p-5 rounded-2xl liquid-glass-card border border-white/10 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <h3 className="font-bold text-sm text-white">
                    {dork.label}
                  </h3>
                  <a
                    href={dork.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 text-xs font-mono font-medium text-black bg-white hover:bg-zinc-200 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <span>Lancer sur Google</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-black border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto select-all">
                  {dork.query}
                </div>

                <p className="text-xs text-zinc-400">
                  {dork.description}
                </p>
              </div>
            ))}
          </div>

          {/* External verification resources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={report.input.email ? `https://haveibeenpwned.com/account/${encodeURIComponent(report.input.email)}` : 'https://haveibeenpwned.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] p-4 rounded-2xl liquid-glass-card border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group active:scale-98"
            >
              <div>
                <span className="font-bold text-xs text-white block">Have I Been Pwned</span>
                <span className="text-[11px] text-zinc-400">Vérifier les 700+ bases de fuites mondiales</span>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white" />
            </a>

            <a
              href="https://support.google.com/websearch/troubleshooter/3111061"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] p-4 rounded-2xl liquid-glass-card border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group active:scale-98"
            >
              <div>
                <span className="font-bold text-xs text-white block">Google Removal Tool</span>
                <span className="text-[11px] text-zinc-400">Faire supprimer vos données privées des résultats</span>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white" />
            </a>
          </div>

        </div>
      )}

      {/* Tab 5: Actionable Defense Checklist */}
      {activeTab === 'defense' && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Protocole de Sécurisation
              </h3>
              <p className="text-xs text-zinc-300">
                Touchez chaque consigne pour la marquer comme appliquée.
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs font-mono text-emerald-300 font-bold">
                {completedCount} / {totalSteps} terminées
              </span>
              <div className="w-full sm:w-32 h-1.5 bg-zinc-900 rounded-full mt-1.5 overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${(completedCount / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {report.remediationPlan.map((step) => {
              const isDone = !!completedSteps[step.id];
              return (
                <div 
                  key={step.id} 
                  className={`min-h-[52px] p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] ${
                    isDone 
                      ? 'border-emerald-500/30 bg-emerald-950/10 opacity-75' 
                      : 'liquid-glass-card border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      className="mt-0.5 text-zinc-400 hover:text-white transition-colors shrink-0"
                    >
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-zinc-600" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className={`text-sm font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                          {step.title}
                        </h4>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          step.priority === 'URGENT' 
                            ? 'bg-rose-950/60 text-rose-300 border-rose-500/40' 
                            : 'bg-white/5 text-zinc-400 border-white/10'
                        }`}>
                          {step.priority}
                        </span>
                      </div>

                      <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                        {step.instructions.map((ins, i) => (
                          <li key={i} className="leading-relaxed">
                            {ins}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onOpenRgpd}
            className="w-full min-h-[48px] p-4 rounded-2xl bg-white text-black hover:bg-zinc-100 font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Ouvrir la Lettre d'Effacement RGPD</span>
          </button>

        </div>
      )}

    </div>
  );
};
