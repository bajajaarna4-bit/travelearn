'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, GigItem, StayItem, RideItem, ExperienceItem, ChaiMeetup } from './types';
import { CURRENT_USER, SEED_GIGS, SEED_STAYS, SEED_RIDES, SEED_EXPERIENCES, SEED_CHAI_MEETUPS } from './seedData';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ApplicationRecord {
  id: string;
  gigId: string;
  gigTitle: string;
  hostName: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  message: string;
  appliedDate: string;
}

export interface BookingRecord {
  id: string;
  stayId: string;
  stayTitle: string;
  hostName: string;
  dates: string;
  status: 'Confirmed' | 'Pending Review' | 'Completed';
  priceType: string;
  bookedAt: string;
}

export interface RideJoinRecord {
  id: string;
  rideId: string;
  route: string;
  departure: string;
  seats: number;
  status: 'Confirmed';
}

interface AppContextType {
  user: UserProfile;
  gigs: GigItem[];
  stays: StayItem[];
  rides: RideItem[];
  experiences: ExperienceItem[];
  chaiMeetups: ChaiMeetup[];
  
  // Safety & Mode Toggles
  isWomenSafetyMode: boolean;
  toggleWomenSafetyMode: () => void;
  isSilenceMode: boolean;
  toggleSilenceMode: () => void;
  isSOSActive: boolean;
  triggerSOS: () => void;
  cancelSOS: () => void;
  
  // Check-in timer
  checkInMinutesLeft: number | null;
  startCheckInTimer: (minutes: number) => void;
  confirmCheckInSafe: () => void;
  
  // Fake Call
  isFakeCallActive: boolean;
  triggerFakeCall: () => void;
  dismissFakeCall: () => void;

  // Actions
  applications: ApplicationRecord[];
  applyToGig: (gigId: string, message: string) => void;
  bookings: BookingRecord[];
  bookStay: (stayId: string, dates: string) => void;
  rideJoins: RideJoinRecord[];
  joinRide: (rideId: string, seats: number) => void;
  rsvpChai: (meetupId: string) => void;
  
  // Chat
  activeChatRecipient: { id: string; name: string; avatar: string } | null;
  openChatWith: (recipient: { id: string; name: string; avatar: string }) => void;
  closeChat: () => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;

  // Listing creation
  addGig: (gig: Partial<GigItem>) => void;
  addStay: (stay: Partial<StayItem>) => void;
  addRide: (ride: Partial<RideItem>) => void;
  
  // Karma & Stamps
  addKarma: (points: number, reason: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);
  const [gigs, setGigs] = useState<GigItem[]>(SEED_GIGS);
  const [stays, setStays] = useState<StayItem[]>(SEED_STAYS);
  const [rides, setRides] = useState<RideItem[]>(SEED_RIDES);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(SEED_EXPERIENCES);
  const [chaiMeetups, setChaiMeetups] = useState<ChaiMeetup[]>(SEED_CHAI_MEETUPS);

  const [isWomenSafetyMode, setIsWomenSafetyMode] = useState<boolean>(false);
  const [isSilenceMode, setIsSilenceMode] = useState<boolean>(false);
  const [isSOSActive, setIsSOSActive] = useState<boolean>(false);
  const [isFakeCallActive, setIsFakeCallActive] = useState<boolean>(false);
  const [checkInMinutesLeft, setCheckInMinutesLeft] = useState<number | null>(null);

