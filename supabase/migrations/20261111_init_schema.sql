-- ========================================================
-- SUKOONROUTE / ROAMKARMA DATABASE SCHEMA
-- PostgreSQL / Supabase Schema with Row Level Security (RLS)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & USERS
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE, -- References auth.users(id) in Supabase
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    nationality TEXT DEFAULT 'Roamer',
    is_female BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    verification_badge TEXT CHECK (verification_badge IN ('unverified', 'email_phone', 'gov_id_verified', 'trusted_superhost')) DEFAULT 'unverified',
    karma_points INTEGER DEFAULT 0,
    languages TEXT[] DEFAULT '{}',
    skills_offered TEXT[] DEFAULT '{}',
    skills_wanted TEXT[] DEFAULT '{}',
    travel_style TEXT CHECK (travel_style IN ('slow', 'spiritual', 'budget', 'nomad')) DEFAULT 'slow',
    safety_rating NUMERIC(3,2) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. VERIFICATIONS (Admin moderation queue)
CREATE TABLE IF NOT EXISTS verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    document_type TEXT CHECK (document_type IN ('Aadhaar', 'Passport', 'Voter ID', 'Driver License')) NOT NULL,
    document_number_masked TEXT NOT NULL,
    document_image_url TEXT,
    selfie_image_url TEXT,
    status TEXT CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    admin_notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. GIGS (Work & Earn / Cultural Exchange)
CREATE TABLE IF NOT EXISTS gigs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    region TEXT CHECK (region IN ('rajasthan', 'rishikesh', 'himachal', 'varanasi', 'goa', 'kerala')) NOT NULL,
    state TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    skills_needed TEXT[] DEFAULT '{}',
    perks TEXT[] DEFAULT '{}',
    duration TEXT NOT NULL,
    hours_per_day INTEGER NOT NULL DEFAULT 4,
    is_women_only BOOLEAN DEFAULT false,
    sukoon_level INTEGER CHECK (sukoon_level BETWEEN 1 AND 5) DEFAULT 5,
    comfort_level INTEGER CHECK (comfort_level BETWEEN 1 AND 5) DEFAULT 3,
    images TEXT[] DEFAULT '{}',
    visa_notice TEXT DEFAULT 'Tourist Visa Notice: Unpaid voluntary cultural exchange providing boarding and food.',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. APPLICATIONS (Gig applications)
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID REFERENCES gigs(id) ON DELETE CASCADE,
    applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    pitch_message TEXT NOT NULL,
    status TEXT CHECK (status IN ('Pending', 'Accepted', 'Declined')) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. STAYS (Ashrams, Homestays, Couch, Work-ex)
