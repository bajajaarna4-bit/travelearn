'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, Volume2, User } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function FakeCallModal() {
  const { isFakeCallActive, dismissFakeCall } = useApp();
  const [callState, setCallState] = useState<'ringing' | 'connected'>('ringing');
  const [seconds, setSeconds] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synthesize telephone ring
  const playPhoneRing = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = 440; // US standard ring frequencies
      osc2.frequency.value = 480;

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.2);
      osc2.stop(ctx.currentTime + 1.2);
    } catch {
      // AudioContext unavailable
    }
  };

  useEffect(() => {
    if (isFakeCallActive) {
      setCallState('ringing');
      setSeconds(0);
      playPhoneRing();
      ringIntervalRef.current = setInterval(() => {
        playPhoneRing();
      }, 3000);
    } else {
      if (ringIntervalRef.current) clearInterval(ringIntervalRef.current);
    }
    return () => {
      if (ringIntervalRef.current) clearInterval(ringIntervalRef.current);
    };
  }, [isFakeCallActive]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  if (!isFakeCallActive) return null;

  const handleAccept = () => {
    if (ringIntervalRef.current) clearInterval(ringIntervalRef.current);
    setCallState('connected');
  };

  const handleDecline = () => {
    if (ringIntervalRef.current) clearInterval(ringIntervalRef.current);
    dismissFakeCall();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-between py-16 px-6 text-white font-sans animate-fadeIn">
      {/* Top Caller Info */}
      <div className="flex flex-col items-center space-y-4 mt-8 text-center">
        <div className="w-28 h-28 rounded-full bg-stone-800 border-2 border-stone-600 flex items-center justify-center overflow-hidden shadow-2xl relative">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
            alt="Devika Host"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Devika Rathore (Host)</h2>
          <p className="text-stone-400 text-sm mt-1">
            {callState === 'ringing' ? 'Incoming Call...' : formatTime(seconds)}
          </p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
            Verified Sanctuary Host
          </span>
        </div>
      </div>

      {/* Scripted Simulation Prompt for Roamer */}
      <div className="max-w-xs text-center bg-stone-900/80 p-4 rounded-2xl border border-stone-800 text-stone-300 text-xs">
        {callState === 'ringing' ? (
          <p>Tap <strong>Accept</strong>. Speak aloud: <em className="text-white">"Haan Devika di, I am right around the corner, see you in 2 minutes!"</em></p>
        ) : (
          <div className="space-y-1">
            <p className="text-emerald-400 font-semibold">● Audio line connected</p>
            <p className="text-[11px] text-stone-400">Pretend to hold your conversation to step away gracefully.</p>
          </div>
        )}
      </div>

      {/* Bottom Action Controls */}
      <div className="w-full max-w-xs flex items-center justify-around pb-6">
        {callState === 'ringing' ? (
          <>
            {/* Decline */}
            <button
              onClick={handleDecline}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-lg shadow-red-600/40 transition-transform active:scale-90"
              aria-label="Decline Call"
            >
              <PhoneOff className="w-7 h-7" />
            </button>

            {/* Accept */}
            <button
              onClick={handleAccept}
              className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/40 transition-transform active:scale-90 animate-bounce"
              aria-label="Accept Call"
            >
              <Phone className="w-7 h-7" />
            </button>
          </>
        ) : (
          /* Hangup */
          <button
            onClick={handleDecline}
            className="w-18 h-18 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 flex items-center gap-2 text-white font-bold text-sm shadow-xl transition-transform active:scale-90"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </button>
        )}
      </div>
    </div>
  );
}

