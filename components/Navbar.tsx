'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, Compass, Sparkles, Coffee, Heart, Search, 
  Menu, X, Volume2, VolumeX, Moon, Sun, PlusCircle, User
} from 'lucide-react';
import { useApp } from '@/lib/store';

interface NavbarProps {
  onOpenCompass: () => void;
  onOpenVibeMatch: () => void;
  onOpenJourneyWeaver: () => void;
  onOpenCommandPalette: () => void;
  onOpenAICompanion: () => void;
}

export default function Navbar({
  onOpenCompass,
  onOpenVibeMatch,
  onOpenJourneyWeaver,
  onOpenCommandPalette,
  onOpenAICompanion,
}: NavbarProps) {
  const pathname = usePathname();
  const { 
    user, 
    isWomenSafetyMode, 
    toggleWomenSafetyMode, 
    isSilenceMode, 
    toggleSilenceMode,
    chaiMeetups
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/explore', label: 'Explore Map' },
    { href: '/gigs', label: 'Work & Earn' },
    { href: '/stays', label: 'Stays' },
    { href: '/rides', label: 'Ride Split' },
    { href: '/culture', label: 'Culture & Phrases' },
    { href: '/qa', label: 'Roamer Q&A' },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'glass-panel shadow-sm py-2.5' 
            : 'bg-[#FAF8F5]/95 backdrop-blur-md py-3.5 border-b border-sand-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sukoon-500 to-terracotta flex items-center justify-center text-white shadow-md shadow-sukoon-500/20 group-hover:scale-105 transition-transform">
                  <span className="font-serif text-xl font-bold">स्</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-xl text-sukoon-900 tracking-tight">
                      SukoonRoute
                    </span>
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-sukoon-100 text-sukoon-700 rounded-full">
                      Slow Travel
                    </span>
                  </div>
                  <p className="text-[10px] text-sand-600 hidden sm:block tracking-wide">
                    शान्ति • सेवा • स्वाध्याय
                  </p>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-sukoon-500 text-white shadow-sm'
                          : 'text-sand-700 hover:text-sukoon-700 hover:bg-sand-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Signature Tools Bar */}
            <div className="hidden md:flex items-center gap-2">
              {/* Sukoon Compass Pill */}
              <button
                onClick={onOpenCompass}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sand-100 hover:bg-sand-200 text-sukoon-800 transition-colors border border-sand-300/60"
                title="Find places by spiritual mood"
              >
                <Compass className="w-3.5 h-3.5 text-sukoon-600 animate-spin-slow" />
                <span>Sukoon Compass</span>
              </button>

              {/* Vibe Match Pill */}
              <button
                onClick={onOpenVibeMatch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors border border-rose-200"
                title="Find slow travel buddies"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Vibe Match</span>
              </button>

              {/* Journey Weaver Pill */}
              <button
                onClick={onOpenJourneyWeaver}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors border border-amber-200"
                title="Weave your slow route"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Journey Weaver</span>
              </button>

              {/* AI Roamer Companion */}
              <button
                onClick={onOpenAICompanion}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-forest-50 hover:bg-forest-100 text-forest-800 transition-colors border border-forest-200"
                title="Instant AI travel & safety guide"
              >
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span>AI Companion</span>
              </button>
            </div>

            {/* Right Action Stack */}
            <div className="flex items-center gap-2">
              
              {/* Women Safety Mode Toggle */}
              <button
                onClick={toggleWomenSafetyMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isWomenSafetyMode
                    ? 'bg-forest-600 text-white shadow-glow-forest ring-2 ring-forest-400'
                    : 'bg-sand-100 text-sand-700 hover:bg-forest-50 hover:text-forest-700 border border-sand-200'
                }`}
                title="Toggle Women-Only Safe Stays, Rides & Hosts"
              >
                <Shield className={`w-3.5 h-3.5 ${isWomenSafetyMode ? 'text-white' : 'text-forest-600'}`} />
                <span className="hidden sm:inline">Women Safety</span>
                {isWomenSafetyMode && (
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                )}
              </button>

              {/* Silence Mode Toggle */}
              <button
                onClick={toggleSilenceMode}
                className={`p-2 rounded-full text-xs transition-colors border ${
                  isSilenceMode 
                    ? 'bg-mystic-indigo text-amber-300 border-amber-400' 
                    : 'bg-sand-100 text-sand-700 hover:bg-sand-200 border-sand-200'
                }`}
                title="Silence / Zen Meditation Mode"
              >
                {isSilenceMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-sand-500" />}
              </button>

              {/* Quick Search / Cmd+K */}
              <button
                onClick={onOpenCommandPalette}
                className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs bg-sand-100 text-sand-600 hover:bg-sand-200 border border-sand-200"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.2 bg-white rounded border border-sand-300 text-[10px] font-mono text-sand-500">
                  Ctrl+K
                </kbd>
              </button>

              {/* Post Listing Wizard Button */}
              <Link
                href="/post"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-sukoon-500 to-terracotta text-white shadow-sm hover:shadow hover:scale-[1.02] transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Listing</span>
              </Link>

              {/* User Passport Pill */}
              <Link
                href="/profile"
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-sand-100 hover:bg-sand-200 transition-colors border border-sand-300/60"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-sukoon-500"
                />
                <div className="hidden sm:flex items-center gap-1">
                  <span className="text-xs font-semibold text-sand-900">{user.name.split(' ')[0]}</span>
                  <span className="text-[10px] font-bold text-sukoon-600 bg-sukoon-100 px-1.5 py-0.2 rounded-full">
                    {user.karmaPoints}k
                  </span>
                </div>
              </Link>

              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-2 rounded-xl text-sand-700 hover:bg-sand-100 lg:hidden"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sand-200 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-sand-200">
              <button
                onClick={() => { onOpenCompass(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sand-50 text-xs font-semibold text-sukoon-800"
              >
                <Compass className="w-4 h-4 text-sukoon-600" />
                <span>Sukoon Compass</span>
              </button>
              <button
                onClick={() => { onOpenVibeMatch(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 text-xs font-semibold text-rose-800"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Vibe Match</span>
              </button>
              <button
                onClick={() => { onOpenJourneyWeaver(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 text-xs font-semibold text-amber-900"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Journey Weaver</span>
              </button>
              <button
                onClick={() => { onOpenAICompanion(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-forest-50 text-xs font-semibold text-forest-800"
              >
                <Sparkles className="w-4 h-4 text-forest-600" />
                <span>AI Companion</span>
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-sand-800 hover:bg-sand-100"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/post"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-sukoon-700 bg-sukoon-50"
              >
                + Post a Listing (Gig / Stay / Ride)
              </Link>
              <Link
                href="/safety"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-forest-700 bg-forest-50"
              >
                🛡️ Women Safety Center & Emergency Numbers
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-sand-800 hover:bg-sand-100"
              >
                My Dashboard & Applications
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Women Safety Active Banner */}
      {isWomenSafetyMode && (
        <div className="bg-gradient-to-r from-forest-700 via-forest-600 to-forest-700 text-white text-xs py-1.5 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2 sticky top-[57px] z-30">
          <Shield className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
          <span>
            <strong>Women Safety Mode Active:</strong> Only showing verified female hosts, women-only stays, female carpools & vetted community sanctuaries.
          </span>
          <button 
            onClick={toggleWomenSafetyMode}
            className="underline ml-2 text-emerald-200 hover:text-white"
          >
            Turn Off
          </button>
        </div>
      )}
    </>
  );
}
