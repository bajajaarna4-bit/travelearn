'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Bed, Car, MessageSquare, CheckCircle, 
  Clock, ArrowRight, ShieldCheck, UserCheck, PlusCircle
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function DashboardPage() {
  const { applications, bookings, rideJoins, openChatWith, messages, user } = useApp();
  const [activeTab, setActiveTab] = useState<'applications' | 'bookings' | 'rides' | 'messages'>('applications');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
            Roamer Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-sand-900 mt-1">
            My Travel Dashboard
          </h1>
          <p className="text-xs text-sand-600 mt-0.5">
            Manage your work-exchange gigs, sanctuary bookings, carpools, and conversations.
          </p>
        </div>

        <Link
          href="/post"
          className="px-4 py-2 rounded-2xl bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Listing</span>
        </Link>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap bg-sand-100 p-1.5 rounded-2xl border border-sand-200 text-xs font-semibold max-w-xl">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'applications' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
          }`}
        >
          Work Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'bookings' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
          }`}
        >
          Stay Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('rides')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'rides' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
          }`}
        >
          Shared Rides ({rideJoins.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'messages' ? 'bg-white text-sukoon-700 shadow-xs' : 'text-sand-600'
          }`}
        >
          Messages
        </button>
      </div>

      {/* Tab 1: Work Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sukoon-100 text-sukoon-800">
                      Work-Exchange
                    </span>
                    <span className="text-xs text-sand-400">Applied {app.appliedDate}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-sand-900">{app.gigTitle}</h3>
                  <p className="text-xs text-sand-500">Host: <strong>{app.hostName}</strong></p>
                  <p className="text-xs text-sand-700 italic bg-sand-50 p-2.5 rounded-xl border border-sand-200 mt-2">
                    "{app.message}"
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'Accepted'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : app.status === 'Declined'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    Status: {app.status}
                  </span>

                  <button
                    onClick={() => openChatWith({ id: 'host_raj_01', name: app.hostName, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' })}
                    className="text-xs font-bold text-sukoon-600 hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Host</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-sand-200 p-8 space-y-3">
              <p className="text-sm text-sand-600">You haven't applied to any work-exchange gigs yet.</p>
              <Link href="/gigs" className="inline-block px-5 py-2.5 bg-sukoon-600 text-white rounded-full text-xs font-bold">
                Browse Open Gigs
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Stay Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-forest-100 text-forest-800">
                    Sanctuary Booking
                  </span>
                  <h3 className="font-serif font-bold text-base text-sand-900">{b.stayTitle}</h3>
                  <p className="text-xs text-sand-600">Host: {b.hostName} • Dates: <strong>{b.dates}</strong></p>
                  <p className="text-[11px] text-sand-500">{b.priceType}</p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ✓ Confirmed
                  </span>
                  <button
                    onClick={() => openChatWith({ id: 'host_raj_01', name: b.hostName, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' })}
                    className="text-xs font-bold text-forest-700 hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat with Ashram</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-sand-200 p-8 space-y-3">
              <p className="text-sm text-sand-600">No active stay reservations.</p>
              <Link href="/stays" className="inline-block px-5 py-2.5 bg-forest-700 text-white rounded-full text-xs font-bold">
                Browse Stays
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Shared Rides */}
      {activeTab === 'rides' && (
        <div className="space-y-4">
          {rideJoins.length > 0 ? (
            rideJoins.map((rj) => (
              <div
                key={rj.id}
                className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sand-100 text-sand-800">
                    Carpool Cost-Share
                  </span>
                  <h3 className="font-serif font-bold text-base text-sand-900">{rj.route}</h3>
                  <p className="text-xs text-sand-600">Departure: {rj.departure} • {rj.seats} seat confirmed</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  ✓ Seat Reserved
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-sand-200 p-8 space-y-3">
              <p className="text-sm text-sand-600">No shared rides joined yet.</p>
              <Link href="/rides" className="inline-block px-5 py-2.5 bg-sukoon-600 text-white rounded-full text-xs font-bold">
                Find Shared Carpool
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-3xl p-6 border border-sand-200 space-y-4">
          <h3 className="font-serif text-lg font-bold text-sand-900">Protected Conversations</h3>
          <div className="divide-y divide-sand-100">
            <button
              onClick={() => openChatWith({ id: 'host_raj_01', name: 'Devika Rathore', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' })}
              className="w-full py-4 text-left flex items-center justify-between hover:bg-sand-50 rounded-2xl px-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                  alt="Devika"
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-sukoon-500"
                />
                <div>
                  <h4 className="font-bold text-xs text-sand-900">Devika Rathore (Pushkar Host)</h4>
                  <p className="text-xs text-sand-500 truncate max-w-sm">
                    {messages[messages.length - 1]?.text || 'Looking forward to welcoming you!'}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-sukoon-600 flex items-center gap-1">
                <span>Open Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
