'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Bed, MapPin, Shield, Star, CheckCircle2, Clock, 
  Calendar, ArrowLeft, Send, Check, Heart, UserCheck, AlertCircle
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function StayDetailPage() {
  const params = useParams();
  const { stays, bookStay, openChatWith } = useApp();

  const stayId = params.id as string;
  const stay = stays.find(s => s.id === stayId) || stays[0];

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState('18 Nov - 25 Nov 2024');
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    bookStay(stay.id, selectedDates);
    setIsBooked(true);
    setBookingModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/stays"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand-600 hover:text-sand-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Stays</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-md bg-sand-200">
            <img
              src={stay.images[0]}
              alt={stay.title}
              className="w-full h-full object-cover"
            />
            {stay.womenOnly && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-forest-700 text-white shadow-md">
                Women Only Sanctuary
              </span>
            )}
          </div>

          {/* Title & Location Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-sand-500">
              <span className="px-2.5 py-0.5 rounded-full bg-sand-200 text-sand-800 font-semibold">
                {stay.stayType}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {stay.location}, {stay.state}
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-sand-900 leading-snug">
              {stay.title}
            </h1>
          </div>

          {/* Radial Safety Score & What It Really Feels Like Panel */}
          <div className="bg-gradient-to-br from-forest-50 via-white to-sand-50 p-6 rounded-3xl border border-forest-200 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-forest-100">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700">
                  Verified Security Assessment
                </span>
                <h3 className="font-serif text-lg font-bold text-forest-950">
                  Women Safety Rating
                </h3>
                <p className="text-xs text-forest-800/80">
                  Audited for lockable private rooms, female host presence, well-lit approach & CCTV at gates.
                </p>
              </div>

              {/* Radial Safety Ring Graphic */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center text-center shadow-inner bg-white">
                  <span className="font-serif text-xl font-bold text-emerald-700">{stay.safetyScore}</span>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase">Score / 100</span>
                </div>
              </div>
            </div>

            {/* "What it really feels like" Sliders */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-sand-800 uppercase tracking-wider">
                What it really feels like:
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-sukoon-800">Sukoon Level (Peace & Stillness):</span>
                    <span className="text-sukoon-700">{stay.sukoonLevel} / 5</span>
                  </div>
                  <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-sukoon-500 h-full rounded-full" 
                      style={{ width: `${(stay.sukoonLevel / 5) * 100}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-sand-700">Comfort Level (Simplicity vs Luxury):</span>
                    <span className="text-sand-800">{stay.comfortLevel} / 5</span>
                  </div>
                  <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-sand-600 h-full rounded-full" 
                      style={{ width: `${(stay.comfortLevel / 5) * 100}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-sand-500 mt-1 italic">
                    Simple, conscious, uncomfortable-yet-peaceful authentic living.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-sand-900">About the Sanctuary</h2>
            <p className="text-sm text-sand-700 leading-relaxed whitespace-pre-line">
              {stay.description}
            </p>
          </div>

          {/* Amenities & House Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
              <h3 className="font-serif text-base font-bold text-sand-900">Sanctuary Amenities</h3>
              <ul className="space-y-2 text-xs text-sand-700">
                {stay.amenities.map(a => (
                  <li key={a} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
              <h3 className="font-serif text-base font-bold text-sand-900">Ashram & House Rules</h3>
              <ul className="space-y-2 text-xs text-sand-700">
                {stay.houseRules.map(r => (
                  <li key={r} className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Right Sticky Booking Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-md space-y-6 sticky top-24">
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sand-500 block">Price Option</span>
              <span className="text-2xl font-serif font-bold text-forest-800">
                {stay.pricePerNight === 0 ? 'Free (Work-Exchange)' : `₹${stay.pricePerNight}`}
              </span>
              {stay.pricePerNight > 0 && <span className="text-xs text-sand-500"> / night donation</span>}
              <p className="text-xs text-sand-500 mt-0.5">{stay.priceType}</p>
            </div>

            {/* Host Card */}
            <div className="p-3 bg-sand-50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={stay.hostAvatar}
                  alt={stay.hostName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-forest-500"
                />
                <div>
                  <h4 className="font-bold text-xs text-sand-900">{stay.hostName}</h4>
                  <p className="text-[10px] text-forest-700 font-semibold">Verified Ashram / Host</p>
                </div>
              </div>

              <button
                onClick={() => openChatWith({ id: stay.hostId, name: stay.hostName, avatar: stay.hostAvatar })}
                className="text-[11px] font-bold text-sukoon-600 hover:underline"
              >
                Chat
              </button>
            </div>

            {/* Booking Action */}
            {isBooked ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-center text-xs text-emerald-800 font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Sanctuary Reservation Confirmed</span>
              </div>
            ) : (
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-forest-800 to-forest-600 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Bed className="w-4 h-4" />
                <span>Request Stay Reservation</span>
              </button>
            )}

            <p className="text-[10px] text-sand-400 text-center leading-relaxed">
              Strict vegetarian & peaceful etiquette policy. Instant cancellation with no penalty.
            </p>

          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sand-300 space-y-4">
            <h3 className="font-serif text-lg font-bold text-sand-900">
              Reserve Bed at {stay.title}
            </h3>
            <p className="text-xs text-sand-600">
              Select your travel dates. The host will confirm availability within 4 hours.
            </p>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-sand-700 block mb-1">
                  Dates of Stay
                </label>
                <input
                  type="text"
                  required
                  value={selectedDates}
                  onChange={(e) => setSelectedDates(e.target.value)}
                  className="w-full p-2.5 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-forest-600"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-sand-100 text-sand-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold shadow-xs"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
