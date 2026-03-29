'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function UpgradePage() {
  async function handleUpgrade() {
    // TODO: Call create-subscription-checkout Edge Function
    alert('Stripe checkout coming soon! Plan: schedulepulse_pro');
  }

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Upgrade to Pro</h1>
        <p className="text-muted mb-8">Unlock unlimited scheduling power</p>

        <div className="glow-card p-8 ring-2 ring-accent/30 mb-6">
          <p className="text-4xl font-bold text-foreground">$7<span className="text-lg text-muted font-normal">/mo</span></p>
          <p className="text-sm text-muted mt-2 mb-6">Cancel anytime</p>
          <ul className="space-y-3 text-sm text-left max-w-xs mx-auto mb-8">
            {[
              'Unlimited event types',
              'Unlimited bookings',
              'Google Calendar sync',
              'Custom branding & colors',
              'Buffer time between meetings',
              'Automated reminders',
              'Priority support',
            ].map(f => (
              <li key={f} className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-success flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpgrade}
            className="w-full py-3 bg-accent hover:bg-accent-light rounded-xl font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5"
          >
            Subscribe — $7/mo
          </button>
        </div>

        <Link href="/dashboard" className="text-sm text-muted hover:text-foreground">
          Back to dashboard
        </Link>
      </div>
    </>
  );
}
