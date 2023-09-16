'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { userJoinChallengeCheck } from '@/app/api/join-challenge';
import { JOIN_CHALLENGE } from '@/app/shared/queries.keys';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/session.store';

import JoinChallengeModal from './JoinChallengeModal';
import { Button, useDialog } from '../common';

import type { Tables } from '@/types/supabase.type';

interface Props {
  mainChallenge: Tables<'mainChallenge'>;
}

export default function JoinChallenge({ mainChallenge }: Props) {
  const route = useRouter();
  const { session } = useSessionStore();
  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);
  const { Alert } = useDialog();
  const { data: joinChallenge } = useQuery({
    queryKey: [JOIN_CHALLENGE],
    queryFn: () => userJoinChallengeCheck(session?.user_id!, mainChallenge?.challenge_Id!),
    enabled: !!session,
  });

  const joinChallengeCurrentPoint = () => {
    if (!session || session?.point === null || session?.point < 25) {
      return Alert('나무가 부족하여 신청할 수 없습니다.', '마이페이지를 통해 나무 얻는 법을 확인해주세요!');
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
            <div className="text-center flex flex-col mt-10">
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
