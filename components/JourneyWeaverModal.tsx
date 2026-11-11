'use client';

import React, { useState } from 'react';
import { 
  Sparkles, MapPin, X, ArrowRight, Share2, Download, 
  Calendar, Bed, Briefcase, Car, Check, Info
} from 'lucide-react';

interface JourneyWeaverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HubStop {
  id: string;
  name: string;
  state: string;
  daysRecommended: number;
  avgSleeperFareFromPrev: number; // INR
  featuredGig: string;
  featuredStay: string;
  vibe: string;
}

const AVAILABLE_HUBS: HubStop[] = [
  {
    id: 'delhi',
    name: 'New Delhi',
    state: 'Delhi (Starting Point)',
    daysRecommended: 1,
    avgSleeperFareFromPrev: 0,
    featuredGig: 'Heritage Walk Translator',
    featuredStay: 'Pahar Ganj Backpacker Dorm',
    vibe: 'Transit & Historic Gates'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    daysRecommended: 3,
    avgSleeperFareFromPrev: 240,
    featuredGig: 'Hand-block Printing Apprentice',
    featuredStay: 'Sanganer Artisan Homestay',
    vibe: 'Terracotta & Crafts'
  },
  {
    id: 'pushkar',
    name: 'Pushkar',
    state: 'Rajasthan',
    daysRecommended: 7,
    avgSleeperFareFromPrev: 180,
    featuredGig: 'Haveli Garden & Social Media Host',
    featuredStay: 'Savitri Hills Peace Hermitage (Free)',
    vibe: 'Ghats & Camel Dunes'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    daysRecommended: 10,
    avgSleeperFareFromPrev: 380,
    featuredGig: 'Organic Garden Hand at Tapovan',
    featuredStay: 'Ganga Bank Vedic Ashram (₹350)',
    vibe: 'Yoga & Emerald Ganga'
  },
  {
    id: 'kasol',
    name: 'Kasol & Tosh',
    state: 'Himachal Pradesh',
    daysRecommended: 8,
    avgSleeperFareFromPrev: 490,
    featuredGig: 'Permaculture Farm & Chai Hand',
    featuredStay: 'Kasol Apple Orchard Stone Cottage',
    vibe: 'Cedar Pines & Glaciers'
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    daysRecommended: 7,
    avgSleeperFareFromPrev: 650,
    featuredGig: 'Vedic Manuscript Transcription',
    featuredStay: 'Ancient Ghat Roof Room (Free)',
    vibe: 'Kabir Poetry & Dawn Rowing'
  },
  {
    id: 'kerala',
    name: 'Fort Kochi',
    state: 'Kerala',
    daysRecommended: 6,
    avgSleeperFareFromPrev: 920,
    featuredGig: 'Bamboo Cafe Mural Painter',
    featuredStay: 'Kathakali Village Homestay',
    vibe: 'Monsoon Backwaters & Spices'
  }
];

