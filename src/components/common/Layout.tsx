import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col max-w-[77rem] mx-auto p-4">{children}</div>;
}
