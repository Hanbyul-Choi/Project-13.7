'use client';
import React from 'react';

import Image from 'next/image';

import kakaoSignin from '../../../../public/social/kakao.svg';
import { supabase } from '../../../../supabase/supabaseConfig';

export default function KakaoSignIn() {
  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) {
      console.log(error);
    }
    console.log(data);
  }

  return (
    <button formAction="/auth/kakaoSignIn" formMethod="POST" className="p-[10px] bg-[#FFEB3B] rounded-lg" onClick={signInWithKakao}>
      <Image src={kakaoSignin} alt="Kakao login" />
    </button>
  );
}
