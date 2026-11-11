import { GigItem, StayItem, RideItem, ExperienceItem, PlaceItem, QAQuestion, ChaiMeetup, BarterItem, UserProfile } from './types';

export const CURRENT_USER: UserProfile = {
  id: 'usr_me_01',
  name: 'Maya Sharma',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Slow backpacker, yoga practitioner & freelance illustrator. Passionate about ashram stays, female solo travel security, and learning Indian miniature art.',
  location: 'Pushkar, Rajasthan',
  nationality: 'Indian / Roamer',
  isFemale: true,
  isVerified: true,
  verificationBadge: 'gov_id_verified',
  karmaPoints: 480,
  languages: ['English', 'Hindi', 'Basic French'],
  skillsOffered: ['Digital Illustration', 'Hatha Yoga Teaching', 'English Writing'],
  skillsWanted: ['Clay Pottery', 'Woodblock Printing', 'Conversational Pahari'],
  travelStyle: 'spiritual',
  joinedDate: 'October 2024',
  safetyRating: 4.9,
  reviewsCount: 18,
  badges: ['Verified ID', 'Chai Host', 'Ghat Guardian', 'First Gig Done', 'Night Train Veteran'],
  stamps: [
    {
      id: 'st_1',
      placeName: 'Pushkar Ghats',
      state: 'Rajasthan',
      category: 'ghat',
      dateAwarded: 'Nov 2024',
      icon: '🕉️',
      color: '#E26D5C'
    },
    {
      id: 'st_2',
      placeName: 'Parmarth Niketan',
      state: 'Rishikesh',
      category: 'ashram',
      dateAwarded: 'Dec 2024',
      icon: '🌊',
      color: '#3E6B7A'
    },
    {
      id: 'st_3',
      placeName: 'Tosh Village Haven',
      state: 'Himachal',
      category: 'mountain',
      dateAwarded: 'Jan 2025',
      icon: '🏔️',
      color: '#2A7B62'
    },
    {
      id: 'st_4',
      placeName: 'Assi Ghat Sunrise',
      state: 'Varanasi',
      category: 'ghat',
      dateAwarded: 'Feb 2025',
      icon: '🪔',
      color: '#D35400'
    }
  ],
  emergencyContacts: [
    {
      id: 'em_1',
      name: 'Sunita Sharma (Mother)',
      relationship: 'Parent',
      phone: '+91 98200 12345'
    },
    {
      id: 'em_2',
      name: 'Ananya Sen (Travel Sister)',
      relationship: 'Friend & Roamer',
      phone: '+91 98111 67890'
    }
  ]
};

