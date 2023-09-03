'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import UploadReviewModal from './UploadReviewModal';
import { supabase } from '../../../supabase/supabaseConfig';
import { Button, useDialog } from '../common';

export function CertifyPost() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const [mainChallenge, setMainChallenge] = useState<{ challenge_Id: string } | null>();
  const [joinChallenge, setJoinChallenge] = useState<any>();

  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);

  const route = useRouter();
  const { Alert, Confirm } = useDialog();

  // userJoinChallenge Data Check
  const userJoinChallengeCheck = async () => {
    let { data: joinChallenge } = await supabase.from('joinChallenge').select('*').eq('user_id', session?.user_id).eq('challenge_id', mainChallenge?.challenge_Id);

    if (joinChallenge) {
      setJoinChallenge(joinChallenge);
    }
  };

  // mainChallenge Data Check
  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await mainChallengeCheck();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await userJoinChallengeCheck();
    };

    if (mainChallenge) {
      fetchData();
    }
  }, []);

  const onClickUploadReview = () => {
    if (session) {
      mainOpenModal();
    } else {
      Alert('로그인이 필요합니다');
    }
  };

  const onClickUploadReviewFalseConfirm = async () => {
    const confirmed = await Confirm('챌린지에 먼저 참여해주세요. 인증에 필요한 굿즈를 보내드립니다 :)');
    if (confirmed) {
      route.push('/challenge');
    } else {
      route.push('/challenge/certify');
    }
  };

  return (
    <>
      {joinChallenge ? (
        <Button onClick={onClickUploadReview} btnType={'primary'} size="small">
          인증하기
        </Button>
      ) : (
        <Button onClick={onClickUploadReviewFalseConfirm} btnType={'primary'} size="small">
          챌린지 인증하기
        </Button>
      )}

      {isOpenMainModal && <UploadReviewModal />}
    </>
  );
}
