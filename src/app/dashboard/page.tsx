'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BookingEntry {
  id: string;
  guestName: string;
  guestEmail: string;
  eventType: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'cancelled' | 'completed';
}

const DEMO_BOOKINGS: BookingEntry[] = [
  { id: '1', guestName: 'Alex Chen', guestEmail: 'alex@example.com', eventType: '30-min Consultation', date: '2026-03-31', time: '10:00 AM', duration: 30, status: 'confirmed' },
  { id: '2', guestName: 'Maria Lopez', guestEmail: 'maria@example.com', eventType: '60-min Strategy Session', date: '2026-03-31', time: '2:00 PM', duration: 60, status: 'confirmed' },
  { id: '3', guestName: 'James Wilson', guestEmail: 'james@example.com', eventType: '15-min Intro Call', date: '2026-04-01', time: '9:00 AM', duration: 15, status: 'confirmed' },
  { id: '4', guestName: 'Sarah Kim', guestEmail: 'sarah@example.com', eventType: '30-min Consultation', date: '2026-04-01', time: '11:00 AM', duration: 30, status: 'confirmed' },
  { id: '5', guestName: 'Ryan Taylor', guestEmail: 'ryan@example.com', eventType: '30-min Consultation', date: '2026-03-28', time: '3:00 PM', duration: 30, status: 'completed' },
];

const EVENT_TYPES = [
  { name: '15-min Intro Call', duration: 15, color: '#06b6d4', bookings: 12 },
  { name: '30-min Consultation', duration: 30, color: '#3b82f6', bookings: 28 },
  { name: '60-min Strategy Session', duration: 60, color: '#8b5cf6', bookings: 8 },
];

export default function DashboardPage() {
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
  const upcoming = DEMO_BOOKINGS.filter(b => b.status === 'confirmed');
  const past = DEMO_BOOKINGS.filter(b => b.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-tight">
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Schedule</span>
            <span>Pulse</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/settings" className="text-sm text-muted hover:text-foreground">Settings</Link>
            <Link href="/upgrade" className="text-sm bg-accent hover:bg-accent-light text-white px-3 py-1.5 rounded-lg">Upgrade</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Upcoming', value: '4', sub: 'this week' },
            { label: 'Total Bookings', value: '48', sub: 'this month' },
            { label: 'Completion Rate', value: '94%', sub: 'last 30 days' },
            { label: 'Avg. per Day', value: '2.3', sub: 'bookings' },
          ].map(s => (
            <div key={s.label} className="stat-card p-4">
              <p className="text-sm text-muted">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Booking link + Event types */}
          <div className="space-y-6">
            {/* Booking link */}
            <div className="glow-card p-5">
              <h3 className="font-semibold mb-3">Your Booking Link</h3>
              <div className="bg-background rounded-lg p-3 text-sm font-mono text-accent border border-border mb-3 truncate">
                schedulepulse.com/book/demo-user
              </div>
              <button className="w-full bg-accent hover:bg-accent-light text-white py-2 rounded-lg text-sm font-medium">
                Copy Link
              </button>
            </div>

            {/* Event types */}
            <div className="glow-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Event Types</h3>
                <button className="text-xs text-accent hover:underline">+ New</button>
              </div>
              <div className="space-y-3">
                {EVENT_TYPES.map(et => (
                  <div key={et.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: et.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{et.name}</p>
                      <p className="text-xs text-muted">{et.duration} min &middot; {et.bookings} bookings</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Bookings list */}
          <div className="md:col-span-2">
            <div className="glow-card p-5">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('upcoming')} className={`text-sm font-medium pb-1 border-b-2 ${view === 'upcoming' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-foreground'}`}>
                  Upcoming ({upcoming.length})
                </button>
                <button onClick={() => setView('past')} className={`text-sm font-medium pb-1 border-b-2 ${view === 'past' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-foreground'}`}>
                  Past ({past.length})
                </button>
              </div>
              <div className="space-y-3">
                {(view === 'upcoming' ? upcoming : past).map(b => (
                  <div key={b.id} className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border/50">
                    <div className="w-10 h-10 bg-accent-glow rounded-full flex items-center justify-center text-accent font-bold text-sm">
                      {b.guestName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{b.guestName}</p>
                      <p className="text-xs text-muted">{b.eventType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{b.time}</p>
                      <p className="text-xs text-muted">{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-success/10 text-success' : b.status === 'completed' ? 'bg-accent-glow text-accent' : 'bg-danger/10 text-danger'}`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