export const SEED_GIGS: GigItem[] = [
  {
    id: 'gig_1',
    title: 'Hostel Garden & Social Media Host in Pushkar',
    hostId: 'host_raj_01',
    hostName: 'Devika Rathore',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: true,
    hostVerified: true,
    location: 'Near Brahma Temple, Pushkar',
    state: 'Rajasthan',
    region: 'rajasthan',
    description: 'We run a boutique heritage haveli hostel catering to respectful slow travellers. We need help 4 hours a day watering our courtyard garden, greeting guests in the evening, and taking Instagram reels of local temple walks.',
    skillsNeeded: ['Content Creation', 'Warm English / Hindi', 'Gardening Care'],
    perks: ['Free Private Room', 'All Meals (Sattvic)', 'WiFi & Chai'],
    duration: '2 to 4 weeks',
    hoursPerDay: 4,
    visaWarning: 'Tourist Visa Notice: This is a volunteer cultural exchange arrangement (free boarding & food). No financial wages are disbursed per Indian Visa Regulations.',
    isWomenOnly: true,
    sukoonLevel: 5,
    comfortLevel: 4,
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    ],
    applicantsCount: 7,
    createdAt: '2 days ago'
  },
  {
    id: 'gig_2',
    title: 'Permaculture Farm & Chai Hand in Kasol Valley',
    hostId: 'host_him_02',
    hostName: 'Tenzin & Meera',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: false,
    hostVerified: true,
    location: 'Challal Trail, Kasol',
    state: 'Himachal Pradesh',
    region: 'himachal',
    description: 'Looking for a conscious backpacker to help maintain our medicinal herb terrace, chop pine firewood, and bake sourdough bread. In exchange, get your own wooden attic overlooking the Parvati River.',
    skillsNeeded: ['Farming / Physical stamina', 'Woodwork basics', 'Positive attitude'],
    perks: ['Free Private Room', 'All Meals (Sattvic)', 'WiFi & Chai'],
    duration: '3 weeks minimum',
    hoursPerDay: 3,
    visaWarning: 'Volunteer cost-sharing & barter only. Compliant with Foreigners Regional Registration Office (FRRO) norms for voluntary cultural immersion.',
    isWomenOnly: false,
    sukoonLevel: 5,
    comfortLevel: 3,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    applicantsCount: 12,
    createdAt: '5 days ago'
  },
  {
    id: 'gig_3',
    title: 'English & Sanskrit Manuscript Transcription in Varanasi',
    hostId: 'host_var_03',
    hostName: 'Acharya Vidyadhar',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: false,
    hostVerified: true,
    location: 'Kedar Ghat, Varanasi',
    state: 'Uttar Pradesh',
    region: 'varanasi',
    description: 'Our traditional Vedic library preserves rare philosophy texts. Help us scan, proofread English notes, and archive digital copies. Very peaceful ghat atmosphere with morning meditation included.',
    skillsNeeded: ['Typing & Proofreading', 'Patience', 'Quiet demeanour'],
    perks: ['Free Dorm', 'All Meals (Sattvic)', 'Yoga Lessons'],
    duration: '2 to 6 weeks',
    hoursPerDay: 3,
    visaWarning: 'Cultural preservation volunteer exchange. Strictly non-commercial and educational.',
    isWomenOnly: false,
    sukoonLevel: 5,
    comfortLevel: 2,
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80'
    ],
    applicantsCount: 4,
    createdAt: '1 day ago'
  },
  {
    id: 'gig_4',
    title: 'Cafe Mural & Eco Signage Painter in Fort Kochi',
    hostId: 'host_ker_04',
    hostName: 'Anjali Kurian',
    hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: true,
    hostVerified: true,
    location: 'Princess Street, Fort Kochi',
    state: 'Kerala',
    region: 'kerala',
    description: 'We are revamping our sustainable bamboo cafe. Seeking an artist or creative traveller to paint botanical wall murals and hand-letter wooden menu boards. Female travellers warmly welcomed!',
    skillsNeeded: ['Mural Painting', 'Hand Lettering', 'Creative Eye'],
    perks: ['Free Private Room', 'All Meals (Sattvic)', 'Stipend / Cash'],
    duration: '10 to 14 days',
    hoursPerDay: 4,
    visaWarning: 'Indian Nationals / OCI / Employment visa holders can receive art expense compensation; foreign tourists receive room, board, and spice culinary workshops.',
    isWomenOnly: true,
    sukoonLevel: 4,
    comfortLevel: 4,
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    ],
    applicantsCount: 9,
    createdAt: '3 days ago'
  }
];

