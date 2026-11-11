'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, PhoneCall, Clock, MapPin, X, AlertTriangle, 
  CheckCircle2, Share2, Volume2, ShieldCheck, HeartHandshake, Phone
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { EMERGENCY_NUMBERS } from '@/lib/seedData';

interface SafetyShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SafetyShieldModal({ isOpen, onClose }: SafetyShieldModalProps) {
  const { 
    user, 
    isSOSActive, 
    triggerSOS, 
    cancelSOS,
    triggerFakeCall,
    checkInMinutesLeft,
    startCheckInTimer,
    confirmCheckInSafe
  } = useApp();

  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [selectedTimerMins, setSelectedTimerMins] = useState<number>(30);
  const [simulatedCoords, setSimulatedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setSimulatedCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setSimulatedCoords({ lat: 26.4897, lng: 74.5511 }) // fallback to Pushkar
      );
    }
  }, [isOpen]);

  // Audio siren synthesizer for SOS
  const playSiren = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handleHoldSOS = () => {
    playSiren();
    triggerSOS();
  };

  const handleShareLiveLocation = () => {
    const coordsStr = simulatedCoords ? `${simulatedCoords.lat.toFixed(4)}, ${simulatedCoords.lng.toFixed(4)}` : 'Pushkar, Rajasthan';
    const text = `🚨 SukoonRoute Safety Alert: I am sharing my live location: https://maps.google.com/?q=${coordsStr}. Trusted contacts notified.`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sand-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-forest-800 to-forest-700 text-white p-5 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-emerald-300">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Women Safety Shield</h2>
              <p className="text-xs text-emerald-100">
                Instant guardian tools for female solo roamers
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Active SOS Banner if triggered */}
          {isSOSActive ? (
            <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 text-center space-y-3 sos-pulse">
              <div className="flex items-center justify-center gap-2 text-red-700 font-bold text-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 animate-bounce" />
                <span>ACTIVE SOS BROADCAST IN PROGRESS</span>
              </div>
              <p className="text-xs text-red-800">
                Live GPS coordinates sent to Sunita Sharma (Mother) & Ananya Sen.
                Local emergency services link activated.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={cancelSOS}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs hover:bg-red-700 transition-colors"
                >
                  Cancel SOS (I am Safe)
                </button>
                <a
                  href="tel:112"
                  className="px-4 py-2 bg-stone-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  Call 112 Police
                </a>
              </div>
            </div>
          ) : (
            /* Big SOS Button */
            <div className="text-center bg-sand-50 p-5 rounded-2xl border border-sand-200">
              <p className="text-xs font-semibold text-sand-600 uppercase tracking-wider mb-3">
                Emergency One-Tap SOS
              </p>
              <button
                onClick={handleHoldSOS}
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex flex-col items-center justify-center shadow-lg shadow-red-500/30 active:scale-95 hover:scale-105 transition-all focus:outline-none"
              >
                <ShieldAlert className="w-8 h-8 mb-1 animate-pulse" />
                <span className="text-xs font-extrabold tracking-wide">SOS</span>
              </button>
              <p className="text-[11px] text-sand-500 mt-3">
                Tap to broadcast emergency siren & live GPS coordinates to your 2 verified contacts.
              </p>
            </div>
          )}

          {/* Quick Guardian Tools: Fake Call & Check-in Timer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Fake Call Trigger */}
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <PhoneCall className="w-5 h-5 text-sukoon-600" />
                <h3 className="font-semibold text-sm text-sand-900">Fake Incoming Call</h3>
              </div>
              <p className="text-xs text-sand-600 mb-4">
                Need an excuse to leave an uncomfortable space or taxi? Ring your phone now.
              </p>
              <button
                onClick={() => {
                  onClose();
                  triggerFakeCall();
                }}
                className="w-full py-2 bg-sukoon-600 hover:bg-sukoon-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Ring Phone in 5s
              </button>
            </div>

            {/* Check-in Timer */}
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-forest-600" />
                <h3 className="font-semibold text-sm text-sand-900">"Arrived Safe" Timer</h3>
              </div>
              
              {checkInMinutesLeft !== null ? (
                <div className="space-y-2 mb-2">
                  <div className="flex items-center justify-between text-xs font-bold text-forest-800 bg-forest-100 p-2 rounded-xl">
                    <span>Countdown:</span>
                    <span>{checkInMinutesLeft} mins left</span>
                  </div>
                  <button
                    onClick={confirmCheckInSafe}
                    className="w-full py-1.5 bg-forest-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    I Have Arrived Safe
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-sand-600 mb-3">
                    Auto-alerts your emergency contacts if you haven't checked in by timer end.
                  </p>
                  <div className="flex gap-1.5 mb-3">
                    {[15, 30, 60].map(mins => (
                      <button
                        key={mins}
                        onClick={() => setSelectedTimerMins(mins)}
                        className={`flex-1 py-1 text-xs rounded-lg font-medium border ${
                          selectedTimerMins === mins
                            ? 'bg-forest-600 text-white border-forest-600'
                            : 'bg-white text-sand-700 border-sand-300'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => startCheckInTimer(selectedTimerMins)}
                    className="w-full py-2 bg-forest-600 hover:bg-forest-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Start {selectedTimerMins}m Timer
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Live Location Share */}
          <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sukoon-600" />
                <span className="text-xs font-semibold text-sand-800">
                  {simulatedCoords ? `GPS: ${simulatedCoords.lat.toFixed(4)}° N, ${simulatedCoords.lng.toFixed(4)}° E` : 'Pushkar, Rajasthan'}
                </span>
              </div>
              <button
                onClick={handleShareLiveLocation}
                className="flex items-center gap-1 text-xs font-bold text-sukoon-700 hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copySuccess ? 'Link Copied!' : 'Copy Share Link'}
              </button>
            </div>
          </div>

          {/* Emergency Numbers Quick Dial */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-sand-700 uppercase tracking-wider">
              Emergency Numbers (Toll-Free in India)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {EMERGENCY_NUMBERS.slice(0, 4).map((em) => (
                <a
                  key={em.service}
                  href={`tel:${em.number}`}
                  className="flex items-center justify-between p-2.5 bg-white border border-sand-200 rounded-xl hover:border-forest-500 hover:bg-forest-50/50 transition-colors group"
                >
                  <div className="truncate pr-1">
                    <p className="text-[11px] font-medium text-sand-900 truncate">{em.service}</p>
                    <p className="text-xs font-bold text-forest-700">{em.number}</p>
                  </div>
                  <Phone className="w-3.5 h-3.5 text-sand-400 group-hover:text-forest-600 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
