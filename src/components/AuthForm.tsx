'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/auth';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') await signUp(email, password);
      else await signIn(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center mb-8">
          <span className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Schedule</span>
            <span className="text-foreground">Pulse</span>
          </span>
        </Link>
        <div className="glow-card p-6">
          <h2 className="text-lg font-semibold mb-4">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
          {error && <p className="text-sm text-danger mb-3 bg-danger/10 p-2 rounded-lg">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
              className="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent text-sm" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required minLength={6}
              className="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent text-sm" />
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-accent hover:bg-accent-light disabled:opacity-50 rounded-xl text-sm font-semibold text-white shadow-sm shadow-accent/20 transition-all">
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <p className="text-xs text-muted text-center mt-4">
            {mode === 'login' ? (
              <>No account? <Link href="/auth/signup" className="text-accent hover:underline">Sign up</Link></>
            ) : (
              <>Already have an account? <Link href="/auth/login" className="text-accent hover:underline">Sign in</Link></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
