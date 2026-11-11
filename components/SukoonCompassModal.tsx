'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Moon, Flame, Wind, Heart, Mountain, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/store';

interface SukoonCompassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MoodType = 'quiet' | 'curious' | 'adventurous' | 'healing' | 'social' | 'uncomfortable-growing';

interface MoodConfig {
  id: MoodType;
  label: string;
  hindi: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  recommendedPlaces: {
    title: string;
    location: string;
    sukoon: number;
    comfort: number;
    href: string;
    type: 'stay' | 'gig' | 'place';
  }[];
}

const MOODS: MoodConfig[] = [
  {
    id: 'quiet',
    label: 'Quiet & Solitary',
    hindi: 'एकान्त एवं मौन',
    tagline: 'Deep stillness, silence, writing retreats and sacred lakes',
    icon: <Moon className="w-5 h-5" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 border-indigo-200',
    recommendedPlaces: [
      {
        title: 'Savitri Hills Peace Hermitage (Women-Only)',
        location: 'Pushkar, Rajasthan',
        sukoon: 5,
        comfort: 4,
        href: '/stays/stay_1',
        type: 'stay'
      },
      {
        title: 'Sanskrit Manuscript Transcription',
        location: 'Varanasi Vedic Library',
        sukoon: 5,
        comfort: 2,
        href: '/gigs/gig_3',
        type: 'gig'
      }
    ]
  },
  {
    id: 'healing',
    label: 'Healing & Detox',
    hindi: 'कायाकल्प एवं आरोग्य',
    tagline: 'Ganga morning dips, Sattvic meals, pranayama and herbal therapy',
    icon: <Wind className="w-5 h-5" />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 border-teal-200',
    recommendedPlaces: [
      {
        title: 'Ganga Bank Vedic Ashram Dorm & Meditation',
        location: 'Tapovan, Rishikesh',
        sukoon: 5,
        comfort: 3,
        href: '/stays/stay_2',
        type: 'stay'
      },
      {
        title: 'Pushkar Desert Twilight Chanting Circle',
        location: 'Pushkar Valley',
        sukoon: 5,
        comfort: 3,
        href: '/experiences',
        type: 'place'
      }
    ]
  },
  {
    id: 'curious',
    label: 'Curious & Learning',
    hindi: 'ज्ञान एवं स्वाध्याय',
    tagline: 'Woodblock hand printing, local language exchange, spice kitchens',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    recommendedPlaces: [
      {
        title: 'Rajasthani Woodblock Printing Workshop',
        location: 'Sanganer, Jaipur',
        sukoon: 4,
        comfort: 4,
        href: '/experiences',
        type: 'place'
      },
      {
        title: 'Eco Signage & Cafe Mural Painter',
        location: 'Fort Kochi, Kerala',
        sukoon: 4,
        comfort: 4,
        href: '/gigs/gig_4',
        type: 'gig'
      }
    ]
  },
  {
    id: 'adventurous',
    label: 'Adventurous & Wild',
    hindi: 'अन्वेषण एवं प्रकृति',
    tagline: 'Cedar forests, Parvati river trails, apple orchards, high passes',
    icon: <Mountain className="w-5 h-5" />,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
    recommendedPlaces: [
      {
        title: 'Kasol Apple Orchard Stone Cottage',
        location: 'Tosh Trail, Himachal',
        sukoon: 5,
        comfort: 3,
        href: '/stays/stay_3',
        type: 'stay'
      },
      {
        title: 'Permaculture Farm & Chai Hand',
        location: 'Challal Trail, Kasol',
        sukoon: 5,
        comfort: 3,
        href: '/gigs/gig_2',
        type: 'gig'
      }
    ]
  },
  {
    id: 'uncomfortable-growing',
    label: 'Uncomfortable-but-Growing',
    hindi: 'तपस्या एवं आत्म-खोज',
    tagline: 'Simple floor bedding, river ghat steps, intense cultural immersion',
    icon: <Flame className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    recommendedPlaces: [
      {
        title: 'Ancient Ghat Roof Room overlooking Ganga',
        location: 'Munshi Ghat, Varanasi',
        sukoon: 5,
        comfort: 2,
        href: '/stays/stay_4',
        type: 'stay'
      },
      {
        title: 'Kashi Dawn Boat & Kabir Poetry',
        location: 'Assi Ghat, Varanasi',
        sukoon: 5,
        comfort: 2,
        href: '/experiences',
        type: 'place'
      }
    ]
  },
  {
    id: 'social',
    label: 'Social & Community',
    hindi: 'सत्संग एवं मैत्री',
    tagline: 'Chai tables, travel buddies, music jam sessions, cost-sharing carpools',
    icon: <Heart className="w-5 h-5" />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
    recommendedPlaces: [
      {
        title: 'Hostel Garden & Social Host',
        location: 'Brahma Temple, Pushkar',
        sukoon: 5,
        comfort: 4,
        href: '/gigs/gig_1',
        type: 'gig'
      },
      {
        title: 'Savitri Temple Chai Stall Meetup',
        location: 'Pushkar, Rajasthan',
        sukoon: 5,
        comfort: 3,
        href: '/culture',
        type: 'place'
      }
    ]
  }
];

