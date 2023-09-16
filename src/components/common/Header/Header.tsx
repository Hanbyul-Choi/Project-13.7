'use client';
import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineAlignRight, AiOutlineClose } from 'react-icons/ai';

import useLogin from './useLogin';
import { Layout } from '..';
import logoTitle from '../../../../public/logo/logo-title.svg';
import logo from '../../../../public/logo/logo.svg';
import { Auth, SignOut } from '../../auth';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const params = usePathname();

  const { isLoaded, session } = useLogin();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="w-full sticky top-0 bg-white text-black text-lg z-20">
        <Layout>
          <div className="md:flex items-center justify-between hidden px-10 py-8 md:px-4">
            <div className="flex gap-8">
              <Link href="/" className="flex font-semibold gap-2">
                <Image src={logo} alt="logo" style={{ width: '80px', height: 'auto' }} />
                <Image src={logoTitle} alt="logo title" style={{ width: '145px', height: 'auto' }} />
              </Link>
              <nav className="flex gap-3 ml-4 lg:gap-8 lg:ml-8">
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
