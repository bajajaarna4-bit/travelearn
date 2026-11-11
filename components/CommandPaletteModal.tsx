'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Compass, Briefcase, Bed, Car, Heart, 
  ShieldAlert, BookOpen, Coffee, Sparkles, X, PlusCircle, Shield
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCompass: () => void;
  onOpenVibeMatch: () => void;
  onOpenJourneyWeaver: () => void;
  onOpenSafetyShield: () => void;
}

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onOpenCompass,
  onOpenVibeMatch,
  onOpenJourneyWeaver,
  onOpenSafetyShield
}: CommandPaletteModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle palette
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    {
      label: 'Explore Roamer Map',
      description: 'Find stays, gigs and sacred spots across India',
      icon: <Compass className="w-4 h-4 text-sukoon-600" />,
      action: () => { router.push('/explore'); onClose(); }
    },
    {
      label: 'Open Sukoon Compass',
      description: 'Rotate dial to align destinations with your soul mood',
      icon: <Compass className="w-4 h-4 text-amber-600" />,
      action: () => { onClose(); onOpenCompass(); }
    },
    {
      label: 'Vibe Match Roamers',
      description: 'Swipe & connect with slow travel soulmates',
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      action: () => { onClose(); onOpenVibeMatch(); }
    },
    {
      label: 'Journey Weaver Route Planner',
      description: 'Draw slow route across Rajasthan, Rishikesh & Varanasi',
      icon: <Sparkles className="w-4 h-4 text-amber-600" />,
      action: () => { onClose(); onOpenJourneyWeaver(); }
    },
    {
      label: 'Women Safety Shield & SOS',
      description: 'Instant GPS broadcast, fake call & check-in timer',
      icon: <ShieldAlert className="w-4 h-4 text-red-600" />,
      action: () => { onClose(); onOpenSafetyShield(); }
    },
    {
      label: 'Work & Earn (Gigs)',
      description: 'Browse hostel, farm & community work-exchanges',
      icon: <Briefcase className="w-4 h-4 text-sukoon-700" />,
      action: () => { router.push('/gigs'); onClose(); }
    },
    {
      label: 'Peaceful Stays & Ashrams',
      description: 'Free work-exchanges, ashram dorms & female homestays',
      icon: <Bed className="w-4 h-4 text-forest-600" />,
      action: () => { router.push('/stays'); onClose(); }
    },
    {
      label: 'Ride & Cost Sharing',
      description: 'Split shared taxis, trains & carpools safely',
      icon: <Car className="w-4 h-4 text-sand-800" />,
      action: () => { router.push('/rides'); onClose(); }
    },
    {
      label: 'Culture Explorer & Audio Phrasebook',
      description: 'Learn Hindi phrases with tap-to-speak audio',
      icon: <BookOpen className="w-4 h-4 text-indigo-600" />,
      action: () => { router.push('/culture'); onClose(); }
    },
    {
      label: 'Post a Listing Wizard',
      description: 'Offer a stay, work gig, ride or experience',
      icon: <PlusCircle className="w-4 h-4 text-sukoon-600" />,
      action: () => { router.push('/post'); onClose(); }
    },
    {
      label: 'Admin Moderation & Verifications',
      description: 'Review IDs, safety reports & listings queue',
      icon: <Shield className="w-4 h-4 text-stone-700" />,
      action: () => { router.push('/admin'); onClose(); }
    }
  ];

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl border border-sand-300 flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-sand-200 flex items-center gap-3 bg-sand-50">
          <Search className="w-5 h-5 text-sand-500" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, page or destination..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm focus:outline-none text-sand-900 placeholder:text-sand-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-sand-400 hover:text-sand-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto flex-1 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="w-full text-left p-2.5 rounded-2xl hover:bg-sand-100 transition-colors flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-xl bg-sand-200/60 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1 truncate">
                  <h4 className="text-xs font-bold text-sand-900 group-hover:text-sukoon-700 transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-sand-500 truncate">{item.description}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-sand-500">
              No matching pages or tools found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-sand-100 border-t border-sand-200 flex justify-between text-[10px] text-sand-500">
          <span>Tip: Esc to close</span>
          <span>SukoonRoute Fast Navigation</span>
        </div>

      </div>
    </div>
  );
}

