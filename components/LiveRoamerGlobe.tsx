'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Globe, Users, Sparkles, MapPin, Shield, Play, Pause } from 'lucide-react';

interface RoamerActivity {
  id: string;
  city: string;
  activity: string;
  timeAgo: string;
  avatar: string;
}

const ACTIVITIES: RoamerActivity[] = [
  {
    id: 'act_1',
    city: 'Pushkar, Rajasthan',
    activity: 'Devika confirmed guest for courtyard garden help',
    timeAgo: '4 mins ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'act_2',
    city: 'Tapovan, Rishikesh',
    activity: 'Chai Table initiated: 4 solo women joined at Little Buddha Cafe',
    timeAgo: '12 mins ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'act_3',
    city: 'Tosh, Parvati Valley',
    activity: 'Pema Dolma welcomed roamer for apple orchard stay',
    timeAgo: '28 mins ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'act_4',
    city: 'Munshi Ghat, Varanasi',
    activity: 'Kabir dawn poetry boat circle departed Assi Ghat',
    timeAgo: '45 mins ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
  }
];

export default function LiveRoamerGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeActivityIdx, setActiveActivityIdx] = useState(0);

  // Rotate activity ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveActivityIdx(prev => (prev + 1) % ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Canvas Globe Rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 110;

      // Outer atmosphere halo
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.25);
      gradient.addColorStop(0, 'rgba(200, 116, 67, 0.25)');
      gradient.addColorStop(0.8, 'rgba(230, 126, 34, 0.08)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Globe sphere body
      const sphereGrad = ctx.createRadialGradient(centerX - 30, centerY - 30, 10, centerX, centerY, radius);
      sphereGrad.addColorStop(0, '#FFF3E8');
      sphereGrad.addColorStop(0.7, '#F2DEC9');
      sphereGrad.addColorStop(1, '#D9B89A');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200, 116, 67, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latitude / Longitude lines
      ctx.strokeStyle = 'rgba(180, 95, 45, 0.2)';
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + i * 28, radius * Math.cos((i * 28 * Math.PI) / 180), 12, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating meridians
      for (let i = 0; i < 4; i++) {
        const meridianAngle = angle + (i * Math.PI) / 4;
        const xOffset = Math.sin(meridianAngle) * radius;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.abs(xOffset), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Pulsing destination pins (Pushkar, Rishikesh, Varanasi, Kasol, Kochi)
      const pins = [
        { name: 'Pushkar', lat: 0.15, lng: angle + 0.2, color: '#C87443' },
        { name: 'Rishikesh', lat: -0.25, lng: angle + 0.6, color: '#2A7B62' },
        { name: 'Kasol', lat: -0.45, lng: angle + 0.4, color: '#3E6B7A' },
        { name: 'Varanasi', lat: 0.05, lng: angle + 1.1, color: '#D35400' },
        { name: 'Kochi', lat: 0.55, lng: angle + 0.8, color: '#2F8566' },
      ];

      pins.forEach(pin => {
        // compute 3D projection onto visible sphere surface
        const cosLng = Math.cos(pin.lng);
        if (cosLng > 0) { // visible hemisphere
          const px = centerX + Math.sin(pin.lng) * radius * Math.cos(pin.lat);
          const py = centerY + Math.sin(pin.lat) * radius;

          // Pulse ring
          ctx.beginPath();
          ctx.arc(px, py, 6 + Math.sin(Date.now() / 250) * 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(230, 126, 34, 0.35)';
          ctx.fill();

          // Center dot
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = pin.color;
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      if (isRotating) {
        angle += 0.008;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating]);

  const activeActivity = ACTIVITIES[activeActivityIdx];

  return (
    <div className="bg-gradient-to-br from-[#FFF8F2] via-white to-[#F9EFE6] rounded-4xl p-6 sm:p-8 border border-sand-300 shadow-sukoon space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sukoon-100 text-sukoon-700 flex items-center justify-center">
            <Globe className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-bold text-sand-900">
                Live Roamer Globe
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Network
              </span>
            </div>
            <p className="text-xs text-sand-500">
              Anonymised live activity across sanctuaries (locations safety-blurred)
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className="self-start sm:self-auto px-3 py-1.5 rounded-full bg-sand-100 hover:bg-sand-200 text-sand-700 font-semibold text-xs border border-sand-300 transition-colors flex items-center gap-1.5"
        >
          {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isRotating ? 'Pause Rotation' : 'Resume Spin'}</span>
        </button>
      </div>

      {/* Main Visual Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Globe Canvas (6 cols) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative">
          <canvas
            ref={canvasRef}
            width={320}
            height={300}
            className="max-w-full drop-shadow-lg"
          />
          <div className="absolute bottom-2 text-center text-[10px] text-sand-500 font-medium">
            Pulsing: Pushkar • Rishikesh • Kasol • Varanasi • Kochi
          </div>
        </div>

        {/* Live Activity Ticker & Safety Card (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          
          <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sukoon-600 block">
              Latest Network Event:
            </span>

            <div className="flex items-start gap-3 animate-fadeIn">
              <img
                src={activeActivity.avatar}
                alt="Roamer"
                className="w-10 h-10 rounded-2xl object-cover ring-2 ring-sukoon-300 flex-shrink-0"
              />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-sand-900 leading-snug">
                  {activeActivity.activity}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-sand-500">
                  <span className="flex items-center gap-1 font-semibold text-sukoon-700">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {activeActivity.city}
                  </span>
                  <span>•</span>
                  <span>{activeActivity.timeAgo}</span>
                </div>
              </div>
            </div>

            {/* Stepper dots */}
            <div className="flex gap-1.5 pt-2">
              {ACTIVITIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveActivityIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeActivityIdx ? 'w-6 bg-sukoon-600' : 'w-2 bg-sand-300'
                  }`}
                  aria-label={`Show Activity ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Privacy Guarantee Pill */}
          <div className="p-3.5 bg-forest-50/70 border border-forest-200 rounded-2xl text-xs text-forest-900 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Exact GPS Concealed:</strong> Active pins represent generalized towns and sanctuary clusters. Individual traveller coordinates are never revealed on the public globe.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

