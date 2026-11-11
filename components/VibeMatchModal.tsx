'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, X, Sparkles, Shield, Coffee, MapPin, 
  MessageSquare, Check, RefreshCw, Star
} from 'lucide-react';
import { useApp } from '@/lib/store';

interface VibeMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VibeCandidate {
  id: string;
  name: string;
  age: number;
  avatar: string;
  location: string;
  currentStop: string;
  isFemale: boolean;
  isVerified: boolean;
  pace: string;
  budgetPerDay: string;
  spiritualFocus: string;
  interests: string[];
  bio: string;
  matchScore: number;
}

const CANDIDATES: VibeCandidate[] = [
  {
    id: 'cand_1',
    name: 'Ananya & Chahat',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    location: 'Currently in Pushkar',
    currentStop: 'Heading to Rishikesh next Tuesday',
    isFemale: true,
    isVerified: true,
    pace: 'Super Slow (3 weeks per town)',
    budgetPerDay: '₹400 / day (Dorm & Ashram)',
    spiritualFocus: 'Silent Vipassana & Kirtan',
    interests: ['Yoga', 'Journaling', 'Street Cats', 'Chai Stalls'],
    bio: 'Two sisters travelling across India on sleeper trains. Looking for another woman roamer to split auto-rickshaws, explore evening ghats safely, and share herbal tea.',
    matchScore: 96
  },
  {
    id: 'cand_2',
    name: 'Kabir Verma',
    age: 29,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    location: 'Kasol / Parvati Valley',
    currentStop: 'Staying at an organic apple farm',
    isFemale: false,
    isVerified: true,
    pace: 'Slow Nomad (1 month minimum)',
    budgetPerDay: '₹550 / day',
    spiritualFocus: 'Forest grounding & Flute',
    interests: ['Wood Carving', 'Himalayan Flora', 'Sourdough'],
    bio: 'Permaculture enthusiast and folk musician. Happy to share rides from Bhuntar or trade wood carving lessons for cooking tips.',
    matchScore: 88
  },
  {
    id: 'cand_3',
    name: 'Pooja Bhatt',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    location: 'Varanasi',
    currentStop: 'Attending classical vocal workshops at Assi Ghat',
    isFemale: true,
    isVerified: true,
    pace: 'Contemplative Slow',
    budgetPerDay: '₹350 / day (Ashram living)',
    spiritualFocus: 'Dhrupad & Kabir Poetry',
    interests: ['Classical Sitar', 'Temple Architecture', 'Sketching'],
    bio: 'Solo female traveller from Pune. Seeking safe travel companions for early morning Ganga sunrise boat rides and safe alley walks.',
    matchScore: 94
  }
];

