'use client';

import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function UpgradePage() {
  async function handleUpgrade() {
    const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
      body: { plan_id: 'schedulepulse_pro' },
    });
    if (data?.url) window.location.href = data.url;
    else alert(error?.message || 'Could not start checkout');
  }

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

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Upgrade to Pro</h1>
          <p className="text-muted">Unlimited bookings, calendar sync, and more.</p>
        </div>

        <div className="glow-card p-6 border-accent ring-1 ring-accent/20">
          <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-medium">Pro</span>
          <div className="mt-3 mb-1">
            <span className="text-4xl font-bold">$7</span>
            <span className="text-muted">/month</span>
          </div>
          <p className="text-sm text-muted mb-6">Everything you need to run your schedule</p>
          <ul className="space-y-2 mb-8">
            {['Unlimited event types', 'Unlimited bookings', 'Google Calendar sync', 'Custom branding', 'Buffer time control', 'Team scheduling', 'SMS reminders', 'Priority support', 'Custom booking domain'].map(f => (
              <li key={f} className="text-sm flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button onClick={handleUpgrade} className="w-full bg-accent hover:bg-accent-light text-white py-2.5 rounded-lg font-medium">
            Start Free Trial
          </button>
        </div>

        <p className="text-center text-sm text-muted mt-6">
          Part of the <a href="https://pulse-suite.pages.dev" className="text-accent hover:underline">Pulse Suite</a>. Bundle all tools for $79/mo.
        </p>
      </div>
    </div>
  );
}