export const SEED_STAYS: StayItem[] = [
  {
    id: 'stay_1',
    title: 'Savitri Hills Peace Hermitage (Women-Only Floor)',
    hostId: 'host_raj_01',
    hostName: 'Devika Rathore',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: true,
    hostVerified: true,
    stayType: 'Homestay',
    location: 'Pushkar, Rajasthan',
    state: 'Rajasthan',
    region: 'rajasthan',
    pricePerNight: 0,
    priceType: 'Free (Work-Exchange)',
    womenOnly: true,
    safetyScore: 98,
    sukoonLevel: 5,
    comfortLevel: 4,
    amenities: ['CCTV Security at Gate', 'Filtered Drinking Water', 'Rooftop Yoga Mat', 'Separate Lockable Wing', 'Ayurvedic Tea'],
    houseRules: ['Strictly Vegetarian Premises', 'No Alcohol / Substances', 'Quiet Hours from 9:30 PM', 'Female guests only'],
    description: 'A quiet, secure traditional haveli with lime-plastered walls and views of the sacred Pushkar desert hills. Run by an all-female family team. Ideal for female solo roamers writing, practicing yoga, or resting.',
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.96,
    reviewCount: 34,
    lat: 26.4897,
    lng: 74.5511
  },
  {
    id: 'stay_2',
    title: 'Ganga Bank Vedic Ashram Dorm & Meditation Hall',
    hostId: 'host_rish_05',
    hostName: 'Swami Niranjan Sewa Trust',
    hostAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: false,
    hostVerified: true,
    stayType: 'Ashram',
    location: 'Tapovan, Rishikesh',
    state: 'Uttarakhand',
    region: 'rishikesh',
    pricePerNight: 350,
    priceType: 'Donation',
    womenOnly: false,
    safetyScore: 92,
    sukoonLevel: 5,
    comfortLevel: 3,
    amenities: ['Daily 6 AM Yoga', 'Kirtan Hall', '3 Vegetarian Meals', 'Cold/Warm Well Water', 'Silent Reading Garden'],
    houseRules: ['Attend Morning Chanting', 'Lights Out at 10 PM', 'Clean your own metal thali', 'Modest attire required'],
    description: 'A genuine spiritual sanctuary just 50 steps from the pristine waters of Mother Ganga. Sleep on simple clean cotton bedding, wake to temple conches, and detox from digital noise.',
    images: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.88,
    reviewCount: 62,
    lat: 30.1314,
    lng: 78.3248
  },
  {
    id: 'stay_3',
    title: 'Traditional Kasol Apple Orchard Stone Cottage',
    hostId: 'host_him_06',
    hostName: 'Pema Dolma',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: true,
    hostVerified: true,
    stayType: 'Farm Stay',
    location: 'Tosh Trail, Parvati Valley',
    state: 'Himachal Pradesh',
    region: 'himachal',
    pricePerNight: 400,
    priceType: 'Cost-Sharing',
    womenOnly: true,
    safetyScore: 95,
    sukoonLevel: 5,
    comfortLevel: 3,
    amenities: ['Wood-burning Tandoor Stove', 'Local Mountain Spring Water', 'Heated Blankets', 'Home-cooked Rajma Chawal'],
    houseRules: ['Remove Shoes at Entrance', 'Conserve Firewood', 'Respect local deity boundaries (Devta rules)'],
    description: 'Rest among 60-year-old apple trees looking at snowy peaks. Run by Pema, who grew up in Spiti. Safe sanctuary for solo female trekkers wanting quiet writing time and starry skies.',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.94,
    reviewCount: 28,
    lat: 32.0152,
    lng: 77.3182
  },
  {
    id: 'stay_4',
    title: 'Ancient Ghat Roof Room overlooking Ganga',
    hostId: 'host_var_07',
    hostName: 'Sunil Mishra',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isFemaleHost: false,
    hostVerified: true,
    stayType: 'Homestay',
    location: 'Munshi Ghat, Varanasi',
    state: 'Uttar Pradesh',
    region: 'varanasi',
    pricePerNight: 0,
    priceType: 'Free (Work-Exchange)',
    womenOnly: false,
    safetyScore: 90,
    sukoonLevel: 5,
    comfortLevel: 2,
    amenities: ['Direct Ghat View', 'Terrace for Sitar / Flute', 'Mosquito Nets', 'Hot Water Bucket'],
    houseRules: ['No commercial parties', 'Help with terrace flower pots', 'Respect local priest traditions'],
    description: 'Uncomfortable by 5-star standards, but 100/100 on Sukoon. Wake up to wooden rowing boats and holy morning chants. Help us tidy up the book nook 2 hours a day and stay for free.',
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.82,
    reviewCount: 41,
    lat: 25.3036,
    lng: 83.0076
  }
];

