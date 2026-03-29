'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Booking Page', href: '/booking' },
  { label: 'Settings', href: '/settings' },
];

export default function Navbar() {
  const pathname = usePathname();

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl px-6 py-3 flex items-center gap-6">
      <Link href="/dashboard" className="text-xl font-bold tracking-tight mr-auto">
        <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Schedule</span>
        <span className="text-foreground">Pulse</span>
      </Link>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors ${
            pathname === item.href ? 'text-accent' : 'text-muted hover:text-foreground'
          }`}
        >
          {item.label}
        </Link>
      ))}
      <div className="w-px h-5 bg-border" />
      <button onClick={handleSignOut} className="text-sm text-muted hover:text-foreground transition-colors">
        Sign Out
      </button>
    </nav>
  );
}
