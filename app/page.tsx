'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, Compass, Sparkles, Heart, Coffee, Bed, Briefcase, 
  Car, ArrowRight, CheckCircle2, Star, Users, MapPin, 
  HelpCircle, ShieldCheck, Moon, Sun, ArrowUpRight
} from 'lucide-react';
import { useApp } from '@/lib/store';

export default function HomePage() {
  const { toggleWomenSafetyMode, isWomenSafetyMode, user } = useApp();
  const [activeTab, setActiveTab] = useState<'earn' | 'stay' | 'ride' | 'learn' | 'teach'>('earn');

  const tabsContent = {
    earn: {
      headline: 'Voluntary Work-Exchange & Cultural Gigs',
      subline: 'Trade 3-4 hours of light hostel hosting, organic garden watering, sourdough baking, or mural painting for a free room, Sattvic meals, and warm chai.',
      badge: 'Visa Compliant Cultural Immersion',
      href: '/gigs',
      buttonText: 'Explore Work Gigs',
      img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      tag: 'Pushkar Haveli Host'
    },
    stay: {
      headline: 'Ashrams, Homestays & Free Sanctuary Beds',
      subline: 'From ₹0 work-exchange floor rooms overlooking Varanasi’s morning ghats to ₹350/night Vedic ashram dorms in Tapovan, sleep safely without hotel prices.',
      badge: 'Women-Only Stays Available',
      href: '/stays',
      buttonText: 'Browse Sanctuaries',
      img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
      tag: 'Ganga Bank Ashram'
    },
    ride: {
      headline: 'Travel Together & Share Real Journey Costs',
      subline: 'Share verified female-chauffeured cabs, split overnight autos, or coordinate companion seats on Indian Railways sleeper coaches safely.',
      badge: 'Zero Ticket Resale • Verified Companions',
      href: '/rides',
      buttonText: 'Find Shared Rides',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      tag: 'Jaipur to Pushkar Carpool'
    },
    learn: {
      headline: 'Exchange Skills, Yoga & Sacred Knowledge',
      subline: 'Learn Rajasthani woodblock natural printing, Kabir poetry on rowing boats, classical vocals, and Hatha yoga directly from local masters.',
      badge: 'Donation & Skill Swap',
      href: '/culture',
      buttonText: 'Discover Traditions',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      tag: 'Desert Twilight Chanting'
    },
    teach: {
      headline: 'Share Your Craft & Pay It Forward',
      subline: 'Can you teach French, build a WordPress portfolio, play the acoustic guitar, or capture reels? Offer your gift and get local lodging.',
      badge: 'Mutual Barter Economy',
      href: '/post',
      buttonText: 'Offer What You Teach',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      tag: 'Sanganer Studio Barter'
    }
  };

  const currentTab = tabsContent[activeTab];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-20 bg-gradient-to-b from-[#FFF6EE] via-[#FDF0E3] to-[#FAF8F5]">
        
        {/* Soft Background Mesh Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-sukoon-300/30 to-terracotta/10 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-forest-300/20 to-amber-200/20 rounded-full blur-3xl -z-10 transform -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-sand-300/80 shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sukoon-500 animate-ping" />
              <span className="text-xs font-semibold text-sand-800">
                A Haven for Slow Backpackers, Seekers & Women Solo Roamers
              </span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-sand-900 leading-[1.08]">
              Travel slow. <br className="hidden sm:inline" />
              Earn a little. <br className="hidden sm:inline" />
              <span className="text-gradient-saffron">Find sukoon.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-sand-700 max-w-2xl mx-auto leading-relaxed">
              Travel cheaply or free across India through volunteer work-exchange, sacred ashram stays, shared rides, and skill barters — built from the ground up for women's safety.
            </p>

            {/* Quick Intent Selector: What are you looking for? */}
            <div className="pt-2">
              <p className="text-xs font-bold text-sand-600 uppercase tracking-widest mb-3">
                What is your soul seeking?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
                {(['earn', 'stay', 'ride', 'learn', 'teach'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-sukoon-600 text-white shadow-md scale-105'
                        : 'bg-white/80 text-sand-700 hover:bg-sand-100 border border-sand-200'
                    }`}
                  >
                    {tab === 'earn' && '💼 '}
                    {tab === 'stay' && '🛏️ '}
                    {tab === 'ride' && '🚗 '}
                    {tab === 'learn' && '📖 '}
                    {tab === 'teach' && '🎨 '}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Preview Showcase Card */}
            <div className="pt-6">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sukoon text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sukoon-100 text-sukoon-800">
                    {currentTab.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-sand-900 leading-snug">
                    {currentTab.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-sand-600 leading-relaxed">
                    {currentTab.subline}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={currentTab.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs shadow-md transition-all group"
                    >
                      <span>{currentTab.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md group">
                  <img
                    src={currentTab.img}
                    alt={currentTab.tag}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    📍 {currentTab.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Seals Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-sand-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest-600" />
                <span className="font-medium">100% ID Verified Hosts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Women-Only Mode & Live SOS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-amber-700" />
                <span className="font-medium">Zero Ticket Resale • Pure Cost Sharing</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Signature Features Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
            Crafted for Consciousness
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900">
            Signature Roamer Innovations
          </h2>
          <p className="text-sm text-sand-600">
            No generic feeds. Every feature is designed to protect women, lower costs, and bring authentic inner peace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Sukoon Compass */}
          <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <h3 className="font-serif text-xl font-bold text-sand-900">The Sukoon Compass</h3>
              <p className="text-xs text-sand-600 leading-relaxed">
                Tune the animated mood dial between <em>Quiet, Healing, Curious, Adventurous,</em> or <em>Uncomfortable-but-growing</em> to discover places matched to your soul's current rhythm.
              </p>
            </div>
            <Link
              href="/explore"
              className="text-xs font-bold text-sukoon-600 flex items-center gap-1 pt-2 hover:underline"
            >
              <span>Explore Moods</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Women Safety Shield */}
          <div className="bg-gradient-to-br from-forest-50 to-white rounded-3xl p-6 border border-forest-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-600 text-white flex items-center justify-center shadow-md shadow-forest-600/20">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-950">Women Safety Shield</h3>
              <p className="text-xs text-forest-900/80 leading-relaxed">
                Equipped with one-tap emergency SOS siren, simulated fake incoming calls to escape uncomfortable taxis, "Arrived Safe" countdown timers, and direct 112 / 1091 hotline dialing.
              </p>
            </div>
            <Link
              href="/safety"
              className="text-xs font-bold text-forest-700 flex items-center gap-1 pt-2 hover:underline"
            >
              <span>Open Safety Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Journey Weaver */}
          <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-sand-900">Journey Weaver</h3>
              <p className="text-xs text-sand-600 leading-relaxed">
                Connect destinations like Pushkar, Rishikesh, and Varanasi. Watch your route calculate real train sleeper fares, auto-suggest free stays, and export as a shareable travel poster.
              </p>
            </div>
            <Link
              href="/explore"
              className="text-xs font-bold text-rose-600 flex items-center gap-1 pt-2 hover:underline"
            >
              <span>Weave Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Indian Sanctuaries Section */}
      <section className="bg-sand-100/60 py-16 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
                Slow Sanctuaries
              </span>
              <h2 className="font-serif text-3xl font-bold text-sand-900 mt-1">
                Authentic Indian Gateways
              </h2>
              <p className="text-xs sm:text-sm text-sand-600 mt-1">
                Tagged by Sukoon level (peace) and Comfort level (simplicity).
              </p>
            </div>

            <Link
              href="/stays"
              className="text-xs font-bold text-sukoon-700 hover:text-sukoon-800 flex items-center gap-1"
            >
              <span>View All 18 Stays</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stay 1: Pushkar */}
            <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
                    alt="Pushkar Haveli"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-forest-800 shadow-xs">
                    Women Only Floor
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-emerald-300 backdrop-blur-sm">
                    Safety: 98/100
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-sand-500">
                    <span>Pushkar, Rajasthan</span>
                    <span className="font-bold text-sukoon-600">Free Work-Exchange</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-sand-900 group-hover:text-sukoon-700 transition-colors line-clamp-1">
                    Savitri Hills Peace Hermitage
                  </h4>
                  <p className="text-xs text-sand-600 line-clamp-2">
                    Quiet traditional haveli with lime plaster walls and desert views. Vegetarian meals included.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 border-t border-sand-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-sand-700">Sukoon: 5/5 • Comfort: 4/5</span>
                <Link href="/stays/stay_1" className="font-bold text-sukoon-600 hover:underline">
                  View Stay
                </Link>
              </div>
            </div>

            {/* Stay 2: Rishikesh */}
            <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80"
                    alt="Rishikesh Ashram"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-amber-800 shadow-xs">
                    Vedic Ashram Dorm
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-emerald-300 backdrop-blur-sm">
                    Safety: 92/100
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-sand-500">
                    <span>Tapovan, Rishikesh</span>
                    <span className="font-bold text-amber-800">₹350 / Donation</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-sand-900 group-hover:text-sukoon-700 transition-colors line-clamp-1">
                    Ganga Bank Vedic Dorm & Hall
                  </h4>
                  <p className="text-xs text-sand-600 line-clamp-2">
                    50 steps from holy Ganga. Daily 6 AM yoga, silent reading garden, and Sattvic food.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 border-t border-sand-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-sand-700">Sukoon: 5/5 • Comfort: 3/5</span>
                <Link href="/stays/stay_2" className="font-bold text-sukoon-600 hover:underline">
                  View Stay
                </Link>
              </div>
            </div>

            {/* Stay 3: Kasol */}
            <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                    alt="Himachal Cottage"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-emerald-800 shadow-xs">
                    Women Only Trekker
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-emerald-300 backdrop-blur-sm">
                    Safety: 95/100
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-sand-500">
                    <span>Tosh Trail, Himachal</span>
                    <span className="font-bold text-forest-700">₹400 Cost-Share</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-sand-900 group-hover:text-sukoon-700 transition-colors line-clamp-1">
                    Kasol Apple Orchard Cottage
                  </h4>
                  <p className="text-xs text-sand-600 line-clamp-2">
                    Wood-burning tandoor stove and spring water among 60-year-old mountain apple trees.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 border-t border-sand-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-sand-700">Sukoon: 5/5 • Comfort: 3/5</span>
                <Link href="/stays/stay_3" className="font-bold text-sukoon-600 hover:underline">
                  View Stay
                </Link>
              </div>
            </div>

            {/* Stay 4: Varanasi */}
            <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80"
                    alt="Varanasi Ghat"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-orange-800 shadow-xs">
                    Ghat Rooftop
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-emerald-300 backdrop-blur-sm">
                    Safety: 90/100
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-sand-500">
                    <span>Munshi Ghat, Varanasi</span>
                    <span className="font-bold text-sukoon-600">Free Work-Exchange</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-sand-900 group-hover:text-sukoon-700 transition-colors line-clamp-1">
                    Ancient Ghat Roof Room
                  </h4>
                  <p className="text-xs text-sand-600 line-clamp-2">
                    Wake to rowing wooden boats and holy chants. Help tidy the library 2 hours daily.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 border-t border-sand-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-sand-700">Sukoon: 5/5 • Comfort: 2/5</span>
                <Link href="/stays/stay_4" className="font-bold text-sukoon-600 hover:underline">
                  View Stay
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Roamer Community Stories & Passport Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-sand-900 text-white rounded-4xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Karma & Travel Passport
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Earn Karma. Collect Pilgrim Stamps. Give Back to Every Ashram.
            </h2>
            <p className="text-sm text-sand-300 leading-relaxed">
              SukoonRoute doesn’t measure status by money spent. You earn Karma Points by helping hosts, guiding solo women safely, writing verified safety tips, and washing thalis at community kitchens.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="stamp-seal border-amber-400 text-amber-300">🕉️ Pushkar Ghats</span>
              <span className="stamp-seal border-teal-400 text-teal-300">🌊 Ganga Bank Tapovan</span>
              <span className="stamp-seal border-emerald-400 text-emerald-300">🏔️ Parvati Valley Tosh</span>
              <span className="stamp-seal border-orange-400 text-orange-300">🪔 Assi Ghat Sunrise</span>
            </div>
            <div className="pt-4">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sukoon-500 to-terracotta text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
              >
                <span>View My Roamer Passport</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="absolute right-0 bottom-0 w-96 h-96 opacity-10 pointer-events-none font-serif text-[280px] font-bold text-white flex items-end justify-end leading-none">
            स्
          </div>
        </div>
      </section>

    </div>
  );
}