export const SEED_RIDES: RideItem[] = [
  {
    id: 'ride_1',
    origin: 'Jaipur Railway Station',
    destination: 'Pushkar Lake (via Ajmer)',
    departureDate: 'Tomorrow',
    departureTime: '8:30 AM',
    vehicleType: 'Shared Taxi / Cab',
    hostName: 'Priya Meena',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isFemaleDriver: true,
    isWomenOnly: true,
    totalSeats: 4,
    availableSeats: 2,
    costSplitPerPerson: 350,
    notes: 'Booking a verified female-chauffeured AC cab from Jaipur to Pushkar. Splitting the fare equally. Bags go on the roof rack. Women only!',
    ticketNotice: 'Legal Reminder: This is carpool cost-sharing of the actual cab invoice. No profit is made.',
    stops: ['Jaipur Station', 'Kishangarh Toll Plaza', 'Ajmer Dargah Crossing', 'Pushkar Bus Stand']
  },
  {
    id: 'ride_2',
    origin: 'Delhi Kashmiri Gate ISBT',
    destination: 'Rishikesh Tapovan',
    departureDate: 'This Friday',
    departureTime: '6:00 AM',
    vehicleType: 'Train Companion (IRCTC)',
    hostName: 'Kavita & Aarav',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    isFemaleDriver: true,
    isWomenOnly: false,
    totalSeats: 3,
    availableSeats: 2,
    costSplitPerPerson: 0,
    notes: 'Travelling on the Dehradun Jan Shatabdi. Looking for fellow solo roamers on the same train to travel together, share chai, watch luggage during washroom breaks, and split an auto from Haridwar to Rishikesh.',
    ticketNotice: 'IMPORTANT: Train tickets are non-transferable per Indian Railways IRCTC Act. You must hold your own booked ticket in your own name.',
    stops: ['New Delhi Station', 'Meerut', 'Haridwar Junction', 'Rishikesh Tapovan']
  },
  {
    id: 'ride_3',
    origin: 'Chandigarh ISBT Sector 43',
    destination: 'Kasol (Bhuntar Chowk)',
    departureDate: 'Saturday',
    departureTime: '9:00 PM (Overnight)',
    vehicleType: 'Shared Taxi / Cab',
    hostName: 'Suman Preet',
    hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    isFemaleDriver: true,
    isWomenOnly: true,
    totalSeats: 3,
    availableSeats: 1,
    costSplitPerPerson: 750,
    notes: 'Shared Innova taxi booked with a verified local family driver. Very safe night drive through Mandi and Aut Tunnel. Women only.',
    ticketNotice: 'Cost sharing between verified travellers only. In-app emergency live tracking enabled.',
    stops: ['Chandigarh', 'Bilaspur', 'Mandi', 'Bhuntar Airport', 'Kasol']
  }
];

export const SEED_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp_1',
    title: 'Pushkar Desert Twilight Meditation & Chanting Circle',
    hostName: 'Devika Rathore',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    hostVerified: true,
    category: 'Spiritual / Yoga',
    location: 'Savitri Hill Base, Pushkar',
    duration: '2 hours',
    pricing: 'Donation',
    description: 'We sit in a quiet circle on the dunes as the sun sets over the holy lake. Practice traditional Gayatri mantra chanting, breathwork, and silent grounding.',
    sukoonLevel: 5,
    comfortLevel: 3,
    images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'],
    rating: 5.0
  },
  {
    id: 'exp_2',
    title: 'Rajasthani Woodblock Hand-Printing & Natural Dye Workshop',
    hostName: 'Mohan Lal Chippa',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    hostVerified: true,
    category: 'Music & Craft',
    location: 'Sanganer Village, Jaipur',
    duration: '3 hours',
    pricing: 'Skill Swap',
    swapsAccepted: 'Willing to learn basic English conversation or smartphone photo editing in exchange!',
    description: '5th generation textile artisan will teach you hand-carving teak blocks and stamping indigo on organic khadi cotton scarf that you keep.',
    sukoonLevel: 4,
    comfortLevel: 4,
    images: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'],
    rating: 4.95
  },
  {
    id: 'exp_3',
    title: 'Dawn Rowing Boat & Kabir Poetry on Varanasi Ghats',
    hostName: 'Acharya Vidyadhar',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    hostVerified: true,
    category: 'Storytelling & Walks',
    location: 'Assi Ghat, Varanasi',
    duration: '2.5 hours',
    pricing: 'Free / Gift',
    description: 'A slow wooden boat ride across 84 ghats at dawn. Listen to Sant Kabir verses in Hindi with English philosophy context. No tourists noise, pure contemplative calm.',
    sukoonLevel: 5,
    comfortLevel: 2,
    images: ['https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'],
    rating: 4.92
  }
];

