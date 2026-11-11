'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Briefcase, ShieldAlert, Coffee, User, Heart } from 'lucide-react';
import { useApp } from '@/lib/store';

interface BottomNavProps {
  onOpenSafetyShield: () => void;
  onOpenChaiTable: () => void;
}

export default function BottomNav({ onOpenSafetyShield, onOpenChaiTable }: BottomNavProps) {
  const pathname = usePathname();
  const { user, isSOSActive, chaiMeetups } = useApp();

  const activeMeetupsCount = chaiMeetups.length;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-lg border-t border-sand-200 py-1 px-2 safe-area-pb">
      <div className="flex items-center justify-around">
        
        {/* Explore */}
        <Link
          href="/explore"
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            pathname === '/explore' ? 'text-sukoon-600 font-bold' : 'text-sand-600'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Explore</span>
        </Link>

        {/* Gigs */}
        <Link
          href="/gigs"
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            pathname === '/gigs' ? 'text-sukoon-600 font-bold' : 'text-sand-600'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span>Work/Earn</span>
        </Link>

        {/* Center Floating Safety Shield SOS Button */}
        <button
          onClick={onOpenSafetyShield}
          className="flex flex-col items-center -mt-5 focus:outline-none group"
          aria-label="Women Safety Shield & SOS"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 ${
            isSOSActive 
              ? 'bg-red-600 sos-pulse ring-4 ring-red-300' 
              : 'bg-gradient-to-tr from-forest-700 to-forest-500 shadow-forest-600/30 ring-2 ring-white'
          }`}>
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-forest-700 mt-0.5">Safety</span>
        </button>

        {/* Chai Table */}
        <button
          onClick={onOpenChaiTable}
          className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium text-sand-600 relative"
        >
          <div className="relative">
            <Coffee className="w-5 h-5 mb-0.5 text-amber-700" />
            {activeMeetupsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {activeMeetupsCount}
              </span>
            )}
          </div>
          <span className="text-amber-900 font-medium">Chai Table</span>
        </button>

        {/* Travel Passport */}
        <Link
          href="/profile"
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            pathname === '/profile' ? 'text-sukoon-600 font-bold' : 'text-sand-600'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Passport</span>
        </Link>

      </div>
    </div>
  );
}
