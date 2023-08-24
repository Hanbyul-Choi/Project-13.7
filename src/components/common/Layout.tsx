import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col max-w-screen-[75rem] max-w-[1200px] mx-auto">{children}</div>;
}
