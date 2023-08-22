'use client';
import React from 'react';

import { supabase } from '../../../supabase/supabaseConfig';

export const SignOut = () => {
  const signOutHandler = async () => {
    await supabase.auth.signOut();
    alert('로그아웃이 완료되었습니다.');
  };

  return (
    <div>
      <button onClick={signOutHandler}>로그아웃</button>
    </div>
  );
};
