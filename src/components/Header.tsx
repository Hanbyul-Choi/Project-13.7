'use client';
import React, { useEffect } from 'react';

import Link from 'next/link';

import useSessionStore from '@/store';

import { Auth, SignOut } from './auth';
import { supabase } from '../../supabase/supabaseConfig';

export default function Header() {
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);

  // console.log(session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return (
    <div className="w-full sticky top-0 h-20 bg-white text-black flex items-center justify-evenly px-10 text-lg">
      <div className="flex gap-8">
        <Link href="/">LOGO</Link>
      </div>
      <div className="flex gap-8">
        <Link href="/challenge/certify">이달의 챌린지</Link>
        <Link href="/idea">다음 챌린지</Link>
        <Link href="/challenge/certify">참여 인증</Link>
        <Link href="/">환경이야기</Link>
      </div>

      <div className="flex gap-4 text-base">
        {session ? (
          <>
            <Link href="/mypage">마이페이지</Link>
            <SignOut />
          </>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
}
