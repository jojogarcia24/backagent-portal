import type { ReactNode } from 'react';
import ProtectedShell from '@/components/ProtectedShell';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: ReactNode }) {
  return <ProtectedShell>{children}</ProtectedShell>;
}
