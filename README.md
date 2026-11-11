# 🕉️ SukoonRoute (सुकून रूट)
> **"Travel slow. Earn a little. Find sukoon."**  
> A community platform for slow, low-budget roamers to travel cheaply or free through work-exchange, ashram stays, shared journeys, skills barter, and women's safety.

---

## 🌟 Overview & Architecture

SukoonRoute is built for travelers, spiritual seekers, backpackers, and female solo roamers across India (Rajasthan, Rishikesh, Himachal, Varanasi, Kerala, Goa). It rejects generic social networking and focuses exclusively on:
1. **Work & Earn (Gigs):** Voluntary, non-monetary work-exchange (3-4 hours of hostel hosting, organic farming, or translation for room and food). Fully compliant with Indian tourist visa laws.
2. **Sanctuary Stays:** ₹0 work-ex floor rooms, free homestays, ashram dorms, and women-only haveli floors with radial safety score audits.
3. **Ride & Cost Sharing:** Carpool fuel splitting and companion travel. Strictly zero ticket resale (IRCTC compliant).
4. **Experience & Barter:** Two-sided skill barters ("I teach Hindi, you teach guitar") and spiritual dawn walks.
5. **Culture Explorer & Phrase Flash:** Curated regional spots with Sukoon (1-5) and Comfort (1-5) ratings, plus an audio pocket phrasebook with tap-to-hear pronunciation powered by Web Speech API.
6. **Women Safety Shield:** One-tap emergency SOS siren synthesizer, simulated fake incoming calls, auto-check-in timer, masked contact numbers, and 112 / 1091 emergency helpline directory.
7. **Signature Innovations:**
   - **Sukoon Compass:** Rotary mood dial (*Quiet, Curious, Healing, Adventurous, Social, Uncomfortable-but-growing*).
   - **Vibe Match:** Tinder-style slow roamer compatibility matching deck with confetti celebrations and women-only match mode.
   - **Journey Weaver:** Interactive route itinerary weaver calculating sleeper train fares and auto-suggesting free stays.
   - **Chai Table:** Spontaneous public tea table broadcast with 2-hour window and RSVP.
   - **Silence Mode:** Zen contemplative mode with 4-7-8 breathing circle, singing bowl binaural sound synthesis, and meditation timer.
   - **Command Palette:** `Ctrl+K` / `Cmd+K` instant navigation.
   - **Travel Companion AI:** Cultural etiquette, visa guidelines, and female safety advice assistant.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling & Design System:** Tailwind CSS, Golden-hour Saffron & Forest Green palette, glassmorphism cards, fluid animations
- **Database & Auth:** PostgreSQL / Supabase with Row Level Security (RLS) schemas and realistic seed scripts (`supabase/migrations/` & `supabase/seed.sql`)
- **Audio Synthesizers:** Web Audio API (Himalayan singing bowl chime, phone telephone rings, emergency siren) + Web Speech API (Hindi audio pronunciation)
- **Maps:** Vector grid & OpenStreetMap tile integration
- **Visuals & Delights:** Canvas-confetti, Lucide icons, Google Fonts Fraunces & Inter

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- Node.js `v18+` or `v20+` (tested on Node 24)
- `pnpm` (or `npm`)

### 2. Clone & Install
```bash
git clone https://github.com/your-username/sukoonroute.git
cd sukoonroute
pnpm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Database Setup (Supabase / PostgreSQL)
Apply the migration schema and seed data:
```bash
# In your Supabase SQL Editor or psql terminal:
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/20261111_init_schema.sql
psql -h your-db-host -U postgres -d postgres -f supabase/seed.sql
```

### 5. Run the Test Suite
```bash
node tests/flow-verification.js
```

### 6. Start the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Production Build
```bash
pnpm build
pnpm start
```

---

## 🚢 Deployment to Vercel & Supabase

1. **Push to GitHub / GitLab**.
2. **Import repository into Vercel**.
3. **Add Environment Variables** in the Vercel Dashboard from `.env.example`.
4. **Deploy**: Next.js App Router will generate static and dynamic routes automatically.

---

## 📋 Assumptions Made

1. **Legal Framing for Foreigners:** Paid work on an Indian e-Tourist or regular Tourist Visa is strictly prohibited by the Bureau of Immigration (BOI / FRRO). All gigs are framed as voluntary guest cultural exchange providing complimentary boarding and Sattvic food.
2. **Railway & Airline Tickets:** Under the Indian Railways Act 1989 (Section 142), ticket resale is illegal. Rides are strictly framed as carpool cost-sharing (fuel/cab split) or companion accompaniment on train journeys.
3. **Public-Only Chai Meetups:** To ensure women's security, all spontaneous Chai Table meetups are restricted to verified, well-lit public spots (ghat benches, cafes).
4. **Zero-Deposit Trust Engine:** Bookings and work applications transact without platform commissions; karma points incentivize respectful behavior.

---

## 🛡️ Pre-Launch Legal & Safety Checklist

- [ ] **Form C Compliance:** Verify that homestay hosts are aware of the mandatory Bureau of Immigration (BoI) Form C online registration for all foreign guests within 24 hours of arrival.
- [ ] **State Tourism Registration:** Ensure homestays adhere to state tourism schemes (e.g., Rajasthan Tourism Homestay Rules, Kerala Tourism Dept).
- [ ] **Data Protection & GPS:** Ensure real-time GPS tracking is only enabled during active SOS broadcast or active Check-in timers.
- [ ] **Emergency Hotlines:** Verify that 112 (National Emergency), 1091 (Women Helpline), and 1363 (Tourist Infoline) dial directly from mobile devices.

---

## 🔮 Phase 2 Roadmap

1. **AI Review Moderation:** Automatic sentiment and safety analysis on reviews to detect subtle red flags.
2. **Offline-First PWA:** Full service-worker caching for maps and emergency contacts when trekking through remote valleys without network coverage.
3. **Regional Languages Expansion:** Full Hindi, Bengali, Tamil, Malayalam, and French locale translations.
4. **Volunteer Visa Integration:** Verified host sponsorship documents for roamers applying for formal Indian Volunteer Visas.
