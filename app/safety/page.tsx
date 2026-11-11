'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, ShieldAlert, Phone, MapPin, CheckCircle2, 
  AlertTriangle, PhoneCall, Clock, HeartHandshake, EyeOff, Lock
} from 'lucide-react';
import { EMERGENCY_NUMBERS } from '@/lib/seedData';
import { useApp } from '@/lib/store';

export default function SafetyCenterPage() {
  const { 
    user, 
    isWomenSafetyMode, 
    toggleWomenSafetyMode,
    triggerSOS,
    isSOSActive,
    cancelSOS,
    triggerFakeCall,
    startCheckInTimer,
    checkInMinutesLeft,
    confirmCheckInSafe
  } = useApp();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportText, setReportText] = useState('');

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportModalOpen(false);
      setReportText('');
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-white rounded-4xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Shield className="w-4 h-4" />
            <span>Women-First Safety Engine</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Safety Center & Solo Roamer Shield
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Women's safety is our primary trust engine. From automated fake incoming calls and check-in safety timers to direct toll-free emergency hotlines across India.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <button
              onClick={toggleWomenSafetyMode}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                isWomenSafetyMode
                  ? 'bg-emerald-400 text-forest-950 shadow-glow-forest'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>{isWomenSafetyMode ? 'Women-Only Mode: ON' : 'Enable Women-Only Safe Mode'}</span>
            </button>

            <button
              onClick={triggerFakeCall}
              className="px-5 py-2.5 rounded-full bg-sand-100 text-sand-900 text-xs font-bold hover:bg-white transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-forest-700" />
              <span>Test Fake Incoming Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Helpline Directory (Direct Tap-to-Dial) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
            Emergency Hotlines
          </span>
          <h2 className="font-serif text-2xl font-bold text-sand-900 mt-1">
            Indian National Emergency Numbers (Toll-Free)
          </h2>
          <p className="text-xs text-sand-600 mt-1">
            Works from any mobile connection even with zero balance or without a local SIM.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EMERGENCY_NUMBERS.map((em) => (
            <a
              key={em.service}
              href={`tel:${em.number.split(' ')[0]}`}
              className="p-4 rounded-2xl border border-sand-200 hover:border-forest-500 bg-sand-50/60 hover:bg-forest-50/40 transition-all flex items-center justify-between group shadow-xs"
            >
              <div>
                <p className="text-xs text-sand-600">{em.service}</p>
                <p className="font-serif text-xl font-bold text-forest-800 group-hover:text-forest-900">
                  {em.number}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-forest-600 group-hover:bg-forest-700 group-hover:text-white transition-colors shadow-xs">
                <Phone className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 6 Pillars of SukoonRoute Safety System */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
            Built-in Architectural Guarantees
          </span>
          <h2 className="font-serif text-2xl font-bold text-sand-900 mt-1">
            How SukoonRoute Protects Solo Women
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-sand-900">Mandatory Host ID Verification</h3>
            <p className="text-xs text-sand-600 leading-relaxed">
              Every host offering a homestay, ashram bed, or work-exchange is reviewed by our admin team using government ID proof (Aadhaar / Passport).
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-sand-900">Zero Contact Leaks</h3>
            <p className="text-xs text-sand-600 leading-relaxed">
              Your personal WhatsApp number, email, and social profiles are completely shielded until you mutually accept an application or booking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-sand-900">Auto Check-in Timer</h3>
            <p className="text-xs text-sand-600 leading-relaxed">
              Heading on an evening walk or taking an auto? Set an "Arrived Safe" timer. If you miss confirming, an automatic SMS alert with your coordinates is sent to your 2 trusted contacts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sukoon-100 text-sukoon-800 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-sand-900">Simulated Fake Incoming Call</h3>
            <p className="text-xs text-sand-600 leading-relaxed">
              Exit uncomfortable situations or taxi chatter gracefully with a realistic audio call screen from your host or family at the tap of a button.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-sand-900">Emergency GPS SOS</h3>
            <p className="text-xs text-sand-600 leading-relaxed">
              Instantly activates an emergency siren and shares exact live Google Maps GPS coordinates with pre-configured emergency contacts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sand-200 text-sand-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-sand-900">Public Venue Rule</h3>
            <p className="text-xs text-sand-600 leading-relaxed">
              All spontaneous Chai Table meetups and skill barters are strictly restricted to verified public tea stalls, ghat steps, and open cafes.
            </p>
          </div>

        </div>
      </div>

      {/* Report Host / Member Safety Issue */}
      <div className="bg-sand-50 p-6 sm:p-8 rounded-3xl border border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-lg font-bold text-sand-900">
            Encountered an uncomfortable host or traveller?
          </h3>
          <p className="text-xs text-sand-600 mt-1 max-w-xl">
            We operate zero tolerance for harassment, misrepresentation, or unsafe conduct. Reports are flagged directly to the admin moderation desk.
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap"
        >
          Submit Confidential Report
        </button>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sand-300 space-y-4">
            <h3 className="font-serif text-lg font-bold text-sand-900">
              Confidential Safety Incident Report
            </h3>
            <p className="text-xs text-sand-600">
              Your report goes directly to the women's safety moderation team. The reported user will not be alerted to your identity.
            </p>

            {reportSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-2xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p>Report Submitted Successfully.</p>
                <p className="text-[11px] font-normal">Our safety officer is reviewing this immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleReport} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what occurred, date, location, or name of listing..."
                  value={reportText}
                  onChange={e => setReportText(e.target.value)}
                  className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="flex-1 py-2 rounded-full bg-sand-100 text-sand-700 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-full bg-red-600 text-white text-xs font-bold"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

