'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ContentProvider } from '@/components/ContentProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ContentProvider>{children}</ContentProvider>
    </SessionProvider>
  );
}