export const SEED_PLACES: PlaceItem[] = [
  {
    id: 'pl_pushkar',
    name: 'Pushkar Sacred Valley',
    hindiName: 'पुष्कर तीर्थ',
    region: 'rajasthan',
    state: 'Rajasthan',
    tagline: 'Rose scented breezes, 52 holy ghats, and camel bells in the dunes',
    description: 'One of India’s oldest sacred towns. Surrounded by hills on three sides and sand dunes on the fourth. Famous for Brahma Temple, peaceful evening arati, and safe havens for solo roamers.',
    comfortLevel: 3,
    sukoonLevel: 5,
    bestTime: 'October to March',
    localFood: ['Malpua with Rabdi', 'Gulkand Chai', 'Dal Baati Churma', 'Falafel roll at street stalls'],
    safetyTips: [
      'Politely refuse priests ("pandas") who press flowers into your hand demanding 1000s of rupees; a firm "Nahin chahiye" works.',
      'Wear slip-on shoes since footwear is prohibited across all 52 ghats.',
      'Pushkar is strictly vegetarian and alcohol-free inside the holy perimeter.'
    ],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 26.4897,
    lng: 74.5511,
    phrases: [
      {
        id: 'ph_1',
        english: 'Peace be with you / Greetings',
        hindiDevanagari: 'राम राम सा / नमस्ते',
        transliteration: 'Ram Ram Saa / Namaste',
        context: 'Greeting',
        audioText: 'Ram Ram Saa'
      },
      {
        id: 'ph_2',
        english: 'No thank you, please don’t bother me',
        hindiDevanagari: 'नहीं, धन्यवाद। मुझे ज़रूरत नहीं है।',
        transliteration: 'Nahin, dhanyavaad. Mujhe zaroorat nahin hai.',
        context: 'Emergency & Safety',
        audioText: 'Nahin, dhanyavaad. Mujhe zaroorat nahin hai.'
      },
      {
        id: 'ph_3',
        english: 'Where can I find pure drinking water?',
        hindiDevanagari: 'पीने का साफ़ पानी कहाँ मिलेगा?',
        transliteration: 'Peene ka saaf paani kahan milega?',
        context: 'Food & Water',
        audioText: 'Peene ka saaf paani kahan milega?'
      },
      {
        id: 'ph_4',
        english: 'Brother, how much for this ride?',
        hindiDevanagari: 'भैया, यहाँ तक का कितना किराया होगा?',
        transliteration: 'Bhaiya, yahan tak ka kitna kiraya hoga?',
        context: 'Travel & Bargain',
        audioText: 'Bhaiya, yahan tak ka kitna kiraya hoga?'
      }
    ]
  },
  {
    id: 'pl_rishikesh',
    name: 'Tapovan & Swargashram',
    hindiName: 'ऋषिकेश तपोवन',
    region: 'rishikesh',
    state: 'Uttarakhand',
    tagline: 'Where the emerald Ganga leaves the Himalayas for the plains',
    description: 'The world yoga capital. Towering green foothills, suspension bridges, chanting soundscapes, and riverside pebble beaches where travellers learn meditation.',
    comfortLevel: 4,
    sukoonLevel: 5,
    bestTime: 'September to April',
    localFood: ['Kodo millet porridge', 'Ayurvedic Thali', 'Ginger lemon honey tea', 'Almond chai'],
    safetyTips: [
      'Ganga current is deceptively swift; swim only in designated tranquil ghat steps holding iron chains.',
      'Beware of monkeys near Ram Jhula and Lakshman Jhula; keep sunglasses and snacks tucked inside bags.',
      'After 9 PM, shared rickshaws are rare; take verified walking routes.'
    ],
    images: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 30.1314,
    lng: 78.3248,
    phrases: [
      {
        id: 'ph_5',
        english: 'What time is the evening Ganga Arati?',
        hindiDevanagari: 'शाम की गंगा आरती किस समय होती है?',
        transliteration: 'Shaam ki Ganga Aarti kis samay hoti hai?',
        context: 'Spiritual / Respect',
        audioText: 'Shaam ki Ganga Aarti kis samay hoti hai?'
      },
      {
        id: 'ph_6',
        english: 'Please help, this is an emergency',
        hindiDevanagari: 'कृपया मदद कीजिए, यह आपातकाल है',
        transliteration: 'Kripya madad keejiye, yeh aapaatkaal hai',
        context: 'Emergency & Safety',
        audioText: 'Kripya madad keejiye, yeh aapaatkaal hai'
      }
    ]
  },
  {
    id: 'pl_kasol',
    name: 'Parvati Valley & Tosh',
    hindiName: 'पार्वती घाटी एवं तोश',
    region: 'himachal',
    state: 'Himachal Pradesh',
    tagline: 'Alpine wooden huts, glacial streams, and starry cedar forests',
    description: 'A paradise for hikers and seekers. Cobbled village trails, mountain wood smoke, hot springs in Manikaran, and slow community kitchens.',
    comfortLevel: 2,
    sukoonLevel: 5,
    bestTime: 'April to June & September to November',
    localFood: ['Siddu with ghee', 'Tosh rajma chawal', 'Fresh Himachal apple juice', 'Mountain thyme tea'],
    safetyTips: [
      'Never trek alone after sunset; mountain trails lack cellular coverage.',
      'Keep a thermal layer and rain poncho in your daypack; Himalayan weather turns fast.',
      'Respect village sanctum rules: tourists are not permitted to touch local Devta temple wood.'
    ],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 32.0152,
    lng: 77.3182,
    phrases: [
      {
        id: 'ph_7',
        english: 'Is this trail safe to walk right now?',
        hindiDevanagari: 'क्या यह रास्ता अभी चलने के लिए सुरक्षित है?',
        transliteration: 'Kya yeh raasta abhi chalne ke liye surakshit hai?',
        context: 'Travel & Bargain',
        audioText: 'Kya yeh raasta abhi chalne ke liye surakshit hai?'
      }
    ]
  },
  {
    id: 'pl_varanasi',
    name: 'Kashi Old Ghats & Alleyways',
    hindiName: 'काशी एवं अस्सी घाट',
    region: 'varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The timeless city of light, life, moksha, and eternity',
    description: '3,000 years of unbroken living human memory. Labyrinthine alleys where cows wander, classical sitar echoes from courtyards, and tranquil dawn boat rides on the Ganga.',
    comfortLevel: 2,
    sukoonLevel: 5,
    bestTime: 'November to February',
    localFood: ['Tamatar Chaat at Kashi Chaat Bhandar', 'Banarasi Paan', 'Kachori Jalebi breakfast', 'Blue Lassi'],
    safetyTips: [
      'Stick to well-lit main ghat pathways after 9:30 PM rather than deep interior gallis (lanes).',
      'Do not photograph cremations at Manikarnika or Harishchandra Ghat out of reverence for grieving families.',
      'Use the women-safety verified boats available at Assi and Dashashwamedh Ghat.'
    ],
    images: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80'
    ],
    lat: 25.3036,
    lng: 83.0076,
    phrases: [
      {
        id: 'ph_8',
        english: 'Greetings, Har Har Mahadev',
        hindiDevanagari: 'हर हर महादेव! प्रणाम',
        transliteration: 'Har Har Mahadev! Pranaam',
        context: 'Greeting',
        audioText: 'Har Har Mahadev! Pranaam'
      }
    ]
  }
];

