'use client';

import React, { useState } from 'react';
import { Sun, CloudRain, Snowflake, Flower2, Sparkles, X } from 'lucide-react';

export type SeasonTheme = 'default' | 'desert-sunset' | 'monsoon-rain' | 'winter-pine' | 'spring-blossom';

interface SeasonPainterProps {
  currentTheme: SeasonTheme;
  onThemeChange: (theme: SeasonTheme) => void;
}

export default function SeasonPainter({ currentTheme, onThemeChange }: SeasonPainterProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const themes = [
    {
      id: 'default' as const,
      label: 'Golden Hour Sukoon',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
      tag: 'Pushkar / Jaipur'
    },
    {
      id: 'monsoon-rain' as const,
      label: 'Kerala Monsoon Emerald',
      icon: <CloudRain className="w-3.5 h-3.5 text-teal-600" />,
      tag: 'Fort Kochi'
    },
    {
      id: 'winter-pine' as const,
      label: 'Himalayan Cedar Mist',
      icon: <Snowflake className="w-3.5 h-3.5 text-cyan-600" />,
      tag: 'Kasol / Tosh'
    },
    {
      id: 'spring-blossom' as const,
      label: 'Ganga Bank Sunrise',
      icon: <Flower2 className="w-3.5 h-3.5 text-rose-500" />,
      tag: 'Rishikesh / Varanasi'
    }
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-sand-100 hover:bg-sand-200 text-sand-800 transition-colors border border-sand-300/60"
        title="Season & Regional Atmosphere Painter"
      >
        <Sparkles className="w-3.5 h-3.5 text-sukoon-600" />
        <span className="hidden sm:inline">Atmosphere</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-3xl bg-white shadow-xl border border-sand-300 p-2 z-50 animate-fadeIn space-y-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-sand-500 border-b border-sand-100 flex items-center justify-between">
            <span>Regional Seasons</span>
            <button onClick={() => setMenuOpen(false)} className="text-sand-400 hover:text-sand-700">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {themes.map(t => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onThemeChange(t.id);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-2xl text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected ? 'bg-sand-100 font-bold text-sand-900' : 'hover:bg-sand-50 text-sand-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {t.icon}
                  <div>
                    <p className="leading-tight">{t.label}</p>
                    <p className="text-[10px] text-sand-400">{t.tag}</p>
                  </div>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sukoon-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
