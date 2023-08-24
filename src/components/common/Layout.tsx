import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col max-w-[75rem] mx-auto">{children}</div>;
}
