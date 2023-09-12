import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { MAIN_CHALLENGE } from '@/app/shared/queries.keys';
import { useModalStore } from '@/store/modal.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { useDialog } from '../common';

import type { UpdateUserData } from './JoinChallengeModal';
import type { User } from '@/types/db.type';
import type { SubmitHandler } from 'react-hook-form';

export default function useJoinChallenge(session: User | null, userData: UpdateUserData) {
  const route = useRouter();
  const { Alert } = useDialog();
  const { mainCloseModal } = useModalStore(state => state);
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const { data: mainChallenge } = useQuery({ queryKey: [MAIN_CHALLENGE], queryFn: mainChallengeCheck });

  const handleDefaultAddress = () => {
    setIsDefaultAddress(!isDefaultAddress);
  };
  const onClickJoinChallenge: SubmitHandler<UpdateUserData> = async data => {
    if (!session) {
      Alert('챌린지에 참여하려면 로그인이 필요합니다.');
      mainCloseModal();
      return;
    }

    try {
      const updatedPoint = session.point - 25;
      const { error: updateError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session.user_id);
      if (updateError) {
        console.error('데이터 업데이트 오류:', updateError);
        return;
      }
      if (!mainChallenge) return;

      await supabase
        .from('joinChallenge')
        .insert({ user_id: session.user_id, challenge_id: mainChallenge.challenge_Id, address: data.address, name: data.name, phone: data.phone });

      if (isDefaultAddress) {
        const { error: userDataUpdateError } = await supabase
          .from('users')
          .update({ ...userData, ...data, point: updatedPoint })
          .eq('user_id', session.user_id);
        if (userDataUpdateError) {
          console.error('사용자 데이터 업데이트 오류:', userDataUpdateError);
          return;
        }
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
  return { onClickJoinChallenge, handleDefaultAddress, handleCancelClick };
}
