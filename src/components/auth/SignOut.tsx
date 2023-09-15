'use client';
import React from 'react';

import { signOut } from 'next-auth/react';

import useSessionStore from '@/store/session.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { useDialog } from '../common';

export const SignOut = () => {
  const { Alert } = useDialog();
  const { signOut: signOutStore } = useSessionStore();

  const signOutHandler = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    await Alert('로그아웃이 완료되었습니다.');
    await signOut({ callbackUrl: '/' });
    signOutStore();
  };

  return (
    <div>
      <button onClick={signOutHandler} className="text-sub6 flex gap-2 text-lg font-medium">
        로그아웃
      </button>
    </div>
  );
};
