'use client';
import React, { useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Auth, SignOut } from '../auth';

import { Layout } from '.';

export function Header() {
  const { session, setSession } = useSessionStore();
  const params = usePathname();

  const refresh = async () => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) {
      const { data } = await supabase.auth.setSession({ access_token, refresh_token });
      const session = data.session;
      setSession(session);
    }
  };
  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      setSession(session);

      const access_token = session.access_token;
      const refresh_token = session.refresh_token;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      const user_id = session?.user.id;
      await supabase.from('users').select('user_id').eq('user_id', user_id);

      const { email, name: nickname, avatar_url: profile_img } = session?.user.user_metadata;
      const { error } = await supabase.from('users').insert({ user_id, email, nickname, profile_img });
      if (error) {
        console.log('이미 등록된 유저');
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

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
            {navCategory.map(item => (
              <Link href={item.pathname} className="text-sub6" key={item.title}>
                <h5 className={`${params === item.pathname ? 'text-black' : ''} font-semibold `}>{item.title}</h5>
              </Link>
            ))}
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

const navCategory = [
  {
    title: '이달의 챌린지',
    pathname: '/challenge',
  },
  {
    title: '다음 챌린지',
    pathname: '/idea',
  },
  {
    title: '참여 인증',
    pathname: '/challenge/certify',
  },
  {
    title: '환경 이야기',
    pathname: '/naturestory',
  },
];
