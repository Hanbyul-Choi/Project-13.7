'use client';
import React from 'react';

import Image from 'next/image';

import googleSignin from '../../../../public/social/google.svg';
import { supabase } from '../../../../supabase/supabaseConfig';

export default function GoogleSignIn() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.log(error);
    }
    console.log(data);
  }

  return (
    <button className="p-[12px] bg-sub3 rounded-lg" onClick={signInWithGoogle}>
      <Image src={googleSignin} alt="google login" />
    </button>
  );
}
