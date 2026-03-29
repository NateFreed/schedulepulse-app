'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Schedule</span>
          <span className="text-foreground">Pulse</span>
        </span>
        <div className="flex items-center gap-3">
          <Link href="/auth" className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground">Sign In</Link>
          <Link href="/auth" className="px-5 py-2 bg-accent hover:bg-accent-light rounded-xl text-sm font-semibold text-white shadow-sm shadow-accent/20">Start Free</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block bg-accent-glow text-accent text-sm font-medium px-3 py-1 rounded-full mb-6">
          Free forever for solo users
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Scheduling That<br />
          <span className="text-accent">Books Itself</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
          Share your booking link. Clients pick a time. No emails. No phone tag. Just booked appointments, automatically.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link href="/auth" className="px-8 py-3.5 bg-accent hover:bg-accent-light rounded-xl font-semibold text-lg text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5">
            Get Your Booking Link
          </Link>
          <Link href="/book" className="px-8 py-3.5 border border-border hover:border-border-light rounded-xl font-semibold text-lg text-muted hover:text-foreground transition-all hover:-translate-y-0.5">
            See Demo
          </Link>
        </div>
        <p className="text-sm text-muted mt-4">Free: 1 event type, 10 bookings/month. No credit card.</p>
      </section>

      {/* Demo booking preview */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="glow-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="w-12 h-12 bg-accent-glow rounded-full flex items-center justify-center mb-3">
                <span className="text-xl">SP</span>
              </div>
              <h3 className="font-bold text-lg">Sarah Parker</h3>
              <p className="text-sm text-muted mb-4">Business Consultant</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-muted">30 min</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <span className="text-muted">Google Meet</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h4 className="font-semibold mb-3">Select a Date</h4>
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                  <div key={d} className="text-muted text-xs py-1">{d}</div>
                ))}
                {Array.from({length: 35}, (_, i) => {
                  const day = i - 5; // offset for starting day
                  const isValid = day >= 1 && day <= 31;
                  const isToday = day === 29;
                  const hasSlots = isValid && day >= 29 && [1,2,3,4,5].includes((i) % 7);
                  return (
                    <div key={i} className={`py-1.5 rounded-lg text-sm ${!isValid ? 'text-border' : isToday ? 'bg-accent text-white font-bold' : hasSlots ? 'text-foreground hover:bg-surface-hover cursor-pointer' : 'text-muted/40'}`}>
                      {isValid ? day : ''}
                    </div>
                  );
                })}
              </div>
              <h4 className="font-semibold mb-2 text-sm">Available Times</h4>
              <div className="grid grid-cols-3 gap-2">
                {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map(t => (
                  <button key={t} className="border border-accent/30 hover:border-accent hover:bg-accent-glow text-sm py-2 rounded-lg">{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Everything your booking page needs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Shareable Booking Link', desc: 'Your personal booking page. Share it on your website, email signature, or social media.' },
            { title: 'Smart Availability', desc: 'Set your working hours. Buffer time between meetings. Block off personal time.' },
            { title: 'Timezone Detection', desc: 'Automatically detects your guest\'s timezone. No confusion about meeting times.' },
            { title: 'Email Confirmations', desc: 'Both you and your guest get confirmation emails with calendar invites.' },
            { title: 'Multiple Event Types', desc: '15-min intro call, 30-min consultation, 60-min deep dive. You decide.' },
            { title: 'Calendar Sync', desc: 'Connects to Google Calendar so you never double-book. (Pro feature)' },
          ].map(f => (
            <div key={f.title} className="glow-card p-6">
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-4">Simple pricing</h2>
        <p className="text-muted text-center mb-12">Free for individuals. Pro for growing teams.</p>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { name: 'Free', price: '$0', period: '/mo', features: ['1 event type', '10 bookings/month', 'Booking page', 'Email confirmations', 'Timezone detection'], cta: 'Start Free', highlight: false },
            { name: 'Pro', price: '$7', period: '/mo', features: ['Unlimited event types', 'Unlimited bookings', 'Google Calendar sync', 'Custom branding', 'Buffer time control', 'Team scheduling', 'SMS reminders', 'Priority support'], cta: 'Start Free Trial', highlight: true },
          ].map(tier => (
            <div key={tier.name} className={`glow-card p-6 ${tier.highlight ? 'border-accent ring-1 ring-accent/20' : ''}`}>
              {tier.highlight && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-medium">Most Popular</span>}
              <h3 className="text-xl font-bold mt-2">{tier.name}</h3>
              <div className="mt-3 mb-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted">{tier.period}</span>
              </div>
              <ul className="space-y-2 my-6">
                {tier.features.map(f => (
                  <li key={f} className="text-sm flex items-center gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth" className={`block text-center py-2.5 rounded-lg font-medium text-sm ${tier.highlight ? 'bg-accent hover:bg-accent-light text-white' : 'border border-border hover:border-border-light'}`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">vs. Calendly</h2>
        <div className="glow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-muted font-medium">Feature</th>
                <th className="p-4 text-muted font-medium">Calendly</th>
                <th className="p-4 text-accent font-medium">SchedulePulse</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Free plan', '1 event type', '1 event type + 10 bookings'],
                ['Pro price', '$10/seat/mo', '$7/mo'],
                ['Booking page', 'Yes', 'Yes'],
                ['Pulse Suite integration', 'No', 'Yes (LeadPulse, InvoicePulse)'],
                ['AI scheduling', 'No', 'Coming soon'],
                ['Team scheduling', '$16/seat/mo', '$7/mo flat'],
              ].map(([feature, cal, sp]) => (
                <tr key={feature} className="border-b border-border/50">
                  <td className="p-4 font-medium">{feature}</td>
                  <td className="p-4 text-center text-muted">{cal}</td>
                  <td className="p-4 text-center text-success">{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4 text-center">
        <span className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Schedule</span>
          <span className="text-foreground">Pulse</span>
        </span>
        <p className="text-sm text-muted mt-2">Part of the <a href="https://pulse-suite.pages.dev" className="text-accent hover:underline">Pulse Suite</a> for small businesses.</p>
      </footer>
    </div>
  );
}
