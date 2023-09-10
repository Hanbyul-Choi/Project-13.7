import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-full mx-auto p-4 md:max-w-[77rem]">{children}</div>;
}
