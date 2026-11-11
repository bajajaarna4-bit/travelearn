'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Moon, X, Play, Pause, RotateCcw } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function SilenceModeOverlay() {
  const { isSilenceMode, toggleSilenceMode } = useApp();
  const [ambientAudioOn, setAmbientAudioOn] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(300); // 5 min default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Breathing loop
  useEffect(() => {
    if (!isSilenceMode) return;
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isSilenceMode]);

  // Meditation timer countdown
  useEffect(() => {
    if (!isTimerRunning || timerSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setTimerSecondsLeft(t => {
        if (t <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  // Web Audio Himalayan Singing Bowl & Soft River Pink Noise Generator
  const startSingingBowlAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Singing bowl harmonic oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(288, ctx.currentTime); // 288Hz meditative frequency
      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      noiseNodeRef.current = osc;
      setAmbientAudioOn(true);
    } catch {
      // Audio not supported
    }
  };

  const stopAudio = () => {
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as OscillatorNode).stop();
      } catch {
        // already stopped
      }
      noiseNodeRef.current = null;
    }
    setAmbientAudioOn(false);
  };

  const toggleSound = () => {
    if (ambientAudioOn) {
      stopAudio();
    } else {
      startSingingBowlAudio();
    }
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSilenceMode) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0C1B] text-[#E8DCC9] flex flex-col justify-between p-6 sm:p-12 animate-fadeIn transition-all">
      
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Moon className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="font-serif tracking-widest text-xs uppercase text-amber-200">
            Silence Mode • मौन ध्यान
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              ambientAudioOn
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-white/5 text-stone-400 border-white/10 hover:bg-white/10'
            }`}
          >
            {ambientAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{ambientAudioOn ? 'Singing Bowl Playing' : 'Play Meditation Sound'}</span>
          </button>

          <button
            onClick={() => {
              stopAudio();
              toggleSilenceMode();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Exit Silence Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Breathing Ring */}
      <div className="flex flex-col items-center justify-center my-auto space-y-8">
        
        <div className="relative flex items-center justify-center">
          {/* Animated Glow Rings */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-amber-400/20 animate-breathe flex items-center justify-center">
            <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-amber-500/10 to-indigo-500/20 border border-amber-400/40 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 shadow-glow-saffron">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
                {breathPhase}
              </span>
              <p className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {formatTimer(timerSecondsLeft)}
              </p>
              <span className="text-[10px] text-amber-200/60 mt-1 font-devanagari">
                शान्तिः शान्तिः शान्तिः
              </span>
            </div>
          </div>
        </div>

        {/* Timer Control Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="px-6 py-2.5 rounded-full bg-amber-500/90 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isTimerRunning ? 'Pause Dhyana' : 'Start Meditation'}</span>
          </button>

          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSecondsLeft(300);
            }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 border border-white/10 transition-colors"
            title="Reset 5 Minutes"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Duration Buttons */}
        <div className="flex gap-2 text-xs">
          {[5, 10, 15, 20].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSecondsLeft(mins * 60);
              }}
              className={`px-3 py-1 rounded-full border text-[11px] font-medium transition-colors ${
                timerSecondsLeft === mins * 60
                  ? 'bg-white/20 text-white border-amber-400/50'
                  : 'bg-white/5 text-stone-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

      </div>

      {/* Bottom Contemplative Verse */}
      <div className="max-w-md mx-auto text-center space-y-1">
        <p className="text-sm font-serif italic text-amber-200/90">
          "The journey is not to see different lands, but to see with still eyes."
        </p>
        <p className="text-[11px] text-stone-500">
          Ganga Bank Contemplation • Tapovan, Rishikesh
        </p>
      </div>

    </div>
  );
}
