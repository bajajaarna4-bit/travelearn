'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Briefcase, MapPin, Shield, CheckCircle2, Clock, 
  Calendar, AlertTriangle, ArrowLeft, Send, Check, Heart, UserCheck
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { gigs, applyToGig, openChatWith } = useApp();

  const gigId = params.id as string;
  const gig = gigs.find(g => g.id === gigId) || gigs[0];

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [pitchMessage, setPitchMessage] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchMessage.trim()) return;
    applyToGig(gig.id, pitchMessage);
    setIsApplied(true);
    setApplyModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/gigs"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand-600 hover:text-sand-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Gigs</span>
      </Link>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-md bg-sand-200">
            <img
              src={gig.images[0]}
              alt={gig.title}
              className="w-full h-full object-cover"
            />
            {gig.isWomenOnly && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                Women Only Sanctuary
              </span>
            )}
          </div>

          {/* Title & Location Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-sand-500">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{gig.location}, {gig.state}</span>
              <span>•</span>
              <span>Posted {gig.createdAt}</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-sand-900 leading-snug">
              {gig.title}
            </h1>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-sand-900">About This Work-Exchange</h2>
            <p className="text-sm text-sand-700 leading-relaxed whitespace-pre-line">
              {gig.description}
            </p>
          </div>

          {/* Skills Required */}
          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <h3 className="font-serif text-base font-bold text-sand-900">Skills & Help Needed</h3>
            <div className="flex flex-wrap gap-2">
              {gig.skillsNeeded.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-sand-100 text-sand-800 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Perks checklist */}
          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <h3 className="font-serif text-base font-bold text-sand-900">Perks & Hospitality Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {gig.perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2 p-2.5 rounded-xl bg-sukoon-50 text-sukoon-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sukoon-600 flex-shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Country Visa & Legal Notice Card */}
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>FRRO & IMMIGRATION LEGAL DISCLOSURE (INDIA)</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {gig.visaWarning}
            </p>
          </div>

        </div>

        {/* Right Sticky Booking Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-md space-y-6 sticky top-24">
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sand-500 block">Compensation</span>
              <span className="text-xl font-serif font-bold text-sukoon-700">Free Boarding & Meals</span>
              <p className="text-xs text-sand-500 mt-0.5">Voluntary Cultural Exchange</p>
            </div>

            <div className="space-y-3 text-xs border-y border-sand-100 py-4">
              <div className="flex justify-between">
                <span className="text-sand-500">Daily Hours:</span>
                <span className="font-bold text-sand-800">{gig.hoursPerDay} hours / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand-500">Stay Duration:</span>
                <span className="font-bold text-sand-800">{gig.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand-500">Sukoon Level:</span>
                <span className="font-bold text-sukoon-600">{gig.sukoonLevel} / 5 (Serene)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand-500">Comfort Level:</span>
                <span className="font-bold text-sand-800">{gig.comfortLevel} / 5</span>
              </div>
            </div>

            {/* Host Mini Profile */}
            <div className="p-3 bg-sand-50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={gig.hostAvatar}
                  alt={gig.hostName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-sukoon-500"
                />
                <div>
                  <h4 className="font-bold text-xs text-sand-900">{gig.hostName}</h4>
                  <p className="text-[10px] text-emerald-700 font-semibold">Verified Sanctuary Host</p>
                </div>
              </div>

              <button
                onClick={() => openChatWith({ id: gig.hostId, name: gig.hostName, avatar: gig.hostAvatar })}
                className="text-[11px] font-bold text-sukoon-600 hover:underline"
              >
                Chat
              </button>
            </div>

            {/* Apply Button */}
            {isApplied ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-center text-xs text-emerald-800 font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Application Submitted to Host</span>
              </div>
            ) : (
              <button
                onClick={() => setApplyModalOpen(true)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-sukoon-500 to-terracotta text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Apply for this Work-Exchange</span>
              </button>
            )}

            <p className="text-[10px] text-sand-400 text-center leading-relaxed">
              No deposit required. In-app communication protected under Women Safety guidelines.
            </p>

          </div>

        </div>

      </div>

      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sand-300 space-y-4">
            <h3 className="font-serif text-lg font-bold text-sand-900">
              Apply to Host: {gig.hostName}
            </h3>
            <p className="text-xs text-sand-600">
              Share your skills, relevant experience, why you love slow travel, and dates you are available.
            </p>

            <form onSubmit={handleApply} className="space-y-4">
              <textarea
                required
                rows={4}
                placeholder="Namaste! I would love to help with garden care and reels. I am available for 2 weeks in November..."
                value={pitchMessage}
                onChange={(e) => setPitchMessage(e.target.value)}
                className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-sukoon-500"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-sand-100 text-sand-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white text-xs font-bold shadow-xs"
                >
                  Send Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

