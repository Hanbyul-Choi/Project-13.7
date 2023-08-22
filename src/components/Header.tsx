import React from 'react';

import Link from 'next/link';

import { SignIn, SignOut, SingUp } from './auth';

export default function Header() {
  return (
    <div className="w-full sticky top-0 h-20 bg-white text-black flex items-center justify-between px-10  text-lg">
      <div className="flex items-center gap-8">
        <Link href="/">Project 13.7</Link>
        <div className="flex items-center gap-8">
          <Link href="/challenge/certify">이달의 챌린지</Link>
          <Link href="/idea">다음 챌린지</Link>
          <Link href="/challenge/certify">참여 인증</Link>
          <Link href="/">환경이야기</Link>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <SignIn />
        <SingUp />
      </div>
      <div className="flex items-center gap-8">
        <Link href="/mypage">마이페이지</Link>
        <SignOut />
      </div>
    </div>
  );
}

{
  /* <Link href="/">Home</Link>
<Link href="/idea">Idea</Link>
<Link href="/idea/post">IdeaPost</Link>
<Link href="/idea/1">IdeaDetail</Link>
<Link href="/challenge/1">Main Challenge Detail</Link>
<Link href="/challenge/certify">Challenge Certify</Link>
<Link href="/challenge/certify/1">Challenge Certify Detail</Link>
<Link href="/challenge/certify/post">Challenge Certify post</Link> */
}