export const SEED_QA: QAQuestion[] = [
  {
    id: 'qa_1',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    title: 'Is Pushkar safe for a solo woman backpacker during Camel Fair season?',
    content: 'I will be arriving by train in Ajmer at 8 PM and heading to Pushkar for a 2-week ashram stay. Any advice on transport from Ajmer station and night safety?',
    category: 'Women Solo Safety',
    upvotes: 42,
    answersCount: 3,
    bestAnswerId: 'ans_1_1',
    createdAt: '3 days ago',
    answers: [
      {
        id: 'ans_1_1',
        authorName: 'Devika Rathore',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        isVerified: true,
        content: 'Namaste Sarah! As a local host: avoid private unmetered cabs outside Ajmer station at night. Instead, use the government prepaid taxi booth inside the station premises or request a ride share on SukoonRoute. Once you cross the snake mountain pass into Pushkar, it is very peaceful. Stick to Brahma Temple road and avoid unlit sand trails after 10 PM. You can also message me anytime on the Safety Shield!',
        upvotes: 38,
        isAccepted: true,
        createdAt: '2 days ago'
      }
    ]
  },
  {
    id: 'qa_2',
    authorName: 'Luca Rossi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isVerified: false,
    title: 'Can foreign tourists on an e-Tourist Visa do hostel work-exchange legally in India?',
    content: 'I want to help with guest check-ins and gardening at an ashram in Rishikesh for 1 month in exchange for food and a room. Is this permitted under visa rules?',
    category: 'Visa & Regulations',
    upvotes: 67,
    answersCount: 2,
    bestAnswerId: 'ans_2_1',
    createdAt: '1 week ago',
    answers: [
      {
        id: 'ans_2_1',
        authorName: 'Advocate Rajesh V.',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        isVerified: true,
        content: 'Essential legal clarification: Indian e-Tourist and regular tourist visas strictly prohibit remunerated employment or commercial wages. However, voluntary unpaid cultural exchange, educational learning, and cost-sharing barter (where no salary or invoice is transacted) are common among cultural societies. Always ensure your host frames your stay as a voluntary guest immersion, not staff employment. Do not accept monetary bank transfers as compensation without an Employment (E) Visa.',
        upvotes: 59,
        isAccepted: true,
        createdAt: '6 days ago'
      }
    ]
  }
];

