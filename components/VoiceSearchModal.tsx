'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Search, X, Sparkles, ArrowRight, Volume2 } from 'lucide-react';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceSearchModal({ isOpen, onClose }: VoiceSearchModalProps) {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsedIntent, setParsedIntent] = useState<{ query: string; targetUrl: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setParsedIntent(null);
      startVoiceListening();
    } else {
      stopVoiceListening();
    }
  }, [isOpen]);

  const startVoiceListening = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN'; // English India

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event: any) => {
          const current = event.results[0][0].transcript;
          setTranscript(current);
          parseSearchSpeech(current);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
      }
    } else {
      // simulated speech input prompt
      setIsListening(false);
    }
  };

  const stopVoiceListening = () => {
    setIsListening(false);
  };

  const parseSearchSpeech = (text: string) => {
    const lower = text.toLowerCase();
    let target = '/explore';

    if (lower.includes('work') || lower.includes('gig') || lower.includes('earn') || lower.includes('hostel')) {
      target = '/gigs';
    } else if (lower.includes('stay') || lower.includes('ashram') || lower.includes('homestay') || lower.includes('dorm')) {
      target = '/stays';
    } else if (lower.includes('ride') || lower.includes('carpool') || lower.includes('taxi') || lower.includes('train')) {
      target = '/rides';
    } else if (lower.includes('phrase') || lower.includes('language') || lower.includes('culture') || lower.includes('hindi')) {
      target = '/culture';
    } else if (lower.includes('safety') || lower.includes('sos') || lower.includes('emergency')) {
      target = '/safety';
    }

    setParsedIntent({
      query: text,
      targetUrl: target
    });
  };

  if (!isOpen) return null;

  const handleSimulatedPreset = (presetText: string) => {
    setTranscript(presetText);
    parseSearchSpeech(presetText);
  };

  const handleExecuteSearch = () => {
    if (parsedIntent) {
      router.push(parsedIntent.targetUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-4xl max-w-md w-full p-6 shadow-2xl border border-sand-300 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sand-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sukoon-100 text-sukoon-700 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-sand-900">Voice Search</h3>
              <p className="text-[10px] text-sand-500">Speak your travel destination or sanctuary need</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-sand-400 hover:text-sand-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Mic Graphic */}
        <div className="text-center space-y-3 py-2">
          <button
            onClick={isListening ? stopVoiceListening : startVoiceListening}
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white shadow-lg transition-transform ${
              isListening
                ? 'bg-red-500 animate-pulse ring-4 ring-red-200 scale-105'
                : 'bg-sukoon-600 hover:scale-105 shadow-sukoon-600/30'
            }`}
          >
            {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
          </button>

          <p className="text-xs font-semibold text-sand-700">
            {isListening ? 'Listening... Speak now' : 'Tap microphone to speak'}
          </p>
        </div>

        {/* Live Transcript Box */}
        <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 min-h-[70px] text-xs text-sand-800 flex flex-col justify-center text-center">
          {transcript ? (
            <p className="font-serif font-bold text-sm text-sand-900">"{transcript}"</p>
          ) : (
            <span className="text-sand-400 italic">"Find me a women-only stay in Pushkar"</span>
          )}
        </div>

        {/* Suggested Quick Speech Presets */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-sand-500 block">Try saying:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Women-only stay near Pushkar',
              'Work-exchange gig in Kasol',
              'Train companion to Rishikesh',
              'Audio phrases for Varanasi'
            ].map(preset => (
              <button
                key={preset}
                onClick={() => handleSimulatedPreset(preset)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-sand-100 hover:bg-sand-200 text-sand-700 border border-sand-200"
              >
                "{preset}"
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {parsedIntent && (
          <button
            onClick={handleExecuteSearch}
            className="w-full py-2.5 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 animate-fadeIn"
          >
            <span>Proceed to {parsedIntent.targetUrl.replace('/', '').toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
}
