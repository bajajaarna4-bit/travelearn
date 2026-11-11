'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, Shield, Users, MapPin, AlertCircle, 
  ArrowRight, Check, PlusCircle, Calendar, Clock
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function RidesPage() {
  const { rides, joinRide, isWomenSafetyMode } = useApp();
  const [womenOnly, setWomenOnly] = useState<boolean>(isWomenSafetyMode);
  const [joinedSuccessId, setJoinedSuccessId] = useState<string | null>(null);

  const filtered = rides.filter(r => {
    if (womenOnly && !r.isWomenOnly) return false;
    return true;
  });

  const handleJoin = (rideId: string) => {
    joinRide(rideId, 1);
    setJoinedSuccessId(rideId);
    setTimeout(() => setJoinedSuccessId(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* IRCTC & Ticket Resale Warning Banner as specified in prompt */}
      <div className="bg-amber-50 border border-amber-300 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-200/80 flex items-center justify-center text-amber-800 flex-shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-900">
              IRCTC Indian Railways & Airline Ticket Policy Warning
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed max-w-3xl">
              Railway (IRCTC) and flight tickets are <strong>strictly non-transferable</strong> by law. SukoonRoute does NOT allow ticket resale or scalping. This module is solely for <strong>joint carpools, shared taxi cost splitting, and companion travel</strong> (having a trusted roamer on the same coach to watch luggage during breaks).
            </p>
          </div>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
            Carpool & Journey Split
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 mt-1">
            Shared Rides & Travel Companions
          </h1>
          <p className="text-xs sm:text-sm text-sand-600 mt-1">
            Split taxi fares fairly, travel with verified women drivers, or find train companions.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            <span>Women-Only Rides</span>
          </button>

          <Link
            href="/post?type=ride"
            className="px-4 py-2 rounded-2xl bg-sukoon-600 hover:bg-sukoon-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post a Ride</span>
          </Link>
        </div>
      </div>

      {/* Rides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ride) => {
          const isJoined = joinedSuccessId === ride.id;
          return (
            <div
              key={ride.id}
              className="bg-white rounded-3xl p-6 border border-sand-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                
                {/* Driver / Poster header */}
                <div className="flex items-center justify-between pb-3 border-b border-sand-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={ride.hostAvatar}
                      alt={ride.hostName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-sukoon-500"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-sand-900">{ride.hostName}</h4>
                      <p className="text-[10px] text-sand-500">{ride.vehicleType}</p>
                    </div>
                  </div>

                  {ride.isWomenOnly && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Women Only
                    </span>
                  )}
                </div>

                {/* Route */}
                <div className="py-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-forest-600" />
                    <span className="font-serif font-bold text-sm text-sand-900">{ride.origin}</span>
                  </div>
                  <div className="pl-1 border-l-2 border-dashed border-sand-300 ml-1 py-1">
                    <span className="text-[10px] text-sand-400 pl-3">via {ride.stops.slice(1, -1).join(', ') || 'Direct Highway'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-sukoon-600" />
                    <span className="font-serif font-bold text-sm text-sand-900">{ride.destination}</span>
                  </div>
                </div>

                {/* Departure details */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-sand-50 p-3 rounded-2xl border border-sand-200">
                  <div>
                    <span className="text-[10px] text-sand-500 block uppercase font-bold">Departure</span>
                    <span className="font-semibold text-sand-800">{ride.departureDate} at {ride.departureTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-sand-500 block uppercase font-bold">Seats Left</span>
                    <span className="font-semibold text-sand-800">{ride.availableSeats} of {ride.totalSeats} seats</span>
                  </div>
                </div>

                {/* Notes */}
                <p className="text-xs text-sand-600 mt-3 italic line-clamp-2">
                  "{ride.notes}"
                </p>

              </div>

              {/* Cost Split & Action */}
              <div className="pt-3 border-t border-sand-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-sand-500 block uppercase font-bold">Cost Split</span>
                  <span className="font-bold text-base text-sukoon-700">
                    {ride.costSplitPerPerson === 0 ? 'Free Companion' : `₹${ride.costSplitPerPerson}`}
                  </span>
                </div>

                <button
                  onClick={() => handleJoin(ride.id)}
                  disabled={isJoined || ride.availableSeats === 0}
                  className={`px-4 py-2 rounded-full font-bold text-xs transition-colors flex items-center gap-1.5 ${
                    isJoined
                      ? 'bg-emerald-600 text-white'
                      : ride.availableSeats === 0
                      ? 'bg-sand-200 text-sand-400 cursor-not-allowed'
                      : 'bg-sukoon-600 hover:bg-sukoon-700 text-white shadow-xs'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Joined!</span>
                    </>
                  ) : (
                    <>
                      <Car className="w-3.5 h-3.5" />
                      <span>Join Ride</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

