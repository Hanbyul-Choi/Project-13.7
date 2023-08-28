'use client';
import React from 'react';

import Image from 'next/image';

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
  async function signInWithSocial() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: social,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) {
      console.log(error);
    }
  }

  return (
    <button className={`${social === 'google' ? 'p-[12px] bg-sub3 ' : 'p-[10px] bg-[#FFEB3B]'} rounded-lg`} onClick={signInWithSocial}>
      <Image src={icons[social]} alt={`${social} login`} />
    </button>
  );
}
