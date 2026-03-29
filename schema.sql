-- SchedulePulse Schema (sp_ prefix)
-- Run against shared Supabase: zthayenxqbkiwwqkfemh

CREATE TABLE IF NOT EXISTS sp_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT DEFAULT '',
  timezone TEXT DEFAULT 'America/New_York',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sp_event_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  description TEXT DEFAULT '',
  color TEXT DEFAULT '#06b6d4',
  location TEXT DEFAULT 'video',
  buffer_minutes INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sp_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  UNIQUE(user_id, day_of_week)
);

CREATE TABLE IF NOT EXISTS sp_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type_id UUID REFERENCES sp_event_types(id) ON DELETE CASCADE,
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_notes TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  timezone TEXT DEFAULT 'America/New_York',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sp_bookings_host ON sp_bookings(host_id, start_time);
CREATE INDEX IF NOT EXISTS idx_sp_bookings_status ON sp_bookings(host_id, status);
CREATE INDEX IF NOT EXISTS idx_sp_profiles_slug ON sp_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_sp_event_types_user ON sp_event_types(user_id);

ALTER TABLE sp_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sp_event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE sp_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE sp_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own profile" ON sp_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own event types" ON sp_event_types FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own availability" ON sp_availability FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own bookings" ON sp_bookings FOR SELECT USING (auth.uid() = host_id);
CREATE POLICY "Anyone can create bookings" ON sp_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view profiles" ON sp_profiles FOR SELECT USING (true);
CREATE POLICY "Public can view active event types" ON sp_event_types FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view availability" ON sp_availability FOR SELECT USING (is_available = true);
