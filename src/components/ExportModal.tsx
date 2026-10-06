import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import { AuditReport } from '../types/audit';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AuditReport;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, report }) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'markdown' | 'json'>('markdown');

  if (!isOpen) return null;

  const markdownContent = `# RAPPORT D'AUDIT D'EXPOSITION AUX FUITES DE DONNÉES
Généré par LeakTrace v2.4 - ${new Date(report.timestamp).toLocaleString('fr-FR')}

## IDENTITÉ AUDITÉE (Usage strictement personnel - Art. 226-1 Code Pénal)
- Titulaire : ${[report.input.firstName, report.input.lastName].filter(Boolean).join(' ') || 'Non renseigné'}
- Adresse Email : ${report.input.email || 'Non renseignée'}
- Pseudo Discord : ${report.input.discordHandle || 'Non renseigné'}
- Pseudo Snapchat : ${report.input.snapchatHandle || 'Non renseigné'}
${report.input.phoneNumber ? `- Téléphone : ${report.input.phoneNumber}\n` : ''}${report.input.city ? `- Ville : ${report.input.city}\n` : ''}

## SYNTHÈSE DU RISQUE
- Score Global d'Exposition : ${report.overallScore}/100
- Niveau de Risque : ${report.riskLevel}
- Synthèse : ${report.executiveSummary}

## PROFIL RECONSTITUÉ PAR UN ATTAQUANT
${report.identityDeductions.map(d => `- **${d.dataPoint}** (${d.certaintyPercent}% de certitude) : Détecté via ${d.exposedThrough}. ${d.deduction}`).join('\n')}

## VECTEURS DE MENACES IDENTIFIÉS
${report.threatVectors.map(v => `### ${v.title} [${v.severity}]
- Impact : +${v.scoreImpact} pts
- Description : ${v.description}
- Scénario d'exploitation : ${v.exploitScenario}
- Mesure corrective : ${v.mitigation}
`).join('\n')}

## FUITES DE DONNÉES HISTORIQUES ASSOCIÉES
${report.breaches.map(b => `- **${b.service}** (${b.breachDate}) : ${b.recordsExposed}. Données compromises : ${b.compromisedData.join(', ')}`).join('\n')}

## ACTIONS DE REMÉDIATION PRIORITAIRES
${report.remediationPlan.map((r, i) => `${i + 1}. [${r.priority}] ${r.title}\n   ${r.instructions.join('\n   ')}`).join('\n\n')}
`;

  const jsonContent = JSON.stringify(report, null, 2);
  const activeContent = format === 'markdown' ? markdownContent : jsonContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: format === 'markdown' ? 'text/markdown' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileSlug = (report.input.lastName || report.input.discordHandle || report.input.snapchatHandle || report.input.email?.split('@')[0] || 'audit').toLowerCase().replace(/[^a-z0-9]/gi, '_');
    a.download = `rapport-audit-fuites-${fileSlug}-${Date.now()}.${format === 'markdown' ? 'md' : 'json'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Exporter le Rapport
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400">
                Format Markdown ou JSON pour archive
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

        {/* Format Selector */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-black/60 border border-white/10 rounded-2xl text-xs">
            <button
              onClick={() => setFormat('markdown')}
              className={`flex-1 sm:flex-none min-h-[36px] px-3.5 py-1.5 rounded-xl font-mono transition-all active:scale-95 ${
                format === 'markdown' ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => setFormat('json')}
              className={`flex-1 sm:flex-none min-h-[36px] px-3.5 py-1.5 rounded-xl font-mono transition-all active:scale-95 ${
                format === 'json' ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              JSON (.json)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none min-h-[40px] flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-mono transition-all active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié' : 'Copier'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none min-h-[40px] flex items-center justify-center gap-1.5 px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-3.5">
          <pre className="p-4 rounded-2xl bg-black border border-white/10 text-zinc-300 font-mono text-[11px] sm:text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[300px]">
            {activeContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
