'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { OverlayProvider } from '@/components/common/Dialog';

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient({
  defaultOptions: {
    // react-query 전역 설정
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={client}>
      <OverlayProvider>{children}</OverlayProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default Providers;
