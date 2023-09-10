'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineAlignRight, AiOutlineClose } from 'react-icons/ai';

import { getUser } from '@/app/api/users';
import useSessionStore from '@/store/sesson.store';

import logoTitle from '../../../public/logo/logo-title.svg';
import logo from '../../../public/logo/logo.svg';
import { supabase } from '../../../supabase/supabaseConfig';
import { Auth, SignOut } from '../auth';

import { Layout } from '.';

export function Header() {
  const { session, isLoaded, setSession } = useSessionStore();
  const params = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const refresh = async () => {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');
      if (access_token && refresh_token) {
        const { data } = await supabase.auth.setSession({ access_token, refresh_token });
        if (!data) return setSession(null);
        const session = data.session;
        const user_id = session?.user.id!;
        const userData = await getUser(user_id);
        setSession(userData);
      } else {
        setSession(null);
      }
    };
    refresh();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const access_token = session.access_token;
      const refresh_token = session.refresh_token;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      const user_id = session?.user.id;
      const userData = await getUser(user_id);
      if (!userData) {
        const { email, name: nickname, avatar_url: profile_img } = session?.user.user_metadata;
        const { data } = await supabase.from('users').insert({ user_id, email, nickname, profile_img });
        setSession(data);
      } else {
        setSession(userData);
      }
    });
  }, []);
  return (
    <>
      <div className="w-full sticky top-0 bg-white text-black text-lg z-10">
        <Layout>
          <div className="md:flex items-center justify-between hidden px-10 py-8">
            <div className="flex gap-8">
              <Link href="/" className="flex font-semibold gap-2">
                <Image src={logo} alt="logo" />
                <Image src={logoTitle} alt="logo title" />
              </Link>
              <nav className="flex gap-8 ml-8">
                {navCategory.map(item => (
                  <Link href={item.pathname} className="text-sub6" key={item.title}>
                    <h5 className={`${params === item.pathname ? 'text-black' : ''} font-semibold `}>{item.title}</h5>
                  </Link>
                ))}
              </nav>
            </div>
            {isLoaded && (
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
            )}
          </div>
        </Layout>
      </div>

      <div className="w-full sticky top-0 px-4 pb-4 bg-white text-sub6 text-lg z-10 font-medium md:hidden shadow-sm justify-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex font-semibold gap-2" onClick={closeMobileMenu}>
            <Image src={logo} alt="logo" />
            <Image src={logoTitle} alt="logo title" />
          </Link>
          <button className="font-bold text-xl relative text-right justify-end" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <AiOutlineClose size={30} /> : <AiOutlineAlignRight size={30} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <nav className="overflow-y-auto flex flex-col py-10 gap-8 ml-4 justify-center">
              {navCategory.map(item => (
                <Link href={item.pathname} className="text-sub6 text-left" key={item.title} onClick={closeMobileMenu}>
                  <h5 className={`${params === item.pathname ? 'text-black' : ''} font-semibold `}>{item.title}</h5>
                </Link>
              ))}
            </nav>
            {isLoaded && (
              <div className="flex flex-col py-4 gap-4 ml-4 justify-center mb-4" onClick={closeMobileMenu}>
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
            )}
          </div>
        )}
      </div>
    </>
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
    pathname: '/nature-story?category=all',
  },
];