export default function SukoonCompassModal({ isOpen, onClose }: SukoonCompassModalProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType>('quiet');

  if (!isOpen) return null;

  const currentMood = MOODS.find(m => m.id === selectedMood) || MOODS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sand-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sand-900 via-sukoon-900 to-terracotta text-white p-6 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Compass className="w-7 h-7 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold">The Sukoon Compass</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  Mood Navigator
                </span>
              </div>
              <p className="text-xs text-sand-300 mt-0.5">
                What does your wandering soul need right now? Rotate the compass dial.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Compass Mood Selection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? `${mood.bgColor} ring-2 ring-sukoon-500 shadow-sm scale-[1.02]`
                      : 'bg-sand-50/70 border-sand-200 hover:bg-sand-100 hover:border-sand-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`p-1.5 rounded-xl ${isSelected ? 'bg-white shadow-xs' : 'bg-sand-200/60'} ${mood.color}`}>
                      {mood.icon}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-sukoon-500 animate-ping" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-sand-900 leading-tight">{mood.label}</h3>
                    <p className="text-[10px] text-sand-500 font-devanagari mt-0.5">{mood.hindi}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Mood Details Card */}
          <div className={`p-5 rounded-3xl border ${currentMood.bgColor} transition-all`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-bold text-sm ${currentMood.color}`}>{currentMood.label}</span>
              <span className="text-sand-400">•</span>
              <span className="text-xs text-sand-600 font-devanagari">{currentMood.hindi}</span>
            </div>
            <p className="text-xs text-sand-700 italic mb-4">
              "{currentMood.tagline}"
            </p>

            {/* Recommended Stays & Gigs for this mood */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold text-sand-800 uppercase tracking-wider">
                Sanctuaries & Work-Exchanges Aligned With This Sukoon:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentMood.recommendedPlaces.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="p-3 bg-white/90 hover:bg-white rounded-2xl border border-sand-200/80 shadow-xs hover:shadow transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sand-100 text-sand-700">
                          {item.type}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="text-sukoon-600 font-bold">Sukoon {item.sukoon}/5</span>
                          <span className="text-sand-400">•</span>
                          <span className="text-sand-600">Comfort {item.comfort}/5</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-sand-900 group-hover:text-sukoon-700 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-sand-500 line-clamp-1">{item.location}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-sukoon-600 mt-3 pt-2 border-t border-sand-100">
                      <span>View Sanctuary</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Action to Explore Map with Filter */}
          <div className="text-center">
            <Link
              href={`/explore?mood=${selectedMood}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>Explore All {currentMood.label} Spots on Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

