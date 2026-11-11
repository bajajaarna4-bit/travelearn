'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Heart, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-sukoon-600">
          Manifesto & Mission
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-sand-900 leading-tight">
          Why SukoonRoute Exists
        </h1>
        <p className="text-sm sm:text-base text-sand-600 max-w-2xl mx-auto leading-relaxed">
          Modern tourism has turned travel into frantic check-listing and overpriced consumption. We believe travel should be slow, contemplative, safe for women, and grounded in mutual service.
        </p>
      </div>

      {/* Manifesto Principles */}
      <div className="bg-white rounded-4xl p-8 sm:p-12 border border-sand-200 shadow-sm space-y-8">
        <h2 className="font-serif text-2xl font-bold text-sand-900">Our Four Core Tenets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-sukoon-800 flex items-center gap-2">
              <span>1. Sukoon over Luxury</span>
            </h3>
            <p className="text-sand-600">
              A stone floor room overlooking morning boat songs in Varanasi often brings more stillness than a marble lobby. We rate places not by gold faucets, but by Sukoon (inner calm) and authentic peace.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-forest-800 flex items-center gap-2">
              <span>2. Women Safety is Non-Negotiable</span>
            </h3>
            <p className="text-sand-600">
              No solo woman should be barred from experiencing India's spiritual beauty out of anxiety. Every host is ID audited, every spontaneous Chai Table must be in public, and our Safety Shield stays with you at all times.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-amber-800 flex items-center gap-2">
              <span>3. Service (Seva) & Work-Exchange</span>
            </h3>
            <p className="text-sand-600">
              When you help a family water their haveli garden or paint wooden menu boards, you cease being a voyeuristic tourist and become a guest in the home.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-stone-800 flex items-center gap-2">
              <span>4. Legal Framing & Ethical Roaming</span>
            </h3>
            <p className="text-sand-600">
              We strictly uphold Foreigners Regional Registration Office (FRRO) norms: foreign tourist visa holders participate in voluntary, non-monetary cultural exchanges without commercial wages.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center space-y-4">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white font-bold text-xs shadow-md transition-all"
        >
          <span>Begin Your Slow Journey</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
