'use client';
import React from 'react';

import { supabase } from '../../../supabase/supabaseConfig';
import Button from '../common/Button';

export const SignOut = () => {
  const signOutHandler = async () => {
    await supabase.auth.signOut();
    alert('로그아웃이 완료되었습니다.');
  };

  return (
    <div>
      <Button onClick={signOutHandler}>로그아웃</Button>
    </div>
  );
};
