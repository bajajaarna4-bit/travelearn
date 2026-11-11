-- ========================================================
-- SUKOONROUTE SEED DATA (Rajasthan, Rishikesh, Himachal, Varanasi, Goa, Kerala)
-- ========================================================

-- Insert Sample Verified Profiles
INSERT INTO profiles (id, name, email, avatar_url, bio, location, nationality, is_female, is_verified, verification_badge, karma_points, travel_style, safety_rating, reviews_count)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Maya Sharma', 'maya.sharma@example.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 'Slow backpacker, yoga practitioner & freelance illustrator. Passionate about ashram stays and women safety.', 'Pushkar, Rajasthan', 'Indian', true, true, 'gov_id_verified', 480, 'spiritual', 4.9, 18),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Devika Rathore', 'devika.pushkar@example.com', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 'Boutique heritage haveli host catering to respectful slow travellers. Vegetarian kitchen and organic rooftop.', 'Pushkar, Rajasthan', 'Indian', true, true, 'trusted_superhost', 820, 'slow', 4.98, 42),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Swami Niranjan Sewa Trust', 'ashram.tapovan@example.com', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', 'Spiritual sanctuary 50 steps from the holy Ganga. Daily 6 AM chanting, Sattvic dining, and silence garden.', 'Tapovan, Rishikesh', 'Indian', false, true, 'gov_id_verified', 1250, 'spiritual', 4.92, 75);

-- Insert Sample Sanctuaries (Stays)
INSERT INTO stays (id, host_id, title, stay_type, region, state, location, price_per_night, price_type, women_only, safety_score, sukoon_level, comfort_level, amenities, house_rules, description, images, lat, lng, rating)
VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380b01', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Savitri Hills Peace Hermitage (Women-Only Floor)', 'Homestay', 'rajasthan', 'Rajasthan', 'Pushkar, Rajasthan', 0.00, 'Free (Work-Exchange)', true, 98, 5, 4, 
 ARRAY['CCTV Security at Gate', 'Filtered Drinking Water', 'Rooftop Yoga Mat', 'Separate Lockable Wing'], 
 ARRAY['Strictly Vegetarian Premises', 'No Alcohol / Substances', 'Quiet Hours from 9:30 PM', 'Female guests only'],
 'A quiet, secure traditional haveli with lime-plastered walls and views of the sacred Pushkar desert hills. Run by an all-female family team.',
 ARRAY['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'],
 26.4897, 74.5511, 4.96),

('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380b02', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Ganga Bank Vedic Ashram Dorm & Meditation Hall', 'Ashram', 'rishikesh', 'Uttarakhand', 'Tapovan, Rishikesh', 350.00, 'Donation', false, 92, 5, 3,
 ARRAY['Daily 6 AM Yoga', 'Kirtan Hall', '3 Vegetarian Meals', 'Cold/Warm Well Water'],
 ARRAY['Attend Morning Chanting', 'Lights Out at 10 PM', 'Clean your own metal thali', 'Modest attire required'],
 'A genuine spiritual sanctuary just 50 steps from the pristine waters of Mother Ganga. Sleep on simple clean cotton bedding, wake to temple conches.',
 ARRAY['https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'],
 30.1314, 78.3248, 4.88);

-- Insert Sample Gigs (Work-Exchange)
INSERT INTO gigs (id, host_id, title, region, state, location, description, skills_needed, perks, duration, hours_per_day, is_women_only, sukoon_level, comfort_level, images)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380c01', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Hostel Garden & Social Media Host in Pushkar', 'rajasthan', 'Rajasthan', 'Near Brahma Temple, Pushkar',
 'Help 4 hours a day watering our courtyard garden, greeting guests in the evening, and taking Instagram reels of local temple walks. Free room, Sattvic meals, and warm chai.',
 ARRAY['Content Creation', 'Warm English / Hindi', 'Gardening Care'],
 ARRAY['Free Private Room', 'All Meals (Sattvic)', 'WiFi & Chai'],
 '2 to 4 weeks', 4, true, 5, 4,
 ARRAY['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80']);

-- Insert Culture Places & Phrases
INSERT INTO places (id, name, hindi_name, region, state, tagline, description, comfort_level, sukoon_level, best_time, local_food, safety_tips, lat, lng)
VALUES
('pl_pushkar', 'Pushkar Sacred Valley', 'पुष्कर तीर्थ', 'rajasthan', 'Rajasthan', 'Rose scented breezes, 52 holy ghats, and camel bells in the dunes', 'One of India’s oldest sacred towns. Surrounded by hills on three sides and sand dunes on the fourth.', 3, 5, 'October to March', ARRAY['Malpua with Rabdi', 'Gulkand Chai', 'Dal Baati Churma'], ARRAY['Politely refuse priests ("pandas") who press flowers demanding large sums', 'Wear slip-on shoes since footwear is prohibited on ghats'], 26.4897, 74.5511);

INSERT INTO phrases (place_id, english, hindi_devanagari, transliteration, context, audio_text)
VALUES
('pl_pushkar', 'Peace be with you / Greetings', 'राम राम सा / नमस्ते', 'Ram Ram Saa / Namaste', 'Greeting', 'Ram Ram Saa'),
('pl_pushkar', 'No thank you, please don’t bother me', 'नहीं, धन्यवाद। मुझे ज़रूरत नहीं है।', 'Nahin, dhanyavaad. Mujhe zaroorat nahin hai.', 'Emergency & Safety', 'Nahin, dhanyavaad. Mujhe zaroorat nahin hai.');

