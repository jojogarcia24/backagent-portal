'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODE = process.env.NEXT_PUBLIC_AUTH_MODE ?? 'token';

export default function Transact() {
  const r = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (MODE === 'token') {
      const has = typeof window !== 'undefined' && localStorage.getItem('token');
      if (!has) { r.replace('/login'); return; }
    }
    setReady(true);
  }, [r]);

  if (!ready) return null;

  return (
    <main className="p-6">
      Transact (guarded).{' '}
      <button onClick={async () => {
        localStorage.removeItem('token');       // no-op in cookie mode
        await fetch('/api/logout', { method: 'POST' }).catch(() => {});
        r.replace('/login');
      }}>
        Sign out
      </button>
    </main>
  );
}
