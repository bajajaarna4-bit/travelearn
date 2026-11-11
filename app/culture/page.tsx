'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Volume2, MapPin, Shield, Star, Utensils, 
  AlertCircle, Sparkles, Heart, Check, Play
} from 'lucide-react';
import { SEED_PLACES } from '@/lib/seedData';
import { PlaceItem, PhraseItem } from '@/lib/types';

export default function CulturePage() {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('pl_pushkar');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  const selectedPlace = SEED_PLACES.find(p => p.id === selectedPlaceId) || SEED_PLACES[0];

  // Web Speech API for tap-to-hear audio pronunciation!
  const speakPhrase = (phrase: PhraseItem) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.audioText);
      utterance.lang = 'hi-IN'; // Hindi India
      utterance.rate = 0.85; // slightly slower for slow roamers learning pronunciation
      setPlayingPhraseId(phrase.id);
      utterance.onend = () => setPlayingPhraseId(null);
      utterance.onerror = () => setPlayingPhraseId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
          Module 5 • Culture & Phrase Flash
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sand-900">
          The Slow Culture Explorer
        </h1>
        <p className="text-xs sm:text-sm text-sand-600">
          Curated sacred towns, local foods, comfort vs sukoon ratings, and audio-ready pocket phrases.
        </p>
      </div>

      {/* Place Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        {SEED_PLACES.map((place) => {
          const isSelected = selectedPlace.id === place.id;
          return (
            <button
              key={place.id}
              onClick={() => setSelectedPlaceId(place.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-sukoon-600 text-white shadow-md scale-105'
                  : 'bg-white text-sand-700 hover:bg-sand-100 border border-sand-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{place.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Place Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Place Overview (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-sm">
            <div className="relative aspect-[16/9] bg-sand-200">
              <img
                src={selectedPlace.images[0]}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-devanagari text-amber-200 block mb-0.5">
                  {selectedPlace.hindiName}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  {selectedPlace.name}
                </h2>
                <p className="text-xs text-sand-200 italic mt-0.5">
                  "{selectedPlace.tagline}"
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
                {selectedPlace.description}
              </p>

              {/* Comfort vs Sukoon Sliders */}
              <div className="grid grid-cols-2 gap-4 bg-sand-50 p-4 rounded-2xl border border-sand-200 text-xs">
                <div>
                  <span className="text-[10px] text-sand-500 font-bold uppercase block">
                    Sukoon Rating (Peace)
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-sukoon-700 font-bold text-sm">
                    <span>{selectedPlace.sukoonLevel} / 5</span>
                    <span className="text-xs text-sand-400 font-normal">• Profound Calming</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-sand-500 font-bold uppercase block">
                    Comfort Level
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-sand-800 font-bold text-sm">
                    <span>{selectedPlace.comfortLevel} / 5</span>
                    <span className="text-xs text-sand-400 font-normal">• Authentic & Simple</span>
                  </div>
                </div>
              </div>

              {/* Local Food Specialties */}
              <div className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-sand-900 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <span>Must-Taste Authentic Local Food:</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPlace.localFood.map((food) => (
                    <span
                      key={food}
                      className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              {/* Women Safety Tips for this region */}
              <div className="bg-forest-50 p-4 rounded-2xl border border-forest-200 space-y-2">
                <h3 className="font-serif text-xs font-bold text-forest-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-forest-600" />
                  <span>Women Roamer Safety Tips for {selectedPlace.name}:</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-forest-800/90">
                  {selectedPlace.safetyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-forest-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Pocket Audio Phrasebook (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-sukoon-100 text-sukoon-700 flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-sand-900">
                    Audio Phrase Flash
                  </h3>
                  <p className="text-[11px] text-sand-500">Tap speaker to hear authentic Hindi audio</p>
                </div>
              </div>

              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sand-100 text-sand-600">
                Web Speech API
              </span>
            </div>

            {/* Phrases List */}
            <div className="space-y-3">
              {selectedPlace.phrases.map((phrase) => {
                const isSpeaking = playingPhraseId === phrase.id;
                return (
                  <div
                    key={phrase.id}
                    className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 hover:border-sukoon-300 transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-sukoon-600">
                        {phrase.context}
                      </span>
                      <p className="text-xs font-semibold text-sand-900">
                        {phrase.english}
                      </p>
                      <p className="font-devanagari text-sm font-medium text-sukoon-900">
                        {phrase.hindiDevanagari}
                      </p>
                      <p className="text-[11px] text-sand-500 italic">
                        "{phrase.transliteration}"
                      </p>
                    </div>

                    <button
                      onClick={() => speakPhrase(phrase)}
                      className={`p-2 rounded-xl transition-all shadow-xs flex-shrink-0 ${
                        isSpeaking
                          ? 'bg-sukoon-600 text-white animate-pulse'
                          : 'bg-white hover:bg-sukoon-50 text-sand-700 hover:text-sukoon-700 border border-sand-200'
                      }`}
                      title="Tap to hear pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-sand-400 text-center italic pt-2">
              Speaking even 3 polite words in the local tongue breaks boundaries and fosters mutual respect.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

