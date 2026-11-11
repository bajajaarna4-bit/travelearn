'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Briefcase, Bed, Car, Sparkles, Check, 
  ArrowRight, ArrowLeft, Shield, AlertCircle
} from 'lucide-react';
import { useApp } from '@/lib/store';

type ListingType = 'gig' | 'stay' | 'ride' | 'experience';

function PostListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as ListingType) || 'gig';

  const { addGig, addStay, addRide } = useApp();

  const [listingType, setListingType] = useState<ListingType>(initialType);
  const [success, setSuccess] = useState(false);

  // Gig fields
  const [gigTitle, setGigTitle] = useState('');
  const [gigLocation, setGigLocation] = useState('Pushkar, Rajasthan');
  const [gigDescription, setGigDescription] = useState('');
  const [gigSkills, setGigSkills] = useState('Social Media, Garden Care');
  const [gigHours, setGigHours] = useState(4);
  const [gigDuration, setGigDuration] = useState('2 weeks');
  const [gigWomenOnly, setGigWomenOnly] = useState(false);

  // Stay fields
  const [stayTitle, setStayTitle] = useState('');
  const [stayLocation, setStayLocation] = useState('Tapovan, Rishikesh');
  const [stayType, setStayType] = useState<'Ashram' | 'Homestay' | 'Farm Stay'>('Homestay');
  const [stayPrice, setStayPrice] = useState(0);
  const [stayWomenOnly, setStayWomenOnly] = useState(false);
  const [stayAmenities, setStayAmenities] = useState('Filtered Water, Quiet Garden, Lockable Room');
  const [stayRules, setStayRules] = useState('Strictly Vegetarian, No Alcohol, Quiet after 9:30 PM');

  // Ride fields
  const [rideOrigin, setRideOrigin] = useState('Jaipur');
  const [rideDestination, setRideDestination] = useState('Pushkar');
  const [rideDate, setRideDate] = useState('Tomorrow');
  const [rideTime, setRideTime] = useState('9:00 AM');
  const [rideSeats, setRideSeats] = useState(2);
  const [rideCostSplit, setRideCostSplit] = useState(300);
  const [rideWomenOnly, setRideWomenOnly] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (listingType === 'gig') {
      addGig({
        title: gigTitle,
        location: gigLocation,
        description: gigDescription,
        skillsNeeded: gigSkills.split(',').map(s => s.trim()),
        hoursPerDay: Number(gigHours),
        duration: gigDuration,
        isWomenOnly: gigWomenOnly
      });
    } else if (listingType === 'stay') {
      addStay({
        title: stayTitle,
        location: stayLocation,
        stayType,
        pricePerNight: Number(stayPrice),
        priceType: Number(stayPrice) === 0 ? 'Free (Work-Exchange)' : 'Cost-Sharing',
        womenOnly: stayWomenOnly,
        amenities: stayAmenities.split(',').map(s => s.trim()),
        houseRules: stayRules.split(',').map(s => s.trim())
      });
    } else if (listingType === 'ride') {
      addRide({
        origin: rideOrigin,
        destination: rideDestination,
        departureDate: rideDate,
        departureTime: rideTime,
        availableSeats: Number(rideSeats),
        totalSeats: Number(rideSeats) + 1,
        costSplitPerPerson: Number(rideCostSplit),
        isWomenOnly: rideWomenOnly
      });
    }

    setSuccess(true);
    setTimeout(() => {
      if (listingType === 'gig') router.push('/gigs');
      else if (listingType === 'stay') router.push('/stays');
      else router.push('/rides');
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-sukoon-600">
          Listing Wizard
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900">
          Offer a Stay, Work Gig, or Shared Journey
        </h1>
        <p className="text-xs sm:text-sm text-sand-600">
          Open your doors or travel companion seat to verified, conscious slow roamers.
        </p>
      </div>

      {/* Type Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-sand-100 p-1.5 rounded-3xl border border-sand-200">
        <button
          type="button"
          onClick={() => setListingType('gig')}
          className={`py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            listingType === 'gig'
              ? 'bg-white text-sukoon-700 shadow-xs'
              : 'text-sand-600 hover:text-sand-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Work-Exchange Gig</span>
        </button>

        <button
          type="button"
          onClick={() => setListingType('stay')}
          className={`py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            listingType === 'stay'
              ? 'bg-white text-forest-700 shadow-xs'
              : 'text-sand-600 hover:text-sand-900'
          }`}
        >
          <Bed className="w-4 h-4" />
          <span>Sanctuary Stay</span>
        </button>

        <button
          type="button"
          onClick={() => setListingType('ride')}
          className={`py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            listingType === 'ride'
              ? 'bg-white text-terracotta shadow-xs'
              : 'text-sand-600 hover:text-sand-900'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Shared Ride</span>
        </button>
      </div>

      {/* Wizard Form */}
      <div className="bg-white rounded-4xl p-6 sm:p-10 border border-sand-200 shadow-sm space-y-6">
        {success ? (
          <div className="text-center py-12 space-y-3 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-sand-900">Listing Published!</h3>
            <p className="text-xs text-sand-600">
              Your listing is live on the roamer map and feeds. Redirecting to module...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {listingType === 'gig' && (
              <>
                <div>
                  <label className="text-xs font-bold text-sand-700 block mb-1">
                    Gig Title (What help do you need?)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Haveli Courtyard Gardener & Evening Guest Host"
                    value={gigTitle}
                    onChange={e => setGigTitle(e.target.value)}
                    className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none focus:ring-1 focus:ring-sukoon-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={gigLocation}
                      onChange={e => setGigLocation(e.target.value)}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Daily Help Needed (Hours)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      required
                      value={gigHours}
                      onChange={e => setGigHours(Number(e.target.value))}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 block mb-1">Skills Needed (Comma separated)</label>
                  <input
                    type="text"
                    required
                    value={gigSkills}
                    onChange={e => setGigSkills(e.target.value)}
                    className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 block mb-1">Description & Routine</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your space, the daily atmosphere, food offered, and room type..."
                    value={gigDescription}
                    onChange={e => setGigDescription(e.target.value)}
                    className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-sand-50 rounded-2xl">
                  <input
                    type="checkbox"
                    id="gigWomen"
                    checked={gigWomenOnly}
                    onChange={e => setGigWomenOnly(e.target.checked)}
                    className="rounded text-forest-600 focus:ring-forest-500"
                  />
                  <label htmlFor="gigWomen" className="text-xs font-semibold text-sand-800">
                    Female Solo Roamers Only (Women Safety Sanctuary)
                  </label>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Tourist Visa Agreement:</strong> I confirm this listing is an unpaid volunteer cultural exchange providing hospitality (free room & food), without cash salary.
                  </span>
                </div>
              </>
            )}

            {listingType === 'stay' && (
              <>
                <div>
                  <label className="text-xs font-bold text-sand-700 block mb-1">Sanctuary Stay Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quiet Riverfront Rooftop Room overlooking Ganga"
                    value={stayTitle}
                    onChange={e => setStayTitle(e.target.value)}
                    className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Sanctuary Type</label>
                    <select
                      value={stayType}
                      onChange={e => setStayType(e.target.value as any)}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    >
                      <option value="Homestay">Vetted Homestay</option>
                      <option value="Ashram">Ashram Living</option>
                      <option value="Farm Stay">Organic Farm</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Price per Night (₹0 for Free Work-Ex)</label>
                    <input
                      type="number"
                      min={0}
                      value={stayPrice}
                      onChange={e => setStayPrice(Number(e.target.value))}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 block mb-1">Amenities (Comma separated)</label>
                  <input
                    type="text"
                    value={stayAmenities}
                    onChange={e => setStayAmenities(e.target.value)}
                    className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-sand-700 block mb-1">Ashram & House Rules</label>
                  <input
                    type="text"
                    value={stayRules}
                    onChange={e => setStayRules(e.target.value)}
                    className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-sand-50 rounded-2xl">
                  <input
                    type="checkbox"
                    id="stayWomen"
                    checked={stayWomenOnly}
                    onChange={e => setStayWomenOnly(e.target.checked)}
                    className="rounded text-forest-600 focus:ring-forest-500"
                  />
                  <label htmlFor="stayWomen" className="text-xs font-semibold text-sand-800">
                    Women-Only Floor / Sanctuary
                  </label>
                </div>
              </>
            )}

            {listingType === 'ride' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Origin City / Station</label>
                    <input
                      type="text"
                      required
                      value={rideOrigin}
                      onChange={e => setRideOrigin(e.target.value)}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Destination</label>
                    <input
                      type="text"
                      required
                      value={rideDestination}
                      onChange={e => setRideDestination(e.target.value)}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Departure Date</label>
                    <input
                      type="text"
                      value={rideDate}
                      onChange={e => setRideDate(e.target.value)}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Available Seats</label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={rideSeats}
                      onChange={e => setRideSeats(Number(e.target.value))}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-sand-700 block mb-1">Cost Split (₹ per seat)</label>
                    <input
                      type="number"
                      min={0}
                      value={rideCostSplit}
                      onChange={e => setRideCostSplit(Number(e.target.value))}
                      className="w-full p-3 text-xs bg-sand-50 rounded-2xl border border-sand-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-sand-50 rounded-2xl">
                  <input
                    type="checkbox"
                    id="rideWomen"
                    checked={rideWomenOnly}
                    onChange={e => setRideWomenOnly(e.target.checked)}
                    className="rounded text-forest-600 focus:ring-forest-500"
                  />
                  <label htmlFor="rideWomen" className="text-xs font-semibold text-sand-800">
                    Women-Only Carpool (Female Driver & Passengers)
                  </label>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>IRCTC Ticket Law:</strong> I confirm this is a shared cab/carpool cost split, NOT a train or airline ticket resale.
                  </span>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-sukoon-600 to-terracotta text-white font-bold text-xs shadow-md hover:scale-[1.01] transition-transform"
            >
              Publish Listing to Roamer Grid (+30 Karma)
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-sand-500">Loading Wizard...</div>}>
      <PostListingContent />
    </Suspense>
  );
}
