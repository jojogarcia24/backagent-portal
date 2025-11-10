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
          credentials: 'include',
        });
        const text = await res.text().catch(()=>'');
        if (!res.ok) throw new Error(`Auth failed ${res.status}: ${text}`);
        r.replace('/transact');
        return;
      }

      // token-mode (dev fallback)
      const res = await fetch(`${API}/auth-issue`, { method: 'POST' });
      const text = await res.text().catch(()=>'');
      if (!res.ok) throw new Error(`Auth failed ${res.status}: ${text}`);
      const data = JSON.parse(text || '{}');
      localStorage.setItem('token', data.token || 'dev-token');
      r.replace('/transact');
    } catch (err:any) {
      console.error('LOGIN_ERROR:', err?.message || err);
      alert(err?.message || 'Sign-in failed');
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
