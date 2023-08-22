import React from 'react';

import Link from 'next/link';

export default function Header() {
  return (
    <div className="w-full sticky top-0 h-20 bg-gray-400 flex gap-10 items-center z-10">
      <Link href="/">Home</Link>
      <Link href="/idea">Idea</Link>
      <Link href="/idea/post">IdeaPost</Link>
      <Link href="/idea/1">IdeaDetail</Link>
      <Link href="/challenge/1">Main Challenge Detail</Link>
      <Link href="/challenge/certify">Challenge Certify</Link>
      <Link href="/challenge/certify/1">Challenge Certify Detail</Link>
      <Link href="/challenge/certify/post">Challenge Certify post</Link>
    </div>
  );
}
