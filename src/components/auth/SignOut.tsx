'use client';
import React from 'react';

import { supabase } from '../../../supabase/supabaseConfig';
import { useDialog } from '../common/Dialog';

export const SignOut = () => {
  const { Alert } = useDialog();

  const signOutHandler = async () => {
    await supabase.auth.signOut();
    Alert('로그아웃이 완료되었습니다.');
  };

  return (
    <div>
      <button onClick={signOutHandler}>로그아웃</button>
    </div>
  );
};
