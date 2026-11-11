'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, Shield, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand-600 hover:text-sand-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Statutory Compliance & Ethics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900">
          Terms of Service, Privacy & Legal Visa Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-sand-600">
          Last revised: November 2026 • Effective globally for all SukoonRoute roamers and hosts.
        </p>
      </div>

      <div className="bg-white rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-sm space-y-8 text-xs sm:text-sm text-sand-800 leading-relaxed">
        
        {/* Section 1: Visa Laws & Voluntary Cultural Exchange */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base font-serif">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <h2>1. Tourist Visa Laws & Non-Monetary Work-Exchange</h2>
          </div>
          <p>
            Under the provisions of the <strong>Foreigners Act (1946)</strong> and Indian Bureau of Immigration (BOI / FRRO) guidelines, foreign nationals visiting the Republic of India on an <strong>e-Tourist Visa or regular Tourist Visa are strictly prohibited from undertaking gainful employment, receiving salary payments, or engaging in commercial trade</strong>.
          </p>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <p className="font-bold">Mandatory Platform Framing:</p>
            <p>
              All gigs listed on SukoonRoute are framed exclusively as <strong>voluntary non-commercial cultural exchanges and cost-sharing hospitality</strong>. Hosts provide complimentary lodging, Sattvic meals, tea, or skills instruction as an act of guest hospitality in exchange for light educational or communal assistance (capped at 3-4 hours daily).
            </p>
            <p>
              Hosts are strictly prohibited from disbursing cash wages or commercial bank transfers to foreign tourist visa holders. Foreign citizens wishing to receive commercial remuneration must secure an appropriate Employment (E) Visa or Volunteer Visa issued by the Government of India.
            </p>
          </div>
        </section>

        {/* Section 2: Railway & Airline Ticket Non-Transferability */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-red-700 font-bold text-base font-serif">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <h2>2. Indian Railways (IRCTC) Ticket Resale Prohibition</h2>
          </div>
          <p>
            Under <strong>Section 142 of the Indian Railways Act, 1989</strong>, the transfer or resale of railway reserved tickets (IRCTC) or airline boarding passes to any other individual is illegal and punishable by fine and imprisonment.
          </p>
          <p>
            SukoonRoute does NOT permit or facilitate the resale, barter, or secondary transfer of tickets. The Ride Split module is exclusively designed for <strong>travelling companions to share the fuel/cab cost of privately hired taxis, auto-rickshaws, or to find companion roamers on the same railway coach</strong> to ensure mutual safety and luggage security during station stops.
          </p>
        </section>

        {/* Section 3: Women's Safety & Anti-Harassment Guarantee */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-forest-800 font-bold text-base font-serif">
            <Shield className="w-5 h-5 flex-shrink-0" />
            <h2>3. Women Safety & Anti-Harassment Protocols</h2>
          </div>
          <p>
            SukoonRoute enforces a zero-tolerance policy against sexual harassment, stalking, deceptive listing practices, unsolicited contact requests, or discriminatory conduct.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-sand-700">
            <li>Users who violate safety policies or misrepresent gender-restricted sanctuaries are immediately suspended.</li>
            <li>In-app communication masks telephone numbers and private contact handles until two roamers confirm mutual intent.</li>
            <li>Spontaneous Chai Table meetups must occur strictly in vetted, well-lit public spaces.</li>
          </ul>
        </section>

        {/* Section 4: Privacy & Location Data Safeguards */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sand-900 font-bold text-base font-serif">
            <Lock className="w-5 h-5 flex-shrink-0" />
            <h2>4. Privacy & GPS Location Data Protection</h2>
          </div>
          <p>
            SukoonRoute complies with modern data protection standards. Your device's real-time GPS coordinates are NEVER broadcast continuously or shared with third-party advertisers. GPS data is only accessed when you explicitly tap <strong>Emergency SOS</strong> or initiate an <strong>"Arrived Safe" Check-in Timer</strong> to deliver emergency assistance to your pre-authorized contacts.
          </p>
        </section>

        {/* Section 5: Pre-Launch Legal Checklist */}
        <section className="space-y-3 pt-2">
          <h2 className="font-serif font-bold text-base text-sand-900">
            5. Pre-Launch Regulatory Checklist for Roamers & Hosts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200">
              <span className="font-bold text-sand-900 block mb-1">✓ Form C Registration (India)</span>
              <span>Hosts welcoming foreign nationals must complete Form C registration on the Indian BoI portal within 24 hours of guest arrival.</span>
            </div>
            <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200">
              <span className="font-bold text-sand-900 block mb-1">✓ Homestay Municipal Licensing</span>
              <span>Homestay hosts must comply with state tourism department guidelines (e.g. Rajasthan Tourism, Kerala Homestay scheme).</span>
            </div>
            <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200">
              <span className="font-bold text-sand-900 block mb-1">✓ No Commercial Wage Transfers</span>
              <span>Ensure no payment slips, bank transactions, or wage invoices are generated for volunteer work-exchanges.</span>
            </div>
            <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200">
              <span className="font-bold text-sand-900 block mb-1">✓ Emergency Helpline Awareness</span>
              <span>Save 112 (National Emergency) and 1091 (Women Police Helpline) in your device.</span>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