export default function JourneyWeaverModal({ isOpen, onClose }: JourneyWeaverModalProps) {
  const [selectedHubIds, setSelectedHubIds] = useState<string[]>(['delhi', 'pushkar', 'rishikesh', 'varanasi']);
  const [showPoster, setShowPoster] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const activeStops = AVAILABLE_HUBS.filter(h => selectedHubIds.includes(h.id));
  const totalDays = activeStops.reduce((sum, s) => sum + s.daysRecommended, 0);
  const totalTransportCost = activeStops.reduce((sum, s) => sum + s.avgSleeperFareFromPrev, 0);

  const toggleHub = (hubId: string) => {
    if (selectedHubIds.includes(hubId)) {
      if (selectedHubIds.length <= 2) return; // keep at least 2
      setSelectedHubIds(prev => prev.filter(id => id !== hubId));
    } else {
      setSelectedHubIds(prev => [...prev, hubId]);
    }
  };

  const handleSharePoster = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-sand-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 via-sukoon-800 to-terracotta text-white p-5 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Journey Weaver</h2>
              <p className="text-xs text-amber-100">
                Design your slow, low-cost itinerary with work-exchanges and ashrams
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 bg-sand-50 p-3 rounded-2xl border border-sand-200 text-center">
            <div>
              <span className="text-[10px] text-sand-500 font-bold uppercase block">Stops</span>
              <span className="text-base font-bold text-sand-900">{activeStops.length} Destinations</span>
            </div>
            <div>
              <span className="text-[10px] text-sand-500 font-bold uppercase block">Pace</span>
              <span className="text-base font-bold text-sukoon-700">~{totalDays} Slow Days</span>
            </div>
            <div>
              <span className="text-[10px] text-sand-500 font-bold uppercase block">Transport Est.</span>
              <span className="text-base font-bold text-forest-700">₹{totalTransportCost} (Sleeper)</span>
            </div>
          </div>

          {/* Hub Selector Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-sand-700 uppercase tracking-wider block">
              Toggle Indian Slow Travel Hubs:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_HUBS.map((hub) => {
                const isSelected = selectedHubIds.includes(hub.id);
                return (
                  <button
                    key={hub.id}
                    onClick={() => toggleHub(hub.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-xs'
                        : 'bg-sand-50 border-sand-200 text-sand-600 hover:bg-sand-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-700" />}
                    <span>{hub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Route Thread Visualizer */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-sand-800 uppercase tracking-wider">
              Weaved Itinerary Path:
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-sukoon-500 before:to-forest-600">
              {activeStops.map((stop, index) => (
                <div key={stop.id} className="relative group">
                  {/* Pin Dot */}
                  <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-sukoon-500 flex items-center justify-center text-[10px] font-bold text-sukoon-700 shadow-xs">
                    {index + 1}
                  </div>

                  <div className="bg-sand-50 hover:bg-white p-3.5 rounded-2xl border border-sand-200 shadow-xs transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm text-sand-900">{stop.name}</h4>
                        <span className="text-[10px] text-sand-500">({stop.state})</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sand-200 text-sand-700 font-medium">
                        {stop.daysRecommended} days • {stop.vibe}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="flex items-center gap-1.5 text-sukoon-800 bg-sukoon-50 p-2 rounded-xl">
                        <Briefcase className="w-3.5 h-3.5 text-sukoon-600 flex-shrink-0" />
                        <span className="truncate">Work-Ex: <strong>{stop.featuredGig}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-forest-800 bg-forest-50 p-2 rounded-xl">
                        <Bed className="w-3.5 h-3.5 text-forest-600 flex-shrink-0" />
                        <span className="truncate">Stay: <strong>{stop.featuredStay}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal and Booking Notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px]">
              <strong>Cost-Sharing & Non-Transferable Tickets:</strong> Travel estimates assume Indian Railways Sleeper / 3AC class or shared rural cabs. SukoonRoute does not resell tickets; join ride shares with fellow roamers.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowPoster(!showPoster)}
              className="flex-1 py-2.5 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {showPoster ? 'Hide Itinerary Poster' : 'Generate Shareable Poster'}
            </button>
            <button
              onClick={handleSharePoster}
              className="px-4 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-sand-800 font-semibold text-xs border border-sand-300 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedLink ? 'Copied!' : 'Share'}
            </button>
          </div>

          {/* Exportable Poster Preview */}
          {showPoster && (
            <div className="p-6 bg-gradient-to-br from-sand-900 via-sukoon-900 to-terracotta text-white rounded-3xl space-y-4 border-2 border-amber-400/40 shadow-2xl animate-scaleUp">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-amber-300">
                    SukoonRoute • Slow Journey Manifesto
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">Sacred India Slow Circuit</h3>
                  <p className="text-xs text-sand-300">
                    {totalDays} Days • {activeStops.length} Sanctuaries • ₹{totalTransportCost} Sleeper Route
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-serif text-xl font-bold text-amber-300">
                  स्
                </div>
              </div>

              <div className="space-y-2 py-2">
                {activeStops.map((s, idx) => (
                  <div key={s.id} className="flex items-center justify-between text-xs border-b border-white/10 pb-1.5">
                    <span className="font-semibold">{idx + 1}. {s.name} ({s.daysRecommended}d)</span>
                    <span className="text-amber-200 text-[11px]">{s.vibe}</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-sand-300 italic text-center">
                "Travel slow. Earn a little through service. Share chai, not rush."
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
