export type UserRole = 'traveller' | 'host' | 'local' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  nationality: string;
  isFemale: boolean;
  isVerified: boolean;
  verificationBadge: 'unverified' | 'email_phone' | 'gov_id_verified' | 'trusted_superhost';
  karmaPoints: number;
  languages: string[];
  skillsOffered: string[];
  skillsWanted: string[];
  travelStyle: 'slow' | 'spiritual' | 'budget' | 'nomad';
  joinedDate: string;
  safetyRating: number;
  reviewsCount: number;
  stamps: PassportStamp[];
  badges: string[];
  emergencyContacts?: EmergencyContact[];
}

export interface PassportStamp {
  id: string;
  placeName: string;
  state: string;
  category: 'ashram' | 'ghat' | 'farm' | 'homestay' | 'mountain';
  dateAwarded: string;
  icon: string;
  color: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface GigItem {
  id: string;
  title: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  isFemaleHost: boolean;
  hostVerified: boolean;
  location: string;
  state: string;
  region: 'rajasthan' | 'rishikesh' | 'himachal' | 'varanasi' | 'goa' | 'kerala';
  description: string;
  skillsNeeded: string[];
  perks: ('Free Private Room' | 'All Meals (Sattvic)' | 'Free Dorm' | 'Stipend / Cash' | 'Yoga Lessons' | 'WiFi & Chai')[];
  duration: string;
  hoursPerDay: number;
  visaWarning: string;
  isWomenOnly: boolean;
  sukoonLevel: number; // 1-5
  comfortLevel: number; // 1-5
  images: string[];
  applicantsCount: number;
  createdAt: string;
}

export interface StayItem {
  id: string;
  title: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  isFemaleHost: boolean;
  hostVerified: boolean;
  stayType: 'Ashram' | 'Homestay' | 'Farm Stay' | 'Hostel Bed' | 'Couch / Temple Hall';
  location: string;
  state: string;
  region: 'rajasthan' | 'rishikesh' | 'himachal' | 'varanasi' | 'goa' | 'kerala';
  pricePerNight: number; // 0 for work-exchange or cost-share
  priceType: 'Free (Work-Exchange)' | 'Cost-Sharing' | 'Donation' | 'Nominal Fee';
  womenOnly: boolean;
  safetyScore: number; // out of 100
  sukoonLevel: number; // 1-5
  comfortLevel: number; // 1-5
  amenities: string[];
  houseRules: string[];
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
}

export interface RideItem {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  vehicleType: 'Shared Taxi / Cab' | 'Train Companion (IRCTC)' | 'Motorbike Pillions' | 'Rental Car' | 'Local Bus Travel';
  hostName: string;
  hostAvatar: string;
  isFemaleDriver: boolean;
  isWomenOnly: boolean;
  totalSeats: number;
  availableSeats: number;
  costSplitPerPerson: number; // in INR
  notes: string;
  ticketNotice: string;
  stops: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  hostVerified: boolean;
  category: 'Spiritual / Yoga' | 'Local Cooking' | 'Language & Culture' | 'Music & Craft' | 'Storytelling & Walks';
  location: string;
  duration: string;
  pricing: 'Free / Gift' | 'Donation' | 'Skill Swap';
  swapsAccepted?: string;
  description: string;
  sukoonLevel: number;
  comfortLevel: number;
  images: string[];
  rating: number;
}

export interface PlaceItem {
  id: string;
  name: string;
  hindiName: string;
  region: 'rajasthan' | 'rishikesh' | 'himachal' | 'varanasi' | 'goa' | 'kerala';
  state: string;
  tagline: string;
  description: string;
  comfortLevel: number;
  sukoonLevel: number;
  bestTime: string;
  localFood: string[];
  safetyTips: string[];
  images: string[];
  lat: number;
  lng: number;
  phrases: PhraseItem[];
}

export interface PhraseItem {
  id: string;
  english: string;
  hindiDevanagari: string;
  transliteration: string;
  context: 'Greeting' | 'Emergency & Safety' | 'Travel & Bargain' | 'Food & Water' | 'Spiritual / Respect';
  audioText: string;
}

export interface QAQuestion {
  id: string;
  authorName: string;
  authorAvatar: string;
  isVerified: boolean;
  title: string;
  content: string;
  category: 'Visa & Regulations' | 'Women Solo Safety' | 'Routes & Sleeper Trains' | 'Spiritual Guidance' | 'Budget Survival';
  upvotes: number;
  answersCount: number;
  bestAnswerId?: string;
  createdAt: string;
  answers: QAAnswer[];
}

export interface QAAnswer {
  id: string;
  authorName: string;
  authorAvatar: string;
  isVerified: boolean;
  content: string;
  upvotes: number;
  isAccepted: boolean;
  createdAt: string;
}

export interface ChaiMeetup {
  id: string;
  hostName: string;
  hostAvatar: string;
  venueName: string;
  address: string;
  city: string;
  topic: string;
  timeWindow: string; // e.g. "Today 4:00 PM - 6:00 PM"
  attendeesCount: number;
  maxAttendees: number;
  isPublicVenueConfirmed: boolean;
  womenOnly: boolean;
}

export interface BarterItem {
  id: string;
  proposerName: string;
  proposerAvatar: string;
  location: string;
  teaching: string;
  seeking: string;
  notes: string;
  verified: boolean;
}
