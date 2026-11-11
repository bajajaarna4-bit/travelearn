'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Heart, Sparkles, AlertCircle, Compass } from 'lucide-react';

interface FooterProps {
  onOpenSafetyShield?: () => void;
}

export default function Footer({ onOpenSafetyShield }: FooterProps) {
  return (
    <footer className="bg-sand-900 text-sand-300 pt-16 pb-12 border-t border-sand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Branding & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-sand-800">
          
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sukoon-500 to-terracotta flex items-center justify-center text-white font-serif text-xl font-bold shadow-md">
                स्
              </div>
              <span className="font-serif font-bold text-xl text-sand-100 tracking-tight">
                SukoonRoute
              </span>
            </div>
            <p className="text-xs text-sand-400 leading-relaxed">
              A community sanctuary for slow, low-budget roamers to travel cheaply through work-exchange, ashram stays, shared journeys, and women's safety.
            </p>
            <p className="text-[11px] font-devanagari text-sand-500">
              शान्ति, सेवा, सानिध्य एवं स्वाध्याय
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-sand-100 uppercase tracking-wider mb-3">
              Explore India
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/explore?region=rajasthan" className="hover:text-amber-400 transition-colors">Pushkar & Jaipur, Rajasthan</Link></li>
              <li><Link href="/explore?region=rishikesh" className="hover:text-amber-400 transition-colors">Tapovan & Ganga, Rishikesh</Link></li>
              <li><Link href="/explore?region=varanasi" className="hover:text-amber-400 transition-colors">Ancient Ghats, Varanasi</Link></li>
              <li><Link href="/explore?region=himachal" className="hover:text-amber-400 transition-colors">Kasol & Tosh, Parvati Valley</Link></li>
              <li><Link href="/explore?region=kerala" className="hover:text-amber-400 transition-colors">Fort Kochi & Backwaters, Kerala</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-sand-100 uppercase tracking-wider mb-3">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/gigs" className="hover:text-amber-400 transition-colors">Work & Earn (Hostel & Farm Gigs)</Link></li>
              <li><Link href="/stays" className="hover:text-amber-400 transition-colors">Ashram & Homestay Sanctuaries</Link></li>
              <li><Link href="/rides" className="hover:text-amber-400 transition-colors">Carpool & Train Cost Sharing</Link></li>
              <li><Link href="/culture" className="hover:text-amber-400 transition-colors">Culture & Audio Hindi Phrasebook</Link></li>
              <li><Link href="/qa" className="hover:text-amber-400 transition-colors">Roamer Q&A & Visa Clarifications</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-sand-100 uppercase tracking-wider mb-3">
              Safety & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenSafetyShield}
                  className="hover:text-emerald-400 text-left transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Women Safety Shield & SOS</span>
                </button>
              </li>
              <li><Link href="/safety" className="hover:text-emerald-400 transition-colors">Emergency Helplines (112, 1091)</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Host Verification Review</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Visa Regulations & Legal Notice</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Our Slow Travel Vision</Link></li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer Box required by prompt */}
        <div className="bg-sand-950/70 p-5 rounded-2xl border border-sand-800 text-[11px] text-sand-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>CRITICAL LEGAL NOTICE & VISA DISCLAIMER</span>
          </div>
          <p className="leading-relaxed">
            <strong>Tourist Visa Regulations:</strong> Under Government of India and international immigration laws, foreign travellers holding an e-Tourist or Tourist Visa are strictly prohibited from engaging in paid employment, salary-bearing commercial work, or business trade. Listings on SukoonRoute are framed exclusively as voluntary cultural immersion, cost-sharing, and unpaid hospitality exchange (food & lodging in exchange for learning and light community assistance).
          </p>
          <p className="leading-relaxed">
            <strong>Train & Flight Ticket Notice:</strong> Under Indian Railways (IRCTC) regulations, train tickets are strictly non-transferable. SukoonRoute does NOT permit or facilitate the resale or barter of railway or airline tickets. Our ride-sharing section is strictly for travelling companions to coordinate joint cab/carpool fuel cost sharing or mutual journey accompaniment.
          </p>
        </div>

        {/* Bottom copyright & credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-sand-500 gap-4">
          <p>© {new Date().getFullYear()} SukoonRoute. Dedicated to peaceful slow roamers, female solo security, and spiritual fellowship.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-sand-300">Privacy & Terms</Link>
            <span>•</span>
            <Link href="/safety" className="hover:text-sand-300">Emergency 112</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