export default function VibeMatchModal({ isOpen, onClose }: VibeMatchModalProps) {
  const { isWomenSafetyMode, openChatWith, addKarma } = useApp();
  const [candidates, setCandidates] = useState<VibeCandidate[]>(CANDIDATES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [womenOnlyFilter, setWomenOnlyFilter] = useState(isWomenSafetyMode);
  const [matchedCandidate, setMatchedCandidate] = useState<VibeCandidate | null>(null);

  if (!isOpen) return null;

  const filtered = womenOnlyFilter ? candidates.filter(c => c.isFemale) : candidates;
  const current = filtered[currentIndex];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const handlePass = () => {
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handleConnect = () => {
    if (!current) return;
    triggerConfetti();
    setMatchedCandidate(current);
    addKarma(20, 'Connected with a slow travel soulmate');
  };

  const handleStartChat = () => {
    if (!matchedCandidate) return;
    openChatWith({
      id: matchedCandidate.id,
      name: matchedCandidate.name,
      avatar: matchedCandidate.avatar
    });
    setMatchedCandidate(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-hidden shadow-2xl border border-sand-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-terracotta to-sukoon-600 text-white p-4 relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold">Vibe Match</h2>
              <p className="text-[11px] text-rose-100">Find aligned slow travel companions</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWomenOnlyFilter(prev => !prev)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                womenOnlyFilter
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              title="Filter Women Travellers Only"
            >
              <Shield className="w-3 h-3" />
              <span>Women Only</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto">
          {matchedCandidate ? (
            /* Celebration Screen */
            <div className="text-center py-6 space-y-4 animate-scaleUp">
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-inner">
                <Heart className="w-10 h-10 fill-current animate-bounce" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-sand-900">It's a Roam Match!</h3>
                <p className="text-xs text-sand-600 mt-1 max-w-xs mx-auto">
                  You and <strong>{matchedCandidate.name}</strong> share a <strong>{matchedCandidate.matchScore}%</strong> travel vibe alignment.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 py-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="You"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-sukoon-500"
                />
                <span className="text-sand-400 font-bold">🤝</span>
                <img
                  src={matchedCandidate.avatar}
                  alt={matchedCandidate.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-500"
                />
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleStartChat}
                  className="w-full py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Say Hello & Invite for Chai
                </button>
                <button
                  onClick={() => setMatchedCandidate(null)}
                  className="w-full py-2 rounded-full bg-sand-100 text-sand-700 font-semibold text-xs hover:bg-sand-200 transition-colors"
                >
                  Keep Browsing
                </button>
              </div>
            </div>
          ) : current ? (
            /* Roamer Candidate Card */
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-sand-200">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Match Score Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-emerald-300 font-bold text-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{current.matchScore}% Vibe Match</span>
                </div>

                {/* Name & Location on Image */}
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-bold">{current.name}, {current.age}</h3>
                    {current.isVerified && (
                      <span className="p-0.5 rounded-full bg-emerald-500 text-white" title="Verified Gov ID">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-sand-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{current.location}</span>
                  </p>
                </div>
              </div>

              {/* Bio & Vibe Traits */}
              <div className="space-y-3">
                <p className="text-xs text-sand-800 italic bg-sand-50 p-2.5 rounded-xl border border-sand-200">
                  "{current.bio}"
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-sand-50 p-2 rounded-xl border border-sand-200">
                    <span className="text-[10px] text-sand-500 font-bold block uppercase">Travel Pace</span>
                    <span className="font-semibold text-sand-800">{current.pace}</span>
                  </div>
                  <div className="bg-sand-50 p-2 rounded-xl border border-sand-200">
                    <span className="text-[10px] text-sand-500 font-bold block uppercase">Budget Target</span>
                    <span className="font-semibold text-sand-800">{current.budgetPerDay}</span>
                  </div>
                  <div className="bg-sand-50 p-2 rounded-xl border border-sand-200 col-span-2">
                    <span className="text-[10px] text-sand-500 font-bold block uppercase">Spiritual / Daily Practice</span>
                    <span className="font-semibold text-sukoon-700">{current.spiritualFocus}</span>
                  </div>
                </div>

                {/* Interest tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {current.interests.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-sand-100 text-sand-700 text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Swipe Action Controls */}
              <div className="flex items-center justify-center gap-6 pt-3">
                {/* Pass */}
                <button
                  onClick={handlePass}
                  className="w-14 h-14 rounded-full bg-white border border-sand-300 text-sand-600 hover:bg-sand-100 hover:text-sand-900 flex items-center justify-center shadow-md active:scale-95 transition-all"
                  aria-label="Pass to Next Roamer"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Connect */}
                <button
                  onClick={handleConnect}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-terracotta text-white flex items-center justify-center shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
                  aria-label="Connect and Share Chai"
                >
                  <Heart className="w-6 h-6 fill-current" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm font-semibold text-sand-700">No more roamers in this batch.</p>
              <button
                onClick={() => setCurrentIndex(0)}
                className="px-4 py-2 bg-sukoon-600 text-white rounded-full text-xs font-semibold"
              >
                Reset & Browse Again
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

