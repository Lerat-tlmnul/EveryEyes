/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, AppNavTab } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { BreachesView } from './components/BreachesView';
import { PricingView } from './components/PricingView';
import { LegalBanner } from './components/LegalBanner';
import { LegalModal } from './components/LegalModal';
import { RgpdModal } from './components/RgpdModal';
import { ExportModal } from './components/ExportModal';
import { AuditForm } from './components/AuditForm';
import { ScanningConsole } from './components/ScanningConsole';
import { ResultsDashboard } from './components/ResultsDashboard';
import { AuditInput, AuditReport } from './types/audit';
import { runSecurityAudit } from './utils/auditEngine';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<AppNavTab>('home');
  const [currentInput, setCurrentInput] = useState<AuditInput | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isRgpdModalOpen, setIsRgpdModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleStartAudit = (input: AuditInput) => {
    setCurrentInput(input);
    setIsScanning(true);
    setActiveNavTab('search');
  };

  const handleScanComplete = () => {
    if (currentInput) {
      const generatedReport = runSecurityAudit(currentInput);
      setReport(generatedReport);
    }
    setIsScanning(false);
  };

  const handleReset = () => {
    setReport(null);
    setCurrentInput(null);
    setIsScanning(false);
  };

  const handleGoToSearch = () => {
    setActiveNavTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToBreaches = () => {
    setActiveNavTab('breaches');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToPricing = () => {
    setActiveNavTab('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col bg-grid-pattern selection:bg-white selection:text-black">
      
      {/* Top Navbar */}
      <Header
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenRgpdModal={() => setIsRgpdModalOpen(true)}
        onNavigateHome={() => setActiveNavTab('home')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-6 pb-28 sm:pb-32">
        
        {/* Tab 1: ACCUEIL */}
        {activeNavTab === 'home' && (
          <HomeView
            onGoToSearch={handleGoToSearch}
            onGoToBreaches={handleGoToBreaches}
            onGoToPricing={handleGoToPricing}
          />
        )}

        {/* Tab 2: RECHERCHE / SCANNER */}
        {activeNavTab === 'search' && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
            {/* Legal Warning Banner */}
            <LegalBanner onOpenDetails={() => setIsLegalModalOpen(true)} />

            {isScanning ? (
              <ScanningConsole onComplete={handleScanComplete} />
            ) : report ? (
              <ResultsDashboard
                report={report}
                onReset={handleReset}
                onOpenRgpd={() => setIsRgpdModalOpen(true)}
                onOpenExport={() => setIsExportModalOpen(true)}
              />
            ) : (
              <AuditForm
                onStartAudit={handleStartAudit}
                isLoading={isScanning}
              />
            )}
          </div>
        )}

        {/* Tab 3: BASES DE FUITES */}
        {activeNavTab === 'breaches' && (
          <BreachesView onGoToSearch={handleGoToSearch} />
        )}

        {/* Tab 4: PLANS & TARIFS (Tout Gratuit) */}
        {activeNavTab === 'pricing' && (
          <PricingView onGoToSearch={handleGoToSearch} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/90 py-6 px-4 text-xs text-zinc-500 mb-20 sm:mb-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-zinc-400">LEAKTRACE</span>
            <span>— Plateforme citoyenne d'auto-évaluation de sécurité.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-zinc-400">
            <button
              onClick={() => setIsLegalModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sanctions Pénales
            </button>
            <button
              onClick={() => setIsRgpdModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Droit d'effacement
            </button>
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              CNIL
            </a>
          </div>
        </div>
      </footer>

      {/* Persistent Bottom Navigation Menu Bar (Accueil, Recherche, Bases Fuites, Plans Gratuit) */}
      <BottomNav
        activeTab={activeNavTab}
        onSelectTab={(tab) => {
          setActiveNavTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasActiveReport={Boolean(report)}
      />

      {/* Modals */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      <RgpdModal
        isOpen={isRgpdModalOpen}
        onClose={() => setIsRgpdModalOpen(false)}
        input={currentInput || undefined}
      />

      {report && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          report={report}
        />
      )}

    </div>
  );
}