export const SEED_CHAI_MEETUPS: ChaiMeetup[] = [
  {
    id: 'chai_1',
    hostName: 'Maya Sharma',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    venueName: 'Savitri Temple Ghat Chai Stall (Public Bench)',
    address: 'Near Varaha Ghat, Pushkar',
    city: 'Pushkar',
    topic: 'Slow Travel, Sketchbooks & Women Hitchhiking Tips',
    timeWindow: 'Today 5:00 PM - 6:30 PM',
    attendeesCount: 4,
    maxAttendees: 6,
    isPublicVenueConfirmed: true,
    womenOnly: true
  },
  {
    id: 'chai_2',
    hostName: 'Arjun & Clara',
    hostAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    venueName: 'Little Buddha Cafe Terrace',
    address: 'Near Lakshman Jhula, Tapovan',
    city: 'Rishikesh',
    topic: 'Vipassana Retreat Experiences & Himalayas Itinerary Sharing',
    timeWindow: 'Tomorrow 4:30 PM - 6:00 PM',
    attendeesCount: 5,
    maxAttendees: 8,
    isPublicVenueConfirmed: true,
    womenOnly: false
  }
];

export const SEED_BARTERS: BarterItem[] = [
  {
    id: 'barter_1',
    proposerName: 'Elena Rostova',
    proposerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Rishikesh, Uttarakhand',
    teaching: 'Acoustic Guitar & French for Beginners',
    seeking: 'Conversational Hindi & Indian Classical Vocals',
    notes: 'Free every morning 8 to 10 AM by the river. 3 sessions exchange!',
    verified: true
  },
  {
    id: 'barter_2',
    proposerName: 'Vikram Joshi',
    proposerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'Jaipur, Rajasthan',
    teaching: 'Indian Miniature Painting & Natural Pigments',
    seeking: 'Travel Website Design / Portfolio Feedback',
    notes: 'Artisan studio in Old City Jaipur. Chai and materials provided.',
    verified: true
  }
];

export const EMERGENCY_NUMBERS = [
  { country: 'India', service: 'National All-in-One Emergency', number: '112' },
  { country: 'India', service: 'Women Police Helpline', number: '1091' },
  { country: 'India', service: 'National Commission for Women (NCW)', number: '7827170170' },
  { country: 'India', service: 'Tourist Infoline & Helpline (Multi-language)', number: '1363' },
  { country: 'India', service: 'Ambulance & Medical Emergency', number: '108 / 102' },
  { country: 'India', service: 'Railway Protection Force (RPF Security)', number: '139' },
  { country: 'India', service: 'Disaster Management Support', number: '1077' },
];
