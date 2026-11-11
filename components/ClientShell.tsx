'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import SafetyShieldModal from './SafetyShieldModal';
import FakeCallModal from './FakeCallModal';
import SukoonCompassModal from './SukoonCompassModal';
import VibeMatchModal from './VibeMatchModal';
import JourneyWeaverModal from './JourneyWeaverModal';
import ChaiTableModal from './ChaiTableModal';
import SilenceModeOverlay from './SilenceModeOverlay';
import CommandPaletteModal from './CommandPaletteModal';
import InAppChatModal from './InAppChatModal';
import TravelCompanionAIModal from './TravelCompanionAIModal';
import Footer from './Footer';
import { ShieldAlert, Compass } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { isSOSActive } = useApp();

  // Modals state
  const [safetyShieldOpen, setSafetyShieldOpen] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [vibeMatchOpen, setVibeMatchOpen] = useState(false);
  const [journeyWeaverOpen, setJourneyWeaverOpen] = useState(false);
  const [chaiTableOpen, setChaiTableOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiCompanionOpen, setAiCompanionOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-sand-900 font-sans selection:bg-sukoon-200 selection:text-sukoon-900 pb-16 lg:pb-0">
      
      {/* Global Navbar */}
      <Navbar
        onOpenCompass={() => setCompassOpen(true)}
        onOpenVibeMatch={() => setVibeMatchOpen(true)}
        onOpenJourneyWeaver={() => setJourneyWeaverOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAICompanion={() => setAiCompanionOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer onOpenSafetyShield={() => setSafetyShieldOpen(true)} />

      {/* Mobile-First Bottom Nav */}
      <BottomNav
        onOpenSafetyShield={() => setSafetyShieldOpen(true)}
        onOpenChaiTable={() => setChaiTableOpen(true)}
      />

      {/* Desktop Floating Safety Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col items-end gap-3">
        <button
          onClick={() => setSafetyShieldOpen(true)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-bold text-xs shadow-xl transition-all hover:scale-105 active:scale-95 ${
            isSOSActive
              ? 'bg-red-600 sos-pulse ring-4 ring-red-400'
              : 'bg-gradient-to-r from-forest-800 to-forest-600 hover:shadow-forest-700/30'
          }`}
          aria-label="Women Safety Shield"
        >
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>Safety Shield & SOS</span>
        </button>
      </div>

      {/* Modal Overlays */}
      <SafetyShieldModal
        isOpen={safetyShieldOpen}
        onClose={() => setSafetyShieldOpen(false)}
      />

      <FakeCallModal />

      <SukoonCompassModal
        isOpen={compassOpen}
        onClose={() => setCompassOpen(false)}
      />

      <VibeMatchModal
        isOpen={vibeMatchOpen}
        onClose={() => setVibeMatchOpen(false)}
      />

      <JourneyWeaverModal
        isOpen={journeyWeaverOpen}
        onClose={() => setJourneyWeaverOpen(false)}
      />

      <ChaiTableModal
        isOpen={chaiTableOpen}
        onClose={() => setChaiTableOpen(false)}
      />

      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenCompass={() => setCompassOpen(true)}
        onOpenVibeMatch={() => setVibeMatchOpen(true)}
        onOpenJourneyWeaver={() => setJourneyWeaverOpen(true)}
        onOpenSafetyShield={() => setSafetyShieldOpen(true)}
      />

      <TravelCompanionAIModal
        isOpen={aiCompanionOpen}
        onClose={() => setAiCompanionOpen(false)}
      />

      <InAppChatModal />

      <SilenceModeOverlay />

    </div>
  );
}

