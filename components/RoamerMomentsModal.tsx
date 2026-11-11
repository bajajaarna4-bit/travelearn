'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Camera, MapPin, Volume2, X, Heart, 
  EyeOff, CheckCircle2, Plus, Clock, Play
} from 'lucide-react';
import { useApp } from '@/lib/store';

interface RoamerMoment {
  id: string;
  authorName: string;
  authorAvatar: string;
  location: string;
  photoUrl: string;
  caption: string;
  audioNoteDuration?: string;
  isFaceBlurred: boolean;
  timeRemaining: string;
  likesCount: number;
}

const INITIAL_MOMENTS: RoamerMoment[] = [
  {
    id: 'mom_1',
    authorName: 'Ananya S.',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Pushkar Desert Dunes',
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    caption: 'Evening wind over the sand hills. Temple bells from 52 ghats ringing all at once.',
    audioNoteDuration: '0:24',
    isFaceBlurred: false,
    timeRemaining: '18h left',
    likesCount: 29
  },
  {
    id: 'mom_2',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    location: 'Tapovan Ghat, Rishikesh',
    photoUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    caption: 'Morning dip in the emerald Ganga. Simple hot ginger tea with fellow ashram volunteer.',
    audioNoteDuration: '0:15',
    isFaceBlurred: true,
    timeRemaining: '11h left',
    likesCount: 42
  },
  {
    id: 'mom_3',
    authorName: 'Pooja Bhatt',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'Assi Ghat, Varanasi',
    photoUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    caption: 'Ancient rowing boat at 5:45 AM. Sant Kabir verses echoing across the holy water.',
    audioNoteDuration: '0:32',
    isFaceBlurred: false,
    timeRemaining: '6h left',
    likesCount: 38
  }
];

interface RoamerMomentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoamerMomentsModal({ isOpen, onClose }: RoamerMomentsModalProps) {
  const { user, addKarma } = useApp();
  const [moments, setMoments] = useState<RoamerMoment[]>(INITIAL_MOMENTS);
  const [selectedMomentIdx, setSelectedMomentIdx] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New Moment form state
  const [newCaption, setNewCaption] = useState('');
  const [newLocation, setNewLocation] = useState('Pushkar, Rajasthan');
  const [blurFace, setBlurFace] = useState(false);

  if (!isOpen) return null;

  const currentMoment = moments[selectedMomentIdx] || moments[0];

  const handleLike = (id: string) => {
    setMoments(prev => prev.map(m => m.id === id ? { ...m, likesCount: m.likesCount + 1 } : m));
    addKarma(5, 'Sent love to a roamer moment');
  };

  const handlePostMoment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const created: RoamerMoment = {
      id: `mom_${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      location: newLocation,
      photoUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      caption: newCaption.trim(),
      audioNoteDuration: '0:18',
      isFaceBlurred: blurFace,
      timeRemaining: '24h left',
      likesCount: 1
    };

    setMoments(prev => [created, ...prev]);
    setSelectedMomentIdx(0);
    setShowCreateForm(false);
    setNewCaption('');
    addKarma(15, 'Shared a 24-hour slow roamer moment');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-4xl max-w-lg w-full max-h-[92vh] overflow-hidden shadow-2xl border border-sand-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sukoon-800 via-terracotta to-sand-900 text-white p-4 relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold">Roamer Moments (24h)</h3>
              <p className="text-[10px] text-sand-200">Ephemeral memories from sanctuaries & trails</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Moment</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {showCreateForm ? (
            /* Creation Form */
            <form onSubmit={handlePostMoment} className="space-y-4 p-2 animate-fadeIn">
              <h4 className="font-serif font-bold text-sm text-sand-900">
                Share a 24-Hour Roamer Moment
              </h4>
              <p className="text-xs text-sand-600">
                Disappears automatically after 24 hours. Voice notes & optional face blurring supported.
              </p>

              <div>
                <label className="text-[11px] font-bold text-sand-700 block mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="w-full p-2.5 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-sand-700 block mb-1">Caption / Thought</label>
                <textarea
                  rows={3}
                  required
                  placeholder="What is the atmosphere right now? The sounds, the river, the tea..."
                  value={newCaption}
                  onChange={e => setNewCaption(e.target.value)}
                  className="w-full p-2.5 text-xs bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-sand-50 rounded-xl border border-sand-200">
                <input
                  type="checkbox"
                  id="blurCheck"
                  checked={blurFace}
                  onChange={e => setBlurFace(e.target.checked)}
                  className="rounded text-forest-600 focus:ring-forest-500"
                />
                <label htmlFor="blurCheck" className="text-xs text-sand-800 font-medium flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-sand-500" />
                  <span>Auto-Blur Faces for Privacy</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-2 rounded-full bg-sand-100 text-sand-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-full bg-sukoon-600 hover:bg-sukoon-700 text-white text-xs font-bold shadow-xs"
                >
                  Publish Moment (+15 Karma)
                </button>
              </div>
            </form>
          ) : (
            /* Story Viewer */
            <div className="space-y-4">
              
              {/* Stepper bar across top */}
              <div className="flex gap-1.5">
                {moments.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMomentIdx(idx)}
                    className={`h-1 rounded-full flex-1 transition-all ${
                      idx === selectedMomentIdx ? 'bg-sukoon-600' : 'bg-sand-200'
                    }`}
                  />
                ))}
              </div>

              {/* Story Photo Card */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-sand-200 shadow-md group">
                <img
                  src={currentMoment.photoUrl}
                  alt={currentMoment.caption}
                  className={`w-full h-full object-cover transition-all ${
                    currentMoment.isFaceBlurred ? 'filter blur-[1.5px]' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                {/* Top Author Bar */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={currentMoment.authorAvatar}
                      alt={currentMoment.authorName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60"
                    />
                    <div>
                      <h4 className="font-bold leading-tight">{currentMoment.authorName}</h4>
                      <p className="text-[10px] text-sand-200 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>{currentMoment.location}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-sand-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{currentMoment.timeRemaining}</span>
                  </span>
                </div>

                {/* Bottom Story Caption & Audio Note */}
                <div className="absolute bottom-4 inset-x-4 text-white space-y-3">
                  <p className="text-xs sm:text-sm font-medium leading-relaxed drop-shadow">
                    "{currentMoment.caption}"
                  </p>

                  {currentMoment.audioNoteDuration && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                      <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span>Ambient Audio ({currentMoment.audioNoteDuration})</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    {currentMoment.isFaceBlurred && (
                      <span className="text-[10px] font-bold text-sand-300 flex items-center gap-1">
                        <EyeOff className="w-3 h-3" />
                        <span>Face Blurred for Privacy</span>
                      </span>
                    )}

                    <button
                      onClick={() => handleLike(currentMoment.id)}
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs backdrop-blur-sm transition-transform active:scale-95"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-white" />
                      <span>{currentMoment.likesCount}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Navigation Thumbnails */}
              <div className="flex items-center justify-between text-xs text-sand-600 pt-1">
                <button
                  onClick={() => setSelectedMomentIdx(prev => (prev > 0 ? prev - 1 : moments.length - 1))}
                  className="font-semibold hover:text-sand-900"
                >
                  ← Previous Moment
                </button>
                <span>{selectedMomentIdx + 1} of {moments.length}</span>
                <button
                  onClick={() => setSelectedMomentIdx(prev => (prev + 1) % moments.length)}
                  className="font-semibold hover:text-sand-900"
                >
                  Next Moment →
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

