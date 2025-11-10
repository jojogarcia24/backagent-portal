'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Build URL: strip trailing slash from base and append function name
    const base = (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/+$/, '');
    const url = `${base}/auth-callback`; // Netlify function name is "auth-callback"

    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include', // critical for cookies
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      alert(`Auth failed ${res.status}:`);
      return;
    }

    // Navigate client-side after cookie is set
    window.location.href = '/transact';
  }

  return (
    <main style={{ padding: 24, color: '#fff', background: '#000', minHeight: '100vh' }}>
      <h1>Back Boss Portal</h1>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="jojo@mail.com"
          style={{ padding: 8, width: 320 }}
        />
        <button type="submit" style={{ marginLeft: 12, padding: '8px 12px' }}>
          Sign in
        </button>
      </form>
      <p style={{ marginTop: 12, opacity: 0.8 }}>
        Mode: cookie | API: {process.env.NEXT_PUBLIC_API_BASE}
      </p>
    </main>
  );
}
