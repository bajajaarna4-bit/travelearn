'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Shield, Star, Filter, Briefcase, Bed, Car, 
  Sparkles, SlidersHorizontal, Check, ArrowRight, Eye, Heart
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ExplorePage() {
  const { gigs, stays, rides, experiences, isWomenSafetyMode } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'stays' | 'gigs' | 'rides' | 'experiences'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [womenOnlyFilter, setWomenOnlyFilter] = useState<boolean>(isWomenSafetyMode);
  const [minSukoon, setMinSukoon] = useState<number>(1);
  const [activePinId, setActivePinId] = useState<string | null>(null);

  // Combine items into unified map points
  interface UnifiedPin {
    id: string;
    title: string;
    type: 'stay' | 'gig' | 'ride' | 'experience';
    location: string;
    region: string;
    price: string;
    isWomenOnly: boolean;
    sukoon: number;
    comfort: number;
    image: string;
    href: string;
    lat: number;
    lng: number;
    hostName: string;
    safetyScore?: number;
  }

  const mapPoints: UnifiedPin[] = [
    // Stays
    ...stays.map(s => ({
      id: s.id,
      title: s.title,
      type: 'stay' as const,
      location: s.location,
      region: s.region,
      price: s.pricePerNight === 0 ? 'Free (Work-Ex)' : `₹${s.pricePerNight}/night`,
      isWomenOnly: s.womenOnly,
      sukoon: s.sukoonLevel,
      comfort: s.comfortLevel,
      image: s.images[0],
      href: `/stays/${s.id}`,
      lat: s.lat,
      lng: s.lng,
      hostName: s.hostName,
      safetyScore: s.safetyScore
    })),
    // Gigs
    ...gigs.map(g => ({
      id: g.id,
      title: g.title,
      type: 'gig' as const,
      location: g.location,
      region: g.region,
      price: 'Free Room & Meals',
      isWomenOnly: g.isWomenOnly,
      sukoon: g.sukoonLevel,
      comfort: g.comfortLevel,
      image: g.images[0],
      href: `/gigs/${g.id}`,
      lat: g.region === 'rajasthan' ? 26.9124 : g.region === 'himachal' ? 32.0152 : g.region === 'varanasi' ? 25.3176 : 9.9674,
      lng: g.region === 'rajasthan' ? 75.7873 : g.region === 'himachal' ? 77.3182 : g.region === 'varanasi' ? 82.9739 : 76.2454,
      hostName: g.hostName
    })),
    // Experiences
    ...experiences.map(e => ({
      id: e.id,
      title: e.title,
      type: 'experience' as const,
      location: e.location,
      region: 'rajasthan',
      price: e.pricing,
      isWomenOnly: false,
      sukoon: e.sukoonLevel,
      comfort: e.comfortLevel,
      image: e.images[0],
      href: `/experiences`,
      lat: 26.4897,
      lng: 74.5511,
      hostName: e.hostName
    }))
  ];

  const filteredPoints = mapPoints.filter(p => {
    if (categoryFilter !== 'all' && p.type !== categoryFilter.replace(/s$/, '')) return false;
    if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;
    if (womenOnlyFilter && !p.isWomenOnly) return false;
    if (p.sukoon < minSukoon) return false;
    return true;
  });

  const activeItem = filteredPoints.find(p => p.id === activePinId) || filteredPoints[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <h1 className="font-serif text-3xl font-bold text-sand-900">
            Interactive Roamer Map & Explore
          </h1>
          <p className="text-xs text-sand-600 mt-1">
            Discover verified sanctuaried stays, voluntary gigs & cultural exchanges across India.
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Selector */}
          <div className="flex bg-sand-100 p-1 rounded-2xl border border-sand-200 text-xs font-semibold">
            {(['all', 'stays', 'gigs', 'experiences'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-colors ${
                  categoryFilter === cat
                    ? 'bg-white text-sukoon-700 shadow-xs'
                    : 'text-sand-600 hover:text-sand-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="px-3 py-2 bg-sand-100 border border-sand-200 rounded-2xl text-xs font-semibold text-sand-700 focus:outline-none"
          >
            <option value="all">All Regions</option>
            <option value="rajasthan">Rajasthan (Pushkar, Jaipur)</option>
            <option value="rishikesh">Uttarakhand (Rishikesh)</option>
            <option value="himachal">Himachal (Kasol, Tosh)</option>
            <option value="varanasi">Varanasi Ghats</option>
            <option value="kerala">Kerala (Fort Kochi)</option>
          </select>

          {/* Women Only Filter Button */}
          <button
            onClick={() => setWomenOnlyFilter(prev => !prev)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              womenOnlyFilter
                ? 'bg-forest-600 text-white border-forest-600'
                : 'bg-sand-100 text-sand-700 border-sand-200 hover:bg-sand-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Women-Only</span>
          </button>
        </div>
      </div>

      {/* Split Map View & Listing Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        
        {/* Left Side: Cards Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4 max-h-[750px] overflow-y-auto pr-2">
          <div className="text-xs font-bold text-sand-600 flex justify-between items-center">
            <span>Showing {filteredPoints.length} Sanctuaries & Gigs</span>
            <span className="text-[11px] text-sukoon-600 font-semibold">Hover or tap card to inspect on map</span>
          </div>

          <div className="space-y-4">
            {filteredPoints.map((item) => {
              const isHovered = activePinId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActivePinId(item.id)}
                  onClick={() => setActivePinId(item.id)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer bg-white ${
                    isHovered
                      ? 'border-sukoon-500 ring-2 ring-sukoon-300 shadow-md scale-[1.01]'
                      : 'border-sand-200 shadow-xs hover:border-sand-300'
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sand-100 text-sand-700">
                          {item.type}
                        </span>
                        {item.isWomenOnly && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Women Only
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-sm text-sand-900 truncate">
                        {item.title}
                      </h3>

                      <p className="text-xs text-sand-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>

                      <div className="flex items-center justify-between text-xs pt-2">
                        <span className="font-bold text-sukoon-700">{item.price}</span>
                        <div className="flex items-center gap-1 text-[11px] text-sand-500">
                          <span>Sukoon {item.sukoon}/5</span>
                          <span>•</span>
                          <span>Comfort {item.comfort}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-sand-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-sand-500 text-[11px]">Host: {item.hostName}</span>
                    <Link
                      href={item.href}
                      className="text-sukoon-600 hover:text-sukoon-800 flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Map Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-[#EFE8DC] rounded-3xl border border-sand-300 relative overflow-hidden flex flex-col justify-between shadow-inner p-6 min-h-[450px]">
          
          {/* Simulated OpenStreetMap India Canvas / Vector Canvas */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C87443_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Map Top Indicator */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs border border-sand-200 text-xs font-bold text-sand-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Roamer Grid: India (OpenStreetMap)</span>
            </div>

            <div className="text-[11px] bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-sand-600 font-medium">
              Lat: 20.5937° N • Lng: 78.9629° E
            </div>
          </div>

          {/* India Regional Map Canvas with clickable pins */}
          <div className="relative z-10 my-auto h-72 sm:h-96 w-full flex items-center justify-center">
            
            {/* Visual India Map Graphic / Nodes Representation */}
            <div className="relative w-full max-w-md h-full">
              
              {/* Himachal Pin (Kasol) */}
              <button
                onClick={() => setActivePinId('stay_3')}
                className="absolute top-[10%] left-[38%] group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              >
                <div className={`p-2 rounded-full text-white shadow-lg transition-transform ${
                  activePinId === 'stay_3' ? 'bg-sukoon-600 ring-4 ring-sukoon-300 scale-125' : 'bg-forest-700 hover:scale-110'
                }`}>
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full shadow-xs mt-1 block">
                  Kasol/Tosh
                </span>
              </button>

              {/* Rishikesh Pin */}
              <button
                onClick={() => setActivePinId('stay_2')}
                className="absolute top-[20%] left-[45%] group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              >
                <div className={`p-2 rounded-full text-white shadow-lg transition-transform ${
                  activePinId === 'stay_2' ? 'bg-sukoon-600 ring-4 ring-sukoon-300 scale-125' : 'bg-teal-700 hover:scale-110'
                }`}>
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full shadow-xs mt-1 block">
                  Rishikesh Tapovan
                </span>
              </button>

              {/* Rajasthan Pin (Pushkar & Jaipur) */}
              <button
                onClick={() => setActivePinId('stay_1')}
                className="absolute top-[34%] left-[28%] group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              >
                <div className={`p-2 rounded-full text-white shadow-lg transition-transform ${
                  activePinId === 'stay_1' ? 'bg-sukoon-600 ring-4 ring-sukoon-300 scale-125' : 'bg-terracotta hover:scale-110'
                }`}>
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full shadow-xs mt-1 block">
                  Pushkar Ghats
                </span>
              </button>

              {/* Varanasi Pin */}
              <button
                onClick={() => setActivePinId('stay_4')}
                className="absolute top-[40%] left-[64%] group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              >
                <div className={`p-2 rounded-full text-white shadow-lg transition-transform ${
                  activePinId === 'stay_4' ? 'bg-sukoon-600 ring-4 ring-sukoon-300 scale-125' : 'bg-orange-700 hover:scale-110'
                }`}>
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full shadow-xs mt-1 block">
                  Varanasi Munshi Ghat
                </span>
              </button>

              {/* Kerala Pin (Fort Kochi) */}
              <button
                onClick={() => setActivePinId('gig_4')}
                className="absolute top-[82%] left-[34%] group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              >
                <div className={`p-2 rounded-full text-white shadow-lg transition-transform ${
                  activePinId === 'gig_4' ? 'bg-sukoon-600 ring-4 ring-sukoon-300 scale-125' : 'bg-forest-800 hover:scale-110'
                }`}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full shadow-xs mt-1 block">
                  Fort Kochi, Kerala
                </span>
              </button>

            </div>
          </div>

          {/* Active Item Floating Detail Pill at Bottom of Map */}
          {activeItem && (
            <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-sand-300 shadow-lg flex items-center justify-between gap-4 animate-slideUp">
              <div className="flex items-center gap-3">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-serif font-bold text-xs text-sand-900 leading-tight">
                    {activeItem.title}
                  </h4>
                  <p className="text-[11px] text-sand-600">{activeItem.location} • {activeItem.price}</p>
                </div>
              </div>

              <Link
                href={activeItem.href}
                className="px-3.5 py-1.5 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs transition-colors whitespace-nowrap"
              >
                Inspect Spot
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
