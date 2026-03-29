export interface EventType {
  id: string;
  user_id: string;
  name: string;
  duration_minutes: number;
  description: string;
  color: string;
  location: string;
  buffer_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  event_type_id: string;
  host_id: string;
  guest_name: string;
  guest_email: string;
  guest_notes: string | null;
  start_time: string;
  end_time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  timezone: string;
  created_at: string;
}

export interface Availability {
  id: string;
  user_id: string;
  day_of_week: number; // 0=Sun, 6=Sat
  start_time: string; // "09:00"
  end_time: string; // "17:00"
  is_available: boolean;
}

export interface UserProfile {
  id: string;
  user_id: string;
  slug: string;
  display_name: string;
  bio: string;
  timezone: string;
  avatar_url: string | null;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export type ViewMode = 'day' | 'week' | 'month';

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const EVENT_COLORS = [
  '#8b5cf6', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#0ea5e9', '#14b8a6',
];

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}
