'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { userJoinChallengeCheck } from '@/app/api/join-challenge';
import { mainChallengeCheck } from '@/app/api/main-challenge';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import JoinChallengeModal from './JoinChallengeModal';
import { Button, useDialog } from '../common';

export default function JoinChallenge() {
  const { session } = useSessionStore();
  const route = useRouter();
  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);
  const { Alert } = useDialog();
  const { data: mainChallenge } = useQuery({ queryKey: ['mainChallenge'], queryFn: mainChallengeCheck });
  const { data: joinChallenge } = useQuery({ queryKey: ['joinChallenge'], queryFn: () => userJoinChallengeCheck(session?.user_id!, mainChallenge?.challenge_Id!) });

  const joinChallengeCurrentPoint = () => {
    if (!session || session?.point === null || session?.point < 25) {
      return Alert('포인트가 부족하여 신청할 수 없습니다.', '마이페이지를 통해 포인트 얻는 법을 확인해주세요!');
    }
    mainOpenModal();
  };

  const joinChallengeModalHandler = () => {
    if (session) {
      joinChallengeCurrentPoint();
    } else {
      Alert('로그인하세요');
    }
  };

  const onClickToCertifyPage = () => {
    route.push('/challenge/certify');
  };

  return (
    <>
      <div>
        {joinChallenge ? (
          <>
            <div className="text-center flex flex-col text-blue">
              <p className="my-8">참여 신청이 완료되었습니다!</p>
              <Button onClick={onClickToCertifyPage} btnType={'primary'}>
                인증하러 가기
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center flex flex-col">
              <Button onClick={joinChallengeModalHandler} btnType={'primary'}>
                참여 신청하기
              </Button>
            </div>
          </>
        )}
        {isOpenMainModal && <JoinChallengeModal />}
      </div>
    </>
  );
}
