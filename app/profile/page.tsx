'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, ShieldCheck, Heart, Sparkles, MapPin, Award, 
  Phone, Plus, Edit3, ArrowRight, Share2, Check
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ProfilePage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<'passport' | 'emergency' | 'skills'>('passport');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sukoon-100/50 to-amber-100/30 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-sand-200">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-sukoon-200 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white shadow-xs" title="Gov ID Verified">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sand-900">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Gov ID Verified
                </span>
              </div>
              <p className="text-xs text-sand-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{user.location} • Joined {user.joinedDate}</span>
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs font-semibold">
                <span className="text-forest-700">⭐ {user.safetyRating} Safety Rating</span>
                <span className="text-sand-300">•</span>
                <span className="text-sand-600">{user.reviewsCount} Host & Roamer Reviews</span>
              </div>
            </div>
          </div>

          {/* Karma Counter Box */}
          <div className="bg-sand-50 border border-sand-200 p-4 rounded-3xl text-center min-w-[140px] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sukoon-600 block">
              Roamer Karma
            </span>
            <span className="font-serif text-3xl font-bold text-sukoon-700 block mt-0.5">
              {user.karmaPoints}
            </span>
            <span className="text-[10px] text-sand-500">Points Earned</span>
          </div>

        </div>

        {/* Bio & Travel Style */}
        <div className="pt-6 space-y-4">
          <p className="text-xs sm:text-sm text-sand-700 leading-relaxed max-w-3xl">
            "{user.bio}"
          </p>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {user.badges.map((b) => (
              <span
                key={b}
                className="px-3 py-1 rounded-full bg-sand-100 text-sand-800 text-xs font-semibold border border-sand-300/60 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{b}</span>
              </span>
            ))}
            <button
              onClick={handleShare}
              className="ml-auto text-xs font-semibold text-sukoon-700 hover:text-sukoon-800 flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Tabs Row */}
      <div className="flex bg-sand-100 p-1.5 rounded-2xl border border-sand-200 text-xs font-semibold max-w-md">
        <button
          onClick={() => setActiveTab('passport')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'passport' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600 hover:text-sand-900'
          }`}
        >
          Travel Passport & Stamps
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'skills' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600 hover:text-sand-900'
          }`}
        >
          Skills & Barter
        </button>
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'emergency' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600 hover:text-sand-900'
          }`}
        >
          Emergency Contacts
        </button>
      </div>

      {/* Tab 1: Signature Feature 4e Travel Passport with Animated Stamps */}
      {activeTab === 'passport' && (
        <div className="bg-white rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-sand-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-sand-900">
                Official Slow Roamer Passport
              </h2>
              <p className="text-xs text-sand-600 mt-0.5">
                Each seal is verified by an ashram, host haveli, or local community elder.
              </p>
            </div>
            <span className="text-xs font-bold text-sukoon-700 bg-sukoon-100 px-3 py-1 rounded-full">
              {user.stamps.length} Stamps Collected
            </span>
          </div>

          {/* Grid of Passport Stamps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {user.stamps.map((stamp) => (
              <div
                key={stamp.id}
                className="p-5 rounded-3xl border-2 border-dashed border-sand-300 hover:border-sukoon-400 bg-[#FCFAF7] shadow-xs transition-all hover:scale-105 flex flex-col justify-between space-y-4 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-sand-100 flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform">
                  {stamp.icon}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-sm text-sand-900">{stamp.placeName}</h3>
                  <p className="text-[11px] text-sand-500">{stamp.state}</p>
                </div>

                <div className="pt-2 border-t border-sand-200 text-[10px] text-sand-400 flex justify-between">
                  <span className="capitalize">{stamp.category}</span>
                  <span>{stamp.dateAwarded}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-sand-600 text-center">
            Complete your next work-exchange gig in Kasol or stay 3 nights at Tapovan Ashram to earn your next seal!
          </div>
        </div>
      )}

      {/* Tab 2: Skills Barter */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-sand-900">
            Skills Barter Marketplace Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-sand-50 p-6 rounded-3xl border border-sand-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sukoon-700 block">
                Skills I Can Offer to Hosts & Roamers:
              </span>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-sukoon-100 text-sukoon-900 text-xs font-semibold">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-sand-50 p-6 rounded-3xl border border-sand-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 block">
                Skills I Want to Learn:
              </span>
              <div className="flex flex-wrap gap-2">
                {user.skillsWanted.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-semibold">
                    🎯 {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Emergency Contacts */}
      {activeTab === 'emergency' && (
        <div className="bg-white rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-sand-900">
              Women Safety Trusted Contacts
            </h2>
            <p className="text-xs text-sand-600 mt-1">
              These contacts receive your live GPS link when you trigger SOS or miss an "Arrived Safe" check-in timer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.emergencyContacts?.map(em => (
              <div key={em.id} className="p-4 bg-sand-50 rounded-2xl border border-sand-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-sand-900">{em.name}</h4>
                  <p className="text-[11px] text-sand-500">{em.relationship}</p>
                  <p className="text-xs font-bold text-forest-700 mt-1">{em.phone}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-forest-50 border border-forest-200 rounded-2xl text-xs text-forest-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest-700 flex-shrink-0" />
            <span>Contacts are stored locally and synced exclusively for urgent emergency dispatches.</span>
          </div>
        </div>
      )}

    </div>
  );
}

