'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Shield, Clock, MapPin, CheckCircle2, 
  AlertCircle, ArrowRight, Heart, Filter, UserCheck, PlusCircle
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function GigsPage() {
  const { gigs, isWomenSafetyMode } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [womenOnly, setWomenOnly] = useState<boolean>(isWomenSafetyMode);

  const filtered = gigs.filter(g => {
    if (selectedRegion !== 'all' && g.region !== selectedRegion) return false;
    if (womenOnly && !g.isWomenOnly) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Legal Notice Banner as specified in prompt */}
      <div className="bg-amber-50 border border-amber-300 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-200/80 flex items-center justify-center text-amber-800 flex-shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-900">
              Indian Immigration & Tourist Visa Disclaimer
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed max-w-3xl">
              Foreign travellers on e-Tourist or Tourist Visas cannot engage in paid commercial employment. SukoonRoute gigs are strictly framed as <strong>voluntary cultural exchange, barter & community learning</strong> (free room & meals in return for 3-4 hours of daily help). No monetary wages are disbursed to tourist visa holders.
            </p>
          </div>
        </div>

        <Link
          href="/terms"
          className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
        >
          Read Visa Protocol
        </Link>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
            Work & Earn Module
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 mt-1">
            Community Work-Exchange Gigs
          </h1>
          <p className="text-xs sm:text-sm text-sand-600 mt-1">
            Hostels, organic farms, ashrams, NGOs and cafes seeking conscious travellers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Region selector */}
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="px-3 py-2 bg-sand-100 border border-sand-200 rounded-2xl text-xs font-semibold text-sand-700 focus:outline-none"
          >
            <option value="all">All Regions</option>
            <option value="rajasthan">Pushkar / Rajasthan</option>
            <option value="himachal">Kasol / Himachal</option>
            <option value="varanasi">Varanasi Ghats</option>
            <option value="kerala">Fort Kochi / Kerala</option>
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
            <span>Women Hosts Only</span>
          </button>

          <Link
            href="/post?type=gig"
            className="px-4 py-2 rounded-2xl bg-sukoon-600 hover:bg-sukoon-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post a Gig</span>
          </Link>
        </div>
      </div>

      {/* Gigs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((gig) => (
          <div
            key={gig.id}
            className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="p-6 space-y-4">
              
              {/* Host & Meta Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={gig.hostAvatar}
                    alt={gig.hostName}
                    className="w-11 h-11 rounded-2xl object-cover ring-1 ring-sukoon-400"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-sand-900">{gig.hostName}</h4>
                      {gig.hostVerified && (
                        <span className="p-0.5 rounded-full bg-emerald-500 text-white" title="Verified ID">
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-sand-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>{gig.location}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {gig.isWomenOnly && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Women Only
                    </span>
                  )}
                  <span className="text-[10px] text-sand-400">{gig.createdAt}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif font-bold text-lg text-sand-900 group-hover:text-sukoon-700 transition-colors line-clamp-1">
                  {gig.title}
                </h3>
                <p className="text-xs text-sand-600 mt-2 line-clamp-3 leading-relaxed">
                  {gig.description}
                </p>
              </div>

              {/* Perks Pill Grid */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sand-500 block">
                  Perks Provided by Host:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {gig.perks.map((perk) => (
                    <span
                      key={perk}
                      className="px-2.5 py-0.5 rounded-full bg-sukoon-50 text-sukoon-800 text-[11px] font-medium border border-sukoon-200"
                    >
                      ✓ {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work commitment & Sukoon */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-sand-50 p-2.5 rounded-xl border border-sand-200">
                  <span className="text-[10px] text-sand-500 font-bold block uppercase">Commitment</span>
                  <span className="font-semibold text-sand-800">{gig.hoursPerDay} hrs/day • {gig.duration}</span>
                </div>
                <div className="bg-sand-50 p-2.5 rounded-xl border border-sand-200">
                  <span className="text-[10px] text-sand-500 font-bold block uppercase">Vibe</span>
                  <span className="font-semibold text-sand-800">Sukoon {gig.sukoonLevel}/5 • Comfort {gig.comfortLevel}/5</span>
                </div>
              </div>

            </div>

            {/* Bottom Action Footer */}
            <div className="px-6 py-4 bg-sand-50/60 border-t border-sand-200 flex items-center justify-between">
              <span className="text-xs text-sand-500">
                <strong>{gig.applicantsCount}</strong> roamers applied
              </span>

              <Link
                href={`/gigs/${gig.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs shadow-xs transition-all"
              >
                <span>View Details & Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
