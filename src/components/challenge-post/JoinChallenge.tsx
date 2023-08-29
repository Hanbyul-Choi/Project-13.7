'use client';
import React from 'react';

import { Button, useDialog } from '@/components/common';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store.';

import JoinChallengeModal from './JoinChallengeModal';

export default function JoinChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const { mainOpenModal } = useModalStore(state => state);
  const { Alert } = useDialog();

  const joinChallengeModalHandler = () => {
    if (session?.user) {
      mainOpenModal();
    } else {
      Alert('로그인하세요');
    }
  };

  return (
    <>
      <div>
        <Button onClick={joinChallengeModalHandler} btnType={'primary'}>
          챌린지 참여하기
        </Button>
        <JoinChallengeModal />
      </div>
    </>
  );
}
