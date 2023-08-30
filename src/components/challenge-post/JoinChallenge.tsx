'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { loadMainChallenge } from '@/app/api/challenge-certify';
import { Button, useDialog } from '@/components/common';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import JoinChallengeModal from './JoinChallengeModal';
import { supabase } from '../../../supabase/supabaseConfig';

export default function JoinChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const [joinChallenge, setJoinChallenge] = useState<[]>([]);
  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);
  const { Alert } = useDialog();

  const joinChallengeModalHandler = () => {
    if (session?.user) {
      mainOpenModal();
    } else {
      Alert('로그인하세요');
    }
  };
  const [mainChallenge, setMainChallenge] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await loadMainChallenge();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  console.log('mainChallenge data:', mainChallenge.challenge_Id);
  // userJoinChallengeDataCheck
  const userJoinChallengeCheck = async () => {
    let { data: joinChallenge } = await supabase.from('joinChallenge').select('*').eq('user_id', session?.user.id).eq('challenge_id', mainChallenge.challenge_Id);

    if (joinChallenge) {
      setJoinChallenge(joinChallenge);
    }
  };
  console.log('joinChallenge data check:', joinChallenge);

  useEffect(() => {
    const fetchData = async () => {
      await userJoinChallengeCheck();
    };
    fetchData();
  }, [session]);

  return (
    <>
      <div>
        {joinChallenge.length > 0 ? (
          <Button btnType={'primary'}>
            <Link href={'/challenge/certify'}>인증하러 가기</Link>
          </Button>
        ) : (
          <Button onClick={joinChallengeModalHandler} btnType={'primary'}>
            참여 신청하기
          </Button>
        )}
        {isOpenMainModal && <JoinChallengeModal />}
      </div>
    </>
  );
}
