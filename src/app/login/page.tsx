'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_BASE ?? '/api';
const MODE = process.env.NEXT_PUBLIC_AUTH_MODE ?? 'token';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const r = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (MODE === 'cookie') {
        const res = await fetch(`${API}/auth/callback`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
        r.replace('/transact');
        return;
      }

      // token fallback (dev)
      const res = await fetch(`${API}/auth-issue`, { method: 'POST' });
      if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
      const data = await res.json();
      localStorage.setItem('token', data.token || 'dev-token');
      r.replace('/transact');
    } catch (err) {
      console.error(err);
      alert('Sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Back Boss Portal</h1>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 text-black"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading} className="border rounded px-3 py-2">
          {loading ? '...' : 'Sign in'}
        </button>
      </form>
      <p className="mt-4 text-sm opacity-70">
        Mode: <code>{MODE}</code> | API: <code>{API}</code>
      </p>
    </main>
  );
}
