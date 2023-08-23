'use client';
import React, { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import useSessionStore from '@/store';

import { supabase } from '../../../supabase/supabaseConfig';

import type { Props } from '@/types/PropsType';

type UserProfile = {
  address: string | null;
  email: string;
  nickname: string;
  point: number;
};

export default function Page({ params: { slug } }: Props) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
  });

  const session = useSessionStore((state: { session: any }) => state.session);
  // console.log(session?.user.id);

  const loadUserInfo = async () => {
    let { data: users } = await supabase.from('users').select('*').eq('user_id', session?.user.id);
    console.log('Users:', users);

    if (users && users.length > 0) {
      const user = users[0];
      setUserProfile({
        address: user.address,
        email: user.email,
        nickname: user.nickname,
        point: user.point,
      });
    }
  };

  const loadUserChallenges = async () => {
    let { data: challenges } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`).eq('user_id', session?.user.id);
    console.log('Challenges:', challenges);
  };

  const loadUserReviews = async () => {
    let { data: reviews } = await supabase.from('reviews').select('*').eq('user_id', session?.user.id);
    console.log('Reviews:', reviews);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadUserInfo();
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserChallenges();
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserReviews();
    };

    fetchData();
  }, [session]);

  return (
    <div>
      <div>
        {slug}
        <h1>My Page</h1>
        <p>Nickname: {userProfile.nickname}</p>
        <p>Email: {userProfile.email}</p>
      </div>
      <p>내 뱃지</p>
      <div>
        <p>현재 나무 총{userProfile.point}그루</p>
        <Button btnType={'green'} size={'medium'}>
          나무 충전하기
        </Button>
      </div>
      <div>{}</div>
    </div>
  );
}
