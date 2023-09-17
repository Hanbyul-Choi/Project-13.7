'use client';
import React from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import google from '../../../../public/social-signin-icon/google.svg';
import kakao from '../../../../public/social-signin-icon/kakao.svg';
import { supabase } from '../../../../supabase/supabaseConfig';

const icons = {
  google,
  kakao,
};

interface Props {
  social: 'kakao' | 'google';
}

export default function SocialSignIn({ social }: Props) {
  const pathname = usePathname();

  const getURL = (Pathname: string) => {
    let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';

    url = url.includes('http') ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === `/${Pathname}` ? url : `${url}/${Pathname}`;
    return url;
  };

  async function signInWithSocial() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: social,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${getURL(pathname)}`,
      },
    });
    if (error) {
      console.log(error);
    }
  }

  let iconStyle = '';
  switch (social) {
    case 'google':
      iconStyle = 'p-[12px] bg-sub3';
      break;
    case 'kakao':
      iconStyle = 'p-[10px] bg-[#FFEB3B]';
      break;
    default:
      break;
  }

  return (
    <button className={`${iconStyle} rounded-lg`} onClick={signInWithSocial}>
      <Image src={icons[social]} alt={`${social} login`} />
    </button>
  );
}
