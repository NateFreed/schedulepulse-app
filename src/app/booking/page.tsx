'use client';

import { useState } from 'react';
import { formatTime, SHORT_DAYS } from '@/lib/types';

interface EventOption {
  id: string;
  name: string;
  duration: number;
  color: string;
  description: string;
  location: string;
}

const EVENTS: EventOption[] = [
  { id: '1', name: '30-min Discovery Call', duration: 30, color: '#8b5cf6', description: 'Quick intro call to discuss your needs', location: 'Zoom' },
  { id: '2', name: '60-min Strategy Session', duration: 60, color: '#3b82f6', description: 'Deep dive into your project goals', location: 'Google Meet' },
  { id: '3', name: 'Quick Check-in', duration: 15, color: '#22c55e', description: 'Brief follow-up call', location: 'Phone' },
];

function generateDays(): { date: Date; dateStr: string }[] {
  const days = [];
  const start = new Date();
  start.setDate(start.getDate() + 1);
  for (let i = 0; i < 14; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push({ date: d, dateStr: d.toISOString().slice(0, 10) });
    }
  }
  return days;
}

function generateSlots(duration: number): string[] {
  const slots: string[] = [];
  for (let h = 9; h < 17; h++) {
    for (let m = 0; m < 60; m += duration) {
      if (h + (m + duration) / 60 <= 17) {
        slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
  }
  return slots;
}

export default function BookingPage() {
  const [step, setStep] = useState<'event' | 'date' | 'confirm'>('event');
  const [selectedEvent, setSelectedEvent] = useState<EventOption | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);

  const days = generateDays();
  const slots = selectedEvent ? generateSlots(selectedEvent.duration) : [];

  function handleBook() {
    setBooked(true);
  }

  if (booked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-success/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">You&apos;re booked!</h1>
          <p className="text-sm text-muted mb-1">
            {selectedEvent?.name} with Jane Smith
          </p>
          <p className="text-sm text-foreground font-medium">
            {selectedDate && new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime && formatTime(selectedTime)}
          </p>
          <p className="text-xs text-muted mt-4">A confirmation email has been sent to {email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Profile header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-glow rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl font-bold text-accent">JS</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Jane Smith</h1>
          <p className="text-sm text-muted">Product Consultant</p>
          <p className="text-xs text-muted mt-1">Pick a time that works for you</p>
        </div>

        {/* Step 1: Choose event type */}
        {step === 'event' && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2">Choose a meeting type</h2>
            {EVENTS.map(event => (
              <button
                key={event.id}
                onClick={() => { setSelectedEvent(event); setStep('date'); }}
                className="w-full glow-card p-4 text-left hover:!border-accent/50 transition-all"
                style={{ borderLeftWidth: '3px', borderLeftColor: event.color }}
              >
                <h3 className="text-sm font-semibold text-foreground">{event.name}</h3>
                <p className="text-xs text-muted mt-1">{event.duration} min · {event.location}</p>
                <p className="text-xs text-muted mt-0.5">{event.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Choose date & time */}
        {step === 'date' && selectedEvent && (
          <div>
            <button onClick={() => { setStep('event'); setSelectedDate(null); setSelectedTime(null); }} className="text-sm text-accent hover:text-accent-light mb-4 flex items-center gap-1">
              ← Back
            </button>
            <div className="glow-card p-4 mb-4" style={{ borderLeftWidth: '3px', borderLeftColor: selectedEvent.color }}>
              <h3 className="text-sm font-semibold text-foreground">{selectedEvent.name}</h3>
              <p className="text-xs text-muted">{selectedEvent.duration} min · {selectedEvent.location}</p>
            </div>

            {/* Date picker */}
            <h3 className="text-sm font-semibold text-muted mb-3">Select a date</h3>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {days.map(day => (
                <button
                  key={day.dateStr}
                  onClick={() => { setSelectedDate(day.dateStr); setSelectedTime(null); }}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedDate === day.dateStr
                      ? 'bg-accent text-white'
                      : 'bg-surface border border-border hover:border-border-light'
                  }`}
                >
                  <div className="text-[10px] uppercase">{SHORT_DAYS[day.date.getDay()]}</div>
                  <div className="text-lg font-bold">{day.date.getDate()}</div>
                </button>
              ))}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <>
                <h3 className="text-sm font-semibold text-muted mb-3">
                  Available times — {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {slots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => { setSelectedTime(slot); setStep('confirm'); }}
                      className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === slot
                          ? 'bg-accent text-white'
                          : 'bg-surface border border-border hover:border-accent/50 text-foreground'
                      }`}
                    >
                      {formatTime(slot)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && selectedEvent && selectedDate && selectedTime && (
          <div>
            <button onClick={() => setStep('date')} className="text-sm text-accent hover:text-accent-light mb-4 flex items-center gap-1">
              ← Back
            </button>

            <div className="glow-card p-5 mb-6">
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Meeting</span>
                  <span className="text-foreground font-medium">{selectedEvent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Date</span>
                  <span className="text-foreground font-medium">
                    {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Time</span>
                  <span className="text-foreground font-medium">{formatTime(selectedTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Duration</span>
                  <span className="text-foreground font-medium">{selectedEvent.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Location</span>
                  <span className="text-foreground font-medium">{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            <div className="glow-card p-5 space-y-3">
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Your Details</h3>
              <div>
                <label className="text-xs text-muted mb-1 block">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
                  className="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block">Notes (optional)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Anything you'd like to discuss?" rows={3}
                  className="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent text-sm resize-none" />
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!name || !email}
              className="w-full mt-4 py-3 bg-accent hover:bg-accent-light disabled:opacity-50 rounded-xl font-semibold text-white shadow-lg shadow-accent/25 transition-all"
            >
              Confirm Booking
            </button>
          </div>
        )}

        <p className="text-center text-xs text-muted mt-8">
          Powered by <span className="text-accent">SchedulePulse</span>
        </p>
      </div>
    </div>
  );
}