CREATE TABLE IF NOT EXISTS stays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    stay_type TEXT CHECK (stay_type IN ('Ashram', 'Homestay', 'Farm Stay', 'Hostel Bed', 'Couch / Temple Hall')) NOT NULL,
    region TEXT CHECK (region IN ('rajasthan', 'rishikesh', 'himachal', 'varanasi', 'goa', 'kerala')) NOT NULL,
    state TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_night NUMERIC(10,2) DEFAULT 0.00,
    price_type TEXT CHECK (price_type IN ('Free (Work-Exchange)', 'Cost-Sharing', 'Donation', 'Nominal Fee')) DEFAULT 'Free (Work-Exchange)',
    women_only BOOLEAN DEFAULT false,
    safety_score INTEGER CHECK (safety_score BETWEEN 0 AND 100) DEFAULT 95,
    sukoon_level INTEGER CHECK (sukoon_level BETWEEN 1 AND 5) DEFAULT 5,
    comfort_level INTEGER CHECK (comfort_level BETWEEN 1 AND 5) DEFAULT 3,
    amenities TEXT[] DEFAULT '{}',
    house_rules TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    lat NUMERIC(9,6),
    lng NUMERIC(9,6),
    rating NUMERIC(3,2) DEFAULT 5.0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. BOOKINGS (Stay bookings)
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stay_id UUID REFERENCES stays(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT CHECK (status IN ('Pending Review', 'Confirmed', 'Completed', 'Cancelled')) DEFAULT 'Confirmed',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. RIDES (Carpool & Companion travel, zero ticket resale)
CREATE TABLE IF NOT EXISTS rides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    vehicle_type TEXT NOT NULL,
    total_seats INTEGER NOT NULL DEFAULT 4,
    available_seats INTEGER NOT NULL DEFAULT 3,
    cost_split_per_person NUMERIC(10,2) DEFAULT 0.00,
    is_women_only BOOLEAN DEFAULT false,
    stops TEXT[] DEFAULT '{}',
    notes TEXT,
    ticket_warning TEXT DEFAULT 'Indian Railways tickets non-transferable. Cab/carpool cost share only.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. RIDE REQUESTS (Joining carpools)
CREATE TABLE IF NOT EXISTS ride_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_id UUID REFERENCES rides(id) ON DELETE CASCADE,
    passenger_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    seats_requested INTEGER DEFAULT 1,
    status TEXT CHECK (status IN ('Pending', 'Accepted', 'Declined')) DEFAULT 'Accepted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. EXPERIENCES (Yoga, cooking, singing, craft barter)
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    pricing TEXT CHECK (pricing IN ('Free / Gift', 'Donation', 'Skill Swap')) DEFAULT 'Skill Swap',
    swaps_accepted TEXT,
    description TEXT NOT NULL,
    sukoon_level INTEGER DEFAULT 5,
    comfort_level INTEGER DEFAULT 3,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. PLACES & PHRASES (Culture Explorer)
CREATE TABLE IF NOT EXISTS places (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    hindi_name TEXT NOT NULL,
    region TEXT NOT NULL,
    state TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    comfort_level INTEGER DEFAULT 3,
    sukoon_level INTEGER DEFAULT 5,
    best_time TEXT,
    local_food TEXT[] DEFAULT '{}',
    safety_tips TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    lat NUMERIC(9,6),
    lng NUMERIC(9,6)
);

CREATE TABLE IF NOT EXISTS phrases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id TEXT REFERENCES places(id) ON DELETE CASCADE,
    english TEXT NOT NULL,
    hindi_devanagari TEXT NOT NULL,
    transliteration TEXT NOT NULL,
    context TEXT NOT NULL,
    audio_text TEXT NOT NULL
);

-- 11. QUESTIONS & ANSWERS (Give Solutions Q&A)
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    upvotes INTEGER DEFAULT 1,
    answers_count INTEGER DEFAULT 0,
    best_answer_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 1,
    is_accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. MESSAGES (In-app protected chat between matched roamers)
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. TRUSTED CONTACTS & SOS EVENTS (Women Safety Core)
CREATE TABLE IF NOT EXISTS trusted_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS sos_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lat NUMERIC(9,6),
    lng NUMERIC(9,6),
    status TEXT CHECK (status IN ('Active', 'Resolved', 'False Alarm')) DEFAULT 'Active',
    dispatched_alert_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. SAFETY REPORTS (Moderation)
CREATE TABLE IF NOT EXISTS safety_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reported_entity_type TEXT CHECK (reported_entity_type IN ('profile', 'stay', 'gig', 'ride')) NOT NULL,
    reported_entity_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('Moderate', 'Critical')) DEFAULT 'Moderate',
    status TEXT CHECK (status IN ('Open', 'Investigating', 'Resolved', 'Dismissed')) DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE stays ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE trusted_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_reports ENABLE ROW LEVEL SECURITY;

-- Public read access to active stays, gigs, and rides
CREATE POLICY "Public can view active gigs" ON gigs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active stays" ON stays FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view rides" ON rides FOR SELECT USING (true);
CREATE POLICY "Public can view verified places" ON places FOR SELECT USING (true);
CREATE POLICY "Public can view questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public can view answers" ON answers FOR SELECT USING (true);

-- Authenticated user restrictions
CREATE POLICY "Users can manage their own trusted contacts" ON trusted_contacts
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own messages" ON messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

