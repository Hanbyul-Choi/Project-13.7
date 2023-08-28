'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import useSessionStore from '@/store/sesson.store.';

import { supabase } from '../../../supabase/supabaseConfig';
import { useDialog } from '../common/Dialog';

export const SignOut = () => {
  const { Alert } = useDialog();
  const { signOut } = useSessionStore();
  const router = useRouter();

  const signOutHandler = async () => {
    await supabase.auth.signOut();
    signOut();
    await Alert('로그아웃이 완료되었습니다.');
    router.push('/');
  };

  return (
    <div>
      <button onClick={signOutHandler} className="text-sub6 flex gap-2 text-lg font-medium">
        로그아웃
      </button>
    </div>
  );
};
