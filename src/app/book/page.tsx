'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const DEMO_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'];

function BookingContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get('u') || 'demo-user';
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'date' | 'confirm'>('date');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (booked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="glow-card p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted mb-4">
            Your 30-minute consultation is booked for{' '}
            <span className="text-foreground font-medium">
              {monthName.split(' ')[0]} {selectedDate} at {selectedTime}
            </span>
          </p>
          <p className="text-sm text-muted">A confirmation email has been sent to {email}</p>
          <div className="mt-6 p-4 bg-background rounded-lg border border-border text-sm text-left space-y-1">
            <p><span className="text-muted">Host:</span> {username}</p>
            <p><span className="text-muted">Event:</span> 30-min Consultation</p>
            <p><span className="text-muted">Date:</span> {monthName.split(' ')[0]} {selectedDate}, {year}</p>
            <p><span className="text-muted">Time:</span> {selectedTime}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="glow-card overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left: Host info */}
            <div className="md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-border">
              <div className="w-14 h-14 bg-accent-glow rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-accent">{username[0]?.toUpperCase()}</span>
              </div>
              <h2 className="font-bold text-lg">{username}</h2>
              <h3 className="text-accent font-semibold mt-4 mb-1">30-min Consultation</h3>
              <div className="space-y-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  30 min
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Video call
                </div>
              </div>
              <p className="text-sm text-muted mt-4">Pick a date and time that works for you. I&apos;ll send a confirmation with meeting details.</p>
              <p className="text-xs text-muted mt-6">Powered by <span className="text-accent">SchedulePulse</span></p>
            </div>

            {/* Right: Calendar or confirm form */}
            <div className="md:w-2/3 p-6">
              {step === 'date' ? (
                <>
                  <h3 className="font-semibold mb-4">{monthName}</h3>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                      <div key={d} className="text-muted text-xs py-1">{d}</div>
                    ))}
                    {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const date = new Date(year, month, day);
                      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                      const isAvailable = !isPast && !isWeekend;
                      const isSelected = selectedDate === day;
                      return (
                        <button
                          key={day}
                          onClick={() => isAvailable && setSelectedDate(day)}
                          disabled={!isAvailable}
                          className={`py-2 rounded-lg text-sm ${isSelected ? 'bg-accent text-white font-bold' : isAvailable ? 'hover:bg-surface-hover text-foreground' : 'text-muted/30 cursor-default'}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {selectedDate && (
                    <>
                      <h4 className="font-semibold text-sm mb-2">Available times — {monthName.split(' ')[0]} {selectedDate}</h4>
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {DEMO_SLOTS.map(t => (
                          <button
                            key={t}
                            onClick={() => { setSelectedTime(t); setStep('confirm'); }}
                            className={`border text-sm py-2 rounded-lg ${selectedTime === t ? 'border-accent bg-accent-glow text-accent' : 'border-border hover:border-accent/50'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button onClick={() => setStep('date')} className="text-sm text-accent hover:underline mb-4 flex items-center gap-1">
                    &larr; Back
                  </button>
                  <h3 className="font-semibold mb-1">Confirm Booking</h3>
                  <p className="text-sm text-muted mb-4">{monthName.split(' ')[0]} {selectedDate} at {selectedTime} &middot; 30 min</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-muted mb-1">Your Name *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" required />
                    </div>
                    <div>
                      <label className="block text-sm text-muted mb-1">Email *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" required />
                    </div>
                    <div>
                      <label className="block text-sm text-muted mb-1">Notes (optional)</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent resize-none" placeholder="Anything you'd like to discuss?" />
                    </div>
                    <button
                      onClick={() => name && email && setBooked(true)}
                      className="w-full bg-accent hover:bg-accent-light text-white py-2.5 rounded-lg font-medium"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-muted">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
