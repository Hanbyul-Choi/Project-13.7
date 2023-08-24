'use client';
import React, { useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useSessionStore from '@/store';

import { Auth, SignOut } from './auth';
import Layout from './common/Layout';
import { supabase } from '../../supabase/supabaseConfig';

export default function Header() {
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  const params = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (!session) return;
      const user_id = session?.user.id;
      const { email, name: nickname, avatar_url: profile_img } = session?.user.user_metadata;
      const { error } = await supabase.from('users').insert({ user_id, email, nickname, profile_img });
      if (error) {
        console.log(error);
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return (
    <div className="w-full sticky top-0 bg-white text-black px-10 py-8 text-lg z-10">
      <Layout>
        <div className=" flex items-center justify-between">
          <div className="flex gap-8">
            <Link href="/" className="font-semibold text-2xl">
              LOGO
            </Link>
          </div>
          <nav className="flex gap-8">
            <Link href="/challenge" className="text-sub6">
              <h5 className={`${params === '/challenge' ? 'text-black' : ''} font-semibold `}>이달의 챌린지</h5>
            </Link>
            <Link href="/idea" className="text-sub6 font-semibold">
              <h5 className={`${params === '/idea' ? 'text-black' : ''} font-semibold `}>다음 챌린지</h5>
            </Link>
            <Link href="/challenge/certify" className="text-sub6 font-semibold">
              <h5 className={`${params === '/challenge/certify' ? 'text-black' : ''} font-semibold `}>참여 인증</h5>
            </Link>
            <Link href="/naturestory" className="text-sub6 font-semibold">
              <h5 className={`${params === '/column' ? 'text-black' : ''} font-semibold `}>환경 이야기</h5>
            </Link>
          </nav>
          <div className="flex gap-4 text-base">
            {session ? (
              <>
                <Link href="/mypage" className={`${params === '/mypage' ? 'text-black' : 'text-sub6'} flex gap-2 text-lg font-medium`}>
                  마이페이지
                </Link>
                <SignOut />
              </>
            ) : (
              <Auth />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
