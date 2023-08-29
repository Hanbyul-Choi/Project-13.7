'use client';
import React, { useEffect, useState } from 'react';

import { loadMainChallenge } from '@/app/api/challenge-certify';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import UploadReviewModal from './UploadReviewModal';
import { supabase } from '../../../supabase/supabaseConfig';
import { Button, useDialog } from '../common';

export function CertifyPost() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const [joinChallenge, setJoinChallenge] = useState<[]>([]);

  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);

  const [modalType, setModalType] = useState('');
  const { Alert } = useDialog();

  // mainChallenge Data Check
  const [mainChallenge, setMainChallenge] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await loadMainChallenge();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  // userJoinChallenge Data Check
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

  const onClickUploadReview = () => {
    if (joinChallenge.length === 0) {
      Alert('챌린지에 참여신청을 먼저 해주세요');
    } else if (session?.user) {
      setModalType('reviews');
      mainOpenModal();
    } else {
      Alert('로그인하세요');
    }
  };

  return (
    <>
      <Button onClick={onClickUploadReview} btnType={'primary'} size="small">
        인증하기
      </Button>
      {isOpenMainModal && <UploadReviewModal modalType={modalType} />}
    </>
  );
}
