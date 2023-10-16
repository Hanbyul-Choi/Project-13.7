import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { defaultAddressCheck, insertJoinChallenge, updateUserPoint } from '@/app/api/join-challenge';
import { mainChallengeCheck } from '@/app/api/main-challenge';
import { MAIN_CHALLENGE } from '@/app/shared/queries.keys';
import { useModalStore } from '@/store/modal.store';

import { useDialog } from '../common';

import type { UpdateUserData } from './JoinChallengeModal';
import type { User } from '@/types/db.type';
import type { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

export default function useJoinChallenge(
  session: User | null,
  userData: UpdateUserData,
  handleSubmit: UseFormHandleSubmit<UpdateUserData, undefined>,
) {
  const route = useRouter();
  const { Alert } = useDialog();
  const { mainCloseModal } = useModalStore(state => state);
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const {
    isLoading: mainChallengeLoading,
    isError: mainChallengeError,
    data: mainChallenge,
  } = useQuery({ queryKey: [MAIN_CHALLENGE], queryFn: mainChallengeCheck });

  const handleDefaultAddress = () => {
    setIsDefaultAddress(!isDefaultAddress);
  };

  let timerId: null | NodeJS.Timeout = null;
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);
  const debounce = (delay: number) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      handleSubmit(onClickJoinChallenge)();
      timerId = null;
    }, delay);
  };

  const onClickJoinChallenge: SubmitHandler<UpdateUserData> = async data => {
    if (!session) {
      Alert('챌린지에 참여하려면 로그인이 필요합니다.');
      mainCloseModal();
      return;
    }

    try {
      const updatedPoint = session.point - 25;
      updateUserPoint(updatedPoint, session);

      if (!mainChallenge) return;

      insertJoinChallenge(session, mainChallenge, data);

      if (isDefaultAddress) {
        defaultAddressCheck(userData, data, updatedPoint, session);
      }
      await Alert('챌린지 참여신청이 완료되었습니다!', '참여 인증페이지에서 활동을 인증하고 지구 온도를 지켜주세요!');
      route.push('/challenge/certify');
      mainCloseModal();
    } catch (error) {
      console.error('데이터 전송 오류', error);
    }
  };
  const handleCancelClick = () => {
    mainCloseModal();
  };
  return { debounce, handleDefaultAddress, handleCancelClick, mainChallengeLoading, mainChallengeError };
}
