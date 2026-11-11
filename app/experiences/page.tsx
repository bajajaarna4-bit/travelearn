'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, ShieldCheck, Heart, ArrowRight, CheckCircle2, 
  MapPin, Clock, PlusCircle
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { SEED_BARTERS } from '@/lib/seedData';

export default function ExperiencesPage() {
  const { experiences, addKarma } = useApp();
  const [activeTab, setActiveTab] = useState<'experiences' | 'barter'>('experiences');
  const [swappedId, setSwappedId] = useState<string | null>(null);

  const handleProposeBarter = (barterId: string) => {
    setSwappedId(barterId);
    addKarma(15, 'Initiated a two-sided skill barter exchange');
    setTimeout(() => setSwappedId(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
            Module 4 • Experience & Barter Market
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 mt-1">
            Skill Exchange & Spiritual Sessions
          </h1>
          <p className="text-xs sm:text-sm text-sand-600 mt-1">
            Spiritual talks, natural dyeing, Kabir poetry rowing, and mutual skill barter.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-sand-100 p-1 rounded-2xl border border-sand-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'experiences' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
            }`}
          >
            Spiritual Sessions
          </button>
          <button
            onClick={() => setActiveTab('barter')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'barter' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
            }`}
          >
            Skill Barter Market ("I teach X, You teach Y")
          </button>
        </div>
      </div>

      {activeTab === 'experiences' ? (
        /* Experiences Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-sand-200 overflow-hidden">
                  <img
                    src={exp.images[0]}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-sand-800 shadow-xs">
                    {exp.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-amber-300 backdrop-blur-sm">
                    {exp.pricing}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-sand-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1 text-sukoon-700 font-semibold">
                      <Clock className="w-3 h-3" />
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-sand-900 group-hover:text-sukoon-700 transition-colors line-clamp-2">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-sand-600 line-clamp-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.swapsAccepted && (
                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                      <strong>Skill Swap Offered:</strong> {exp.swapsAccepted}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-2 border-t border-sand-100 flex items-center justify-between text-xs">
                <span className="text-sand-500 text-[11px]">Host: {exp.hostName}</span>
                <span className="font-bold text-sukoon-600">Sukoon {exp.sukoonLevel}/5</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Signature Feature 4f: Skill Barter Market */
        <div className="space-y-6">
          <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 text-xs text-sand-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Zero-Cash Skill Barter:</strong> Connect directly to trade languages, cooking, web development, photography, or music without currency.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEED_BARTERS.map((b) => {
              const isSwapped = swappedId === b.id;
              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-6 border border-sand-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-sand-100">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={b.proposerAvatar}
                        alt={b.proposerName}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-sukoon-500"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-sand-900">{b.proposerName}</h4>
                        <p className="text-[10px] text-sand-500">{b.location}</p>
                      </div>
                    </div>
                    {b.verified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Verified Barterer
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-sand-50 p-3 rounded-2xl border border-sand-200">
                      <span className="text-[10px] text-sukoon-600 font-bold block uppercase">I Offer / Teach:</span>
                      <span className="font-semibold text-sand-900 mt-1 block">{b.teaching}</span>
                    </div>

                    <div className="bg-sand-50 p-3 rounded-2xl border border-sand-200">
                      <span className="text-[10px] text-forest-700 font-bold block uppercase">In Exchange For:</span>
                      <span className="font-semibold text-sand-900 mt-1 block">{b.seeking}</span>
                    </div>
                  </div>

                  <p className="text-xs text-sand-600 italic">
                    "{b.notes}"
                  </p>

                  <div className="pt-2 border-t border-sand-100 flex justify-end">
                    <button
                      onClick={() => handleProposeBarter(b.id)}
                      disabled={isSwapped}
                      className={`px-4 py-2 rounded-full font-bold text-xs transition-colors flex items-center gap-1.5 ${
                        isSwapped
                          ? 'bg-emerald-600 text-white'
                          : 'bg-sukoon-600 hover:bg-sukoon-700 text-white shadow-xs'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isSwapped ? 'Barter Match Sent!' : 'Propose Skill Swap'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

