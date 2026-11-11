'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bed, Shield, Star, MapPin, CheckCircle2, ArrowRight, 
  Sparkles, SlidersHorizontal, PlusCircle
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function StaysPage() {
  const { stays, isWomenSafetyMode } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [womenOnly, setWomenOnly] = useState<boolean>(isWomenSafetyMode);

  const filtered = stays.filter(s => {
    if (selectedType !== 'all' && s.stayType !== selectedType) return false;
    if (womenOnly && !s.womenOnly) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
            Sanctuary & Stays Module
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 mt-1">
            Ashrams, Homestays & Pilgrim Sanctuaries
          </h1>
          <p className="text-xs sm:text-sm text-sand-600 mt-1">
            Free work-exchanges, peaceful ashram dorms, and female-only homestay floors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Stay Type Filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-sand-100 border border-sand-200 rounded-2xl text-xs font-semibold text-sand-700 focus:outline-none"
          >
            <option value="all">All Sanctuary Types</option>
            <option value="Ashram">Ashram Living</option>
            <option value="Homestay">Vetted Homestay</option>
            <option value="Farm Stay">Organic Farm Stay</option>
          </select>

          {/* Women only button */}
          <button
            onClick={() => setWomenOnly(prev => !prev)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              womenOnly
                ? 'bg-forest-600 text-white border-forest-600'
                : 'bg-sand-100 text-sand-700 border-sand-200 hover:bg-sand-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Women-Only Sanctuaries</span>
          </button>

          <Link
            href="/post?type=stay"
            className="px-4 py-2 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>List a Stay</span>
          </Link>
        </div>
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((stay) => (
          <div
            key={stay.id}
            className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
                <img
                  src={stay.images[0]}
                  alt={stay.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 inset-x-3 flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-sand-800 shadow-xs">
                    {stay.stayType}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-emerald-300 backdrop-blur-sm">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>Safety: {stay.safetyScore}/100</span>
                  </div>
                </div>

                {stay.womenOnly && (
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest-700 text-white">
                    Women-Only
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-sand-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {stay.location}
                  </span>
                  <span className="font-bold text-sukoon-700">
                    {stay.pricePerNight === 0 ? 'Free (Work-Ex)' : `₹${stay.pricePerNight} / night`}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-sand-900 group-hover:text-forest-700 transition-colors line-clamp-1">
                  {stay.title}
                </h3>

                <p className="text-xs text-sand-600 line-clamp-2 leading-relaxed">
                  {stay.description}
                </p>

                {/* Sukoon & Comfort Ratings */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-sand-50 p-2 rounded-xl text-center">
                    <span className="text-sand-500 block">Sukoon (Peace)</span>
                    <span className="font-bold text-sukoon-600">{stay.sukoonLevel} / 5</span>
                  </div>
                  <div className="bg-sand-50 p-2 rounded-xl text-center">
                    <span className="text-sand-500 block">Comfort Level</span>
                    <span className="font-bold text-sand-800">{stay.comfortLevel} / 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-sand-100">
              <span className="text-sand-500 text-[11px]">Host: {stay.hostName}</span>
              <Link
                href={`/stays/${stay.id}`}
                className="font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1"
              >
                <span>View Sanctuary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

