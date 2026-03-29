'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else if (!isLogin) setMessage('Check your email for a confirmation link!');
    else window.location.href = '/dashboard';
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Schedule</span>
            <span>Pulse</span>
          </span>
        </Link>
        <div className="glow-card p-8">
          <h1 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-accent" required minLength={6} />
            </div>
            {message && <p className={`text-sm ${message.includes('Check') ? 'text-success' : 'text-danger'}`}>{message}</p>}
            <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-light text-white py-2.5 rounded-lg font-medium disabled:opacity-50">
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <p className="text-sm text-muted text-center mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-accent hover:underline">{isLogin ? 'Sign up' : 'Sign in'}</button>
          </p>
        </div>
      </div>
    </div>
  );
}
