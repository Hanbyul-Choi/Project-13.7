'use client';
import React, { useState } from 'react';

import { Button, useDialog } from '@/components/common';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store.';

import JoinChallengeModal from './JoinChallengeModal';

export default function JoinChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const { openModal } = useModalStore(state => state);
  const [modalType, setModalType] = useState('');
  const { Alert } = useDialog();

  const joinChallengeModalHandler = () => {
    if (session?.user) {
      setModalType('reviews');
      openModal();
    } else {
      Alert('로그인하세요');
    }
  };

  return (
    <>
      <div>JoinChallenge</div>
      <Button onClick={joinChallengeModalHandler} btnType={'primary'}>
        챌린지 참여하기
      </Button>
      <JoinChallengeModal modalType={modalType} />
    </>
  );
}
