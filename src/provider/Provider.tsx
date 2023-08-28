'use client';

import React from 'react';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { OverlayProvider } from '@/components/common/Dialog';

import type { Session } from 'next-auth';

type Props = {
  children: React.ReactNode;
  session: Session;
};

function Providers({ children, session }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    }),
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <OverlayProvider>{children}</OverlayProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers;
