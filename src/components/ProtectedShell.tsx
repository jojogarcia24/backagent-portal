'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contacts',  label: 'Contacts' },
  { href: '/deals',     label: 'Deals' },
  { href: '/settings',  label: 'Settings' },
];

export default function ProtectedShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-56 border-r border-white/10 p-4 space-y-2">
        <div className="font-bold text-lg mb-4">Back Boss</div>
        {NAV.map(i => (
          <Link
            key={i.href}
            href={i.href}
            className={`block rounded px-3 py-2 hover:bg-white/5 ${pathname.startsWith(i.href) ? 'bg-white/10' : ''}`}
          >
            {i.label}
          </Link>
        ))}
        <form
          className="mt-6"
          onSubmit={async e => {
            e.preventDefault();
            const base = (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/+$/, '');
            await fetch(`${base}/logout`, { method: 'POST', credentials: 'include' });
            window.location.href = '/login';
          }}
        >
          <button className="text-sm opacity-80 hover:opacity-100">Sign out</button>
        </form>
      </aside>
      <main className="flex-1">
        <header className="border-b border-white/10 p-4 text-sm opacity-80">Portal</header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
