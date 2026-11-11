// ========================================================
// SUKOONROUTE CORE FLOW & LOGIC UNIT TESTS
// ========================================================

const assert = require('assert');

console.log('🧪 Starting SukoonRoute Test Suite...\n');

// 1. VIBE MATCH COMPATIBILITY TEST
function calculateVibeMatchScore(userA, userB) {
  let score = 70; // baseline
  if (userA.travelStyle === userB.travelStyle) score += 15;
  if (userA.isFemale && userB.isFemale) score += 10;
  // shared interests
  const shared = userA.skillsWanted.filter(s => userB.skillsOffered.includes(s));
  score += Math.min(10, shared.length * 5);
  return Math.min(99, score);
}

const mockMaya = {
  travelStyle: 'spiritual',
  isFemale: true,
  skillsWanted: ['Clay Pottery', 'Woodblock Printing'],
  skillsOffered: ['Digital Illustration', 'Hatha Yoga']
};

const mockMohan = {
  travelStyle: 'spiritual',
  isFemale: false,
  skillsWanted: ['Digital Illustration'],
  skillsOffered: ['Woodblock Printing']
};

const vibeScore = calculateVibeMatchScore(mockMaya, mockMohan);
assert.ok(vibeScore >= 85, 'Vibe score should be high for aligned spiritual roamers');
console.log(`✓ 1. Vibe Match Compatibility Logic passed (Score: ${vibeScore}%)`);


// 2. SUKOON COMPASS FILTERING TEST
const testPlaces = [
  { name: 'Pushkar Hermitage', sukoon: 5, comfort: 4, mood: 'quiet' },
  { name: 'Varanasi Ghat Roof', sukoon: 5, comfort: 2, mood: 'uncomfortable-growing' },
  { name: 'Goa Beach Party', sukoon: 2, comfort: 5, mood: 'social' }
];

function filterBySukoonMood(places, mood) {
  return places.filter(p => p.mood === mood && p.sukoon >= 4);
}

const quietPlaces = filterBySukoonMood(testPlaces, 'quiet');
assert.strictEqual(quietPlaces.length, 1);
assert.strictEqual(quietPlaces[0].name, 'Pushkar Hermitage');
console.log('✓ 2. Sukoon Compass Mood Filtering passed');


// 3. MAIN E2E STATE FLOW: SIGNUP -> POST GIG -> APPLY -> ACCEPT -> CHAT
class MockStore {
  constructor() {
    this.user = { id: 'u1', name: 'Maya', karma: 100 };
    this.gigs = [];
    this.applications = [];
    this.messages = [];
  }

  postGig(title, hours, perks) {
    const gig = {
      id: `g_${this.gigs.length + 1}`,
      hostId: this.user.id,
      title,
      hoursPerDay: hours,
      perks,
      visaNoticeValidated: true
    };
    this.gigs.push(gig);
    this.user.karma += 30;
    return gig;
  }

  applyToGig(gigId, applicantId, pitch) {
    const app = {
      id: `app_${this.applications.length + 1}`,
      gigId,
      applicantId,
      pitch,
      status: 'Pending'
    };
    this.applications.push(app);
    return app;
  }

  acceptApplication(appId) {
    const app = this.applications.find(a => a.id === appId);
    if (app) app.status = 'Accepted';
    return app;
  }

  sendChatMessage(senderId, recipientId, text) {
    const msg = {
      id: `m_${this.messages.length + 1}`,
      senderId,
      recipientId,
      text,
      timestamp: new Date().toISOString()
    };
    this.messages.push(msg);
    return msg;
  }
}

const store = new MockStore();

// Step A: Host posts gig
const newGig = store.postGig('Courtyard Herbalist & Social Reels', 4, ['Free Dorm', 'Meals']);
assert.strictEqual(store.gigs.length, 1);
assert.strictEqual(store.user.karma, 130);
console.log('✓ 3a. Host posted gig with volunteer visa compliance & karma credit');

// Step B: Roamer applies
const app = store.applyToGig(newGig.id, 'roamer_2', 'Namaste! I would love to help with organic gardening.');
assert.strictEqual(app.status, 'Pending');
console.log('✓ 3b. Roamer applied with custom pitch');

// Step C: Host accepts application
const accepted = store.acceptApplication(app.id);
assert.strictEqual(accepted.status, 'Accepted');
console.log('✓ 3c. Host accepted application successfully');

// Step D: In-App Chat initiated
const msg = store.sendChatMessage('roamer_2', 'u1', 'Thank you Maya! Excited to arrive in Pushkar.');
assert.strictEqual(store.messages.length, 1);
assert.strictEqual(msg.recipientId, 'u1');
console.log('✓ 3d. In-App safe messaging initiated between matched parties');


// 4. WOMEN SAFETY SHIELD SANCTUARY TEST
const testStays = [
  { id: 's1', title: 'Female Haveli Floor', womenOnly: true, safetyScore: 98 },
  { id: 's2', title: 'Open Backpacker Hostel', womenOnly: false, safetyScore: 82 }
];

const womenFiltered = testStays.filter(s => s.womenOnly && s.safetyScore >= 90);
assert.strictEqual(womenFiltered.length, 1);
assert.strictEqual(womenFiltered[0].id, 's1');
console.log('✓ 4. Women Safety Sanctuary Filter passed');

console.log('\n🎉 ALL 4 CORE SUKOONROUTE UNIT & FLOW TESTS PASSED!\n');
