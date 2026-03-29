'use client';

import { useState } from 'react';
import Link from 'next/link';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('Demo User');
  const [slug, setSlug] = useState('demo-user');
  const [bio, setBio] = useState('Book a meeting with me');
  const [timezone, setTimezone] = useState('America/New_York');
  const [availability, setAvailability] = useState(
    DAYS.map((_, i) => ({ active: i > 0 && i < 6, start: '09:00', end: '17:00' }))
  );
  const [bufferMinutes, setBufferMinutes] = useState(15);
  const [emailConfirmations, setEmailConfirmations] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold tracking-tight">
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Schedule</span>
            <span>Pulse</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-muted hover:text-foreground">Back to Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Profile */}
        <div className="glow-card p-6">
          <h2 className="font-semibold mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-muted mb-1">Display Name</label>
              <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Booking URL</label>
              <div className="flex items-center">
                <span className="text-sm text-muted bg-surface px-3 py-2.5 rounded-l-lg border border-r-0 border-border">schedulepulse.com/book/</span>
                <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="flex-1 bg-background border border-border rounded-r-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent resize-none" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Timezone</label>
              <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent">
                {['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Berlin', 'Asia/Tokyo', 'Australia/Sydney'].map(tz => (
                  <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="glow-card p-6">
          <h2 className="font-semibold mb-4">Availability</h2>
          <div className="space-y-3">
            {DAYS.map((day, i) => (
              <div key={day} className="flex items-center gap-3">
                <button
                  onClick={() => setAvailability(a => a.map((d, j) => j === i ? { ...d, active: !d.active } : d))}
                  className={`w-11 h-6 rounded-full relative flex-shrink-0 ${availability[i].active ? 'bg-accent' : 'bg-border'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${availability[i].active ? 'left-5.5' : 'left-0.5'}`} />
                </button>
                <span className="text-sm w-24">{day}</span>
                {availability[i].active ? (
                  <div className="flex items-center gap-2 text-sm">
                    <input type="time" value={availability[i].start} onChange={e => setAvailability(a => a.map((d, j) => j === i ? { ...d, start: e.target.value } : d))} className="bg-background border border-border rounded px-2 py-1 text-foreground" />
                    <span className="text-muted">to</span>
                    <input type="time" value={availability[i].end} onChange={e => setAvailability(a => a.map((d, j) => j === i ? { ...d, end: e.target.value } : d))} className="bg-background border border-border rounded px-2 py-1 text-foreground" />
                  </div>
                ) : (
                  <span className="text-sm text-muted">Unavailable</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm text-muted mb-1">Buffer between meetings</label>
            <select value={bufferMinutes} onChange={e => setBufferMinutes(Number(e.target.value))} className="bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent">
              {[0, 5, 10, 15, 30, 60].map(m => (
                <option key={m} value={m}>{m === 0 ? 'No buffer' : `${m} minutes`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="glow-card p-6">
          <h2 className="font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Email Confirmations', desc: 'Get notified when someone books', checked: emailConfirmations, onChange: setEmailConfirmations },
              { label: 'Daily Digest', desc: 'Summary of tomorrow\'s bookings', checked: dailyDigest, onChange: setDailyDigest },
            ].map(t => (
              <div key={t.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted">{t.desc}</p>
                </div>
                <button onClick={() => t.onChange(!t.checked)} className={`w-11 h-6 rounded-full relative ${t.checked ? 'bg-accent' : 'bg-border'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${t.checked ? 'left-5.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="glow-card p-6">
          <h2 className="font-semibold mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-sm text-muted">1 event type, 10 bookings/month</p>
            </div>
            <Link href="/upgrade" className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg text-sm font-medium">
              Upgrade to Pro
            </Link>
          </div>
        </div>

        <button className="bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-lg font-medium">Save Changes</button>
      </div>
    </div>
  );
}
