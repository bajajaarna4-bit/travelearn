'use client';

import React, { useState } from 'react';
import { Coffee, MapPin, Clock, Users, ShieldCheck, Plus, X, Heart, AlertCircle } from 'lucide-react';
import { useApp } from '@/lib/store';

interface ChaiTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChaiTableModal({ isOpen, onClose }: ChaiTableModalProps) {
  const { chaiMeetups, rsvpChai, user } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Pushkar');
  const [topic, setTopic] = useState('');
  const [womenOnly, setWomenOnly] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateMeetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!venueName || !topic) return;
    
    // Add to state and close form
    setShowCreateForm(false);
    setVenueName('');
    setAddress('');
    setTopic('');
  };

  const handleRSVP = (meetupId: string) => {
    rsvpChai(meetupId);
    setRsvpSuccess(meetupId);
    setTimeout(() => setRsvpSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sand-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-terracotta text-white p-5 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold">Chai Table</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  Public Meetups
                </span>
              </div>
              <p className="text-xs text-amber-100">
                Spontaneous, safe 1-2 hour tea gatherings at vetted public benches & cafes
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex-1">
          
          {/* Safety Rule Card */}
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Verified Public Spaces Only:</strong> All Chai Tables must be at open public stalls or busy cafes. No private room gatherings permitted. Keep your circle safe.
            </p>
          </div>

          {/* Broadcast Trigger */}
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-terracotta text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Coffee className="w-4 h-4" />
              <span>Tap "I'm Free for Chai" (Host a Meetup)</span>
            </button>
          ) : (
            <form onSubmit={handleCreateMeetup} className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-sand-800 uppercase">Host a Quick Chai Meetup</h4>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="text-xs text-sand-500 hover:text-sand-800"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-sand-700 block mb-1">
                  Public Venue Name (e.g. Varaha Ghat Tea Stall, German Bakery)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Varaha Ghat Chai Bench"
                  value={venueName}
                  onChange={e => setVenueName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-sand-700 block mb-1">
                  Topic or Roam Chat (What are you talking about?)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solo hitchhiking tips & sketchbooks"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="womenOnlyChai"
                  checked={womenOnly}
                  onChange={e => setWomenOnly(e.target.checked)}
                  className="rounded text-forest-600 focus:ring-forest-500"
                />
                <label htmlFor="womenOnlyChai" className="text-xs text-sand-800 font-medium">
                  Women-Only Gathering
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Broadcast 2-Hour Chai Invitation
              </button>
            </form>
          )}

          {/* Active Public Tables */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sand-700 uppercase tracking-wider">
              Happening Nearby Right Now:
            </h3>

            {chaiMeetups.map((meetup) => {
              const isRsvpd = rsvpSuccess === meetup.id;
              return (
                <div
                  key={meetup.id}
                  className="p-4 bg-sand-50 hover:bg-white rounded-2xl border border-sand-200 transition-all space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={meetup.hostAvatar}
                        alt={meetup.hostName}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-amber-500"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-sand-900">{meetup.hostName}</h4>
                          <span className="p-0.5 rounded-full bg-emerald-500 text-white" title="Verified Roamer">
                            <ShieldCheck className="w-3 h-3" />
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-700 font-semibold">{meetup.timeWindow}</p>
                      </div>
                    </div>

                    {meetup.womenOnly && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Women Only
                      </span>
                    )}
                  </div>

                  <div>
                    <h5 className="font-semibold text-xs text-sand-900 mb-0.5">"{meetup.topic}"</h5>
                    <p className="text-[11px] text-sand-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span>{meetup.venueName}, {meetup.address}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-sand-200 text-xs">
                    <span className="text-[11px] text-sand-500 flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5" />
                      {meetup.attendeesCount} / {meetup.maxAttendees} Roamers Joined
                    </span>

                    <button
                      onClick={() => handleRSVP(meetup.id)}
                      disabled={isRsvpd}
                      className={`px-3 py-1.5 rounded-full font-bold text-xs transition-colors flex items-center gap-1 ${
                        isRsvpd
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      }`}
                    >
                      <Coffee className="w-3 h-3" />
                      <span>{isRsvpd ? 'Joined! See you there' : 'Join Table'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