  const [applications, setApplications] = useState<ApplicationRecord[]>([
    {
      id: 'app_seed_1',
      gigId: 'gig_1',
      gigTitle: 'Hostel Garden & Social Media Host in Pushkar',
      hostName: 'Devika Rathore',
      status: 'Accepted',
      message: 'Hello Devika! I love Pushkar and have 3 years experience creating organic reels and caring for terrace plants.',
      appliedDate: 'Yesterday'
    }
  ]);

  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'bk_seed_1',
      stayId: 'stay_1',
      stayTitle: 'Savitri Hills Peace Hermitage (Women-Only Floor)',
      hostName: 'Devika Rathore',
      dates: '15 Nov - 29 Nov 2024',
      status: 'Confirmed',
      priceType: 'Free (Work-Exchange)',
      bookedAt: '3 days ago'
    }
  ]);

  const [rideJoins, setRideJoins] = useState<RideJoinRecord[]>([]);

  const [activeChatRecipient, setActiveChatRecipient] = useState<{ id: string; name: string; avatar: string } | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: 'host_raj_01',
      senderName: 'Devika Rathore',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      recipientId: 'usr_me_01',
      text: 'Namaste Maya! We saw your application and loved your portfolio illustrations. We have confirmed your attic room for next week!',
      timestamp: 'Yesterday 4:15 PM',
      isRead: true
    }
  ]);

  // Check-in timer ticker
  useEffect(() => {
    if (checkInMinutesLeft === null || checkInMinutesLeft <= 0) return;
    const interval = setInterval(() => {
      setCheckInMinutesLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, [checkInMinutesLeft]);

  const toggleWomenSafetyMode = () => setIsWomenSafetyMode(prev => !prev);
  const toggleSilenceMode = () => setIsSilenceMode(prev => !prev);

  const triggerSOS = () => setIsSOSActive(true);
  const cancelSOS = () => setIsSOSActive(false);

  const triggerFakeCall = () => setIsFakeCallActive(true);
  const dismissFakeCall = () => setIsFakeCallActive(false);

  const startCheckInTimer = (minutes: number) => {
    setCheckInMinutesLeft(minutes);
  };

  const confirmCheckInSafe = () => {
    setCheckInMinutesLeft(null);
    addKarma(25, 'Safety check-in verified on time');
  };

  const applyToGig = (gigId: string, message: string) => {
    const gig = gigs.find(g => g.id === gigId);
    if (!gig) return;
    const newRecord: ApplicationRecord = {
      id: `app_${Date.now()}`,
      gigId,
      gigTitle: gig.title,
      hostName: gig.hostName,
      status: 'Pending',
      message,
      appliedDate: 'Just now'
    };
    setApplications(prev => [newRecord, ...prev]);
    addKarma(10, 'Applied for voluntary work-exchange');
  };

  const bookStay = (stayId: string, dates: string) => {
    const stay = stays.find(s => s.id === stayId);
    if (!stay) return;
    const newBooking: BookingRecord = {
      id: `bk_${Date.now()}`,
      stayId,
      stayTitle: stay.title,
      hostName: stay.hostName,
      dates,
      status: 'Confirmed',
      priceType: stay.priceType,
      bookedAt: 'Just now'
    };
    setBookings(prev => [newBooking, ...prev]);
    addKarma(15, 'Booked sukoon stay');
  };

  const joinRide = (rideId: string, seats: number) => {
    const ride = rides.find(r => r.id === rideId);
    if (!ride) return;
    const newRecord: RideJoinRecord = {
      id: `rj_${Date.now()}`,
      rideId,
      route: `${ride.origin} → ${ride.destination}`,
      departure: `${ride.departureDate} at ${ride.departureTime}`,
      seats,
      status: 'Confirmed'
    };
    setRideJoins(prev => [newRecord, ...prev]);
    setRides(prev => prev.map(r => r.id === rideId ? { ...r, availableSeats: Math.max(0, r.availableSeats - seats) } : r));
    addKarma(20, 'Shared a journey & reduced travel footprint');
  };

  const rsvpChai = (meetupId: string) => {
    setChaiMeetups(prev => prev.map(m => m.id === meetupId ? { ...m, attendeesCount: m.attendeesCount + 1 } : m));
    addKarma(15, 'Joined community Chai Table');
  };

  const openChatWith = (recipient: { id: string; name: string; avatar: string }) => {
    setActiveChatRecipient(recipient);
  };

  const closeChat = () => {
    setActiveChatRecipient(null);
  };

  const sendMessage = (text: string) => {
    if (!activeChatRecipient || !text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      recipientId: activeChatRecipient.id,
      text: text.trim(),
      timestamp: 'Just now',
      isRead: true
    };
    setMessages(prev => [...prev, newMsg]);

    // Simulated friendly auto-reply
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        senderId: activeChatRecipient.id,
        senderName: activeChatRecipient.name,
        senderAvatar: activeChatRecipient.avatar,
        recipientId: user.id,
        text: `Radhe Radhe / Namaste! Received your note. Looking forward to welcoming you with fresh warm chai!`,
        timestamp: 'Just now',
        isRead: true
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const addGig = (newGig: Partial<GigItem>) => {
    const gig: GigItem = {
      id: `gig_${Date.now()}`,
      title: newGig.title || 'Untitled Gig',
      hostId: user.id,
      hostName: user.name,
      hostAvatar: user.avatar,
      isFemaleHost: user.isFemale,
      hostVerified: user.isVerified,
      location: newGig.location || 'Pushkar, Rajasthan',
      state: newGig.state || 'Rajasthan',
      region: newGig.region || 'rajasthan',
      description: newGig.description || '',
      skillsNeeded: newGig.skillsNeeded || ['Enthusiasm'],
      perks: newGig.perks || ['Free Private Room', 'All Meals (Sattvic)', 'WiFi & Chai'],
      duration: newGig.duration || '2 weeks',
      hoursPerDay: newGig.hoursPerDay || 4,
      visaWarning: 'Tourist Visa Notice: Unpaid voluntary cultural exchange only.',
      isWomenOnly: !!newGig.isWomenOnly,
      sukoonLevel: newGig.sukoonLevel || 5,
      comfortLevel: newGig.comfortLevel || 4,
      images: newGig.images?.length ? newGig.images : ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'],
      applicantsCount: 0,
      createdAt: 'Just now'
    };
    setGigs(prev => [gig, ...prev]);
    addKarma(30, 'Posted a community work-exchange host listing');
  };

  const addStay = (newStay: Partial<StayItem>) => {
    const stay: StayItem = {
      id: `stay_${Date.now()}`,
      title: newStay.title || 'Peaceful Ashram Room',
      hostId: user.id,
      hostName: user.name,
      hostAvatar: user.avatar,
      isFemaleHost: user.isFemale,
      hostVerified: user.isVerified,
      stayType: newStay.stayType || 'Homestay',
      location: newStay.location || 'Tapovan, Rishikesh',
      state: newStay.state || 'Uttarakhand',
      region: newStay.region || 'rishikesh',
      pricePerNight: newStay.pricePerNight ?? 0,
      priceType: newStay.priceType || 'Free (Work-Exchange)',
      womenOnly: !!newStay.womenOnly,
      safetyScore: 96,
      sukoonLevel: newStay.sukoonLevel || 5,
      comfortLevel: newStay.comfortLevel || 3,
      amenities: newStay.amenities || ['Clean Bedding', 'Filtered Water', 'Safe Lock'],
      houseRules: newStay.houseRules || ['No loud noise', 'Vegetarian food'],
      description: newStay.description || '',
      images: newStay.images?.length ? newStay.images : ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'],
      rating: 5.0,
      reviewCount: 1,
      lat: 26.4897,
      lng: 74.5511
    };
    setStays(prev => [stay, ...prev]);
    addKarma(30, 'Offered a safe sanctuary stay for roamers');
  };

  const addRide = (newRide: Partial<RideItem>) => {
    const ride: RideItem = {
      id: `ride_${Date.now()}`,
      origin: newRide.origin || 'Jaipur',
      destination: newRide.destination || 'Pushkar',
      departureDate: newRide.departureDate || 'Tomorrow',
      departureTime: newRide.departureTime || '9:00 AM',
      vehicleType: newRide.vehicleType || 'Shared Taxi / Cab',
      hostName: user.name,
      hostAvatar: user.avatar,
      isFemaleDriver: user.isFemale,
      isWomenOnly: !!newRide.isWomenOnly,
      totalSeats: newRide.totalSeats || 3,
      availableSeats: newRide.availableSeats || 2,
      costSplitPerPerson: newRide.costSplitPerPerson || 300,
      notes: newRide.notes || 'Travel together and split costs safely.',
      ticketNotice: 'Legal Reminder: Carpool cost-sharing of actual vehicle fuel/fare.',
      stops: newRide.stops || [newRide.origin || 'Jaipur', newRide.destination || 'Pushkar']
    };
    setRides(prev => [ride, ...prev]);
    addKarma(25, 'Organized a shared ride');
  };

  const addKarma = (points: number, reason: string) => {
    setUser(prev => ({
      ...prev,
      karmaPoints: prev.karmaPoints + points
    }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        gigs,
        stays,
        rides,
        experiences,
        chaiMeetups,
        isWomenSafetyMode,
        toggleWomenSafetyMode,
        isSilenceMode,
        toggleSilenceMode,
        isSOSActive,
        triggerSOS,
        cancelSOS,
        checkInMinutesLeft,
        startCheckInTimer,
        confirmCheckInSafe,
        isFakeCallActive,
        triggerFakeCall,
        dismissFakeCall,
        applications,
        applyToGig,
        bookings,
        bookStay,
        rideJoins,
        joinRide,
        rsvpChai,
        activeChatRecipient,
        openChatWith,
        closeChat,
        messages,
        sendMessage,
        addGig,
        addStay,
        addRide,
        addKarma
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
