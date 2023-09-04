import React, { useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Input, Label, useDialog } from '../common';
import Modal from '../common/Modal';

export default function JoinChallengeModal() {
  const { session } = useSessionStore(state => state);
  const queryClient = useQueryClient();

  const { Alert } = useDialog();
  const { mainCloseModal } = useModalStore(state => state);
  const [userData, setUserData] = useState<UpdateUserData>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
    rank: 0,
    phone: '',
  });

  const { data: mainChallenge } = useQuery({ queryKey: ['mainChallenge'], queryFn: mainChallengeCheck });

  const onClickJoinChallenge = async () => {
    if (!session) {
      Alert('챌린지에 참여하려면 로그인이 필요합니다.');
      mainCloseModal();
      return;
    }

    try {
      const updatedPoint = session.point - 25;

      setUserData(prev => ({ ...prev, point: updatedPoint }));
      const { error: updateError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session.user_id);
      if (updateError) {
        console.error('데이터 업데이트 오류:', updateError);
        return;
      }

      if (!mainChallenge) return;
      await supabase.from('joinChallenge').insert({ user_id: session.user_id, challenge_id: mainChallenge.challenge_Id });

      const { error: userDataUpdateError } = await supabase
        .from('users')
        .update({ ...userData, point: updatedPoint })
        .eq('user_id', session.user_id);
      if (userDataUpdateError) {
        console.error('사용자 데이터 업데이트 오류:', userDataUpdateError);
        return;
      }
      Alert('챌린지 참여신청이 완료되었습니다!', '참여 인증페이지에서 활동을 인증하고 지구 온도를 지켜주세요!');
      mainCloseModal();
      redirect('/');
    } catch (error) {
      console.error('데이터 전송 오류', error);
    }
  };

  const handleCancelClick = () => {
    mainCloseModal();
  };

  return (
    <Modal>
      <form>
        <h5 className="mb-8">주문자 정보</h5>
        <div className="flex">
          <Label name="name" size="base" labelStyle="flex flex-col leading-[150%]">
            이름
            <input
              value={userData.nickname || ''}
              onChange={e => setUserData(prev => ({ ...prev, nickname: e.target.value }))}
              className="rounded-lg font-normal text-base border border-opacityblack outline-none mt-[8px] w-[9.375rem] h-[1.375rem] py-2 px-6 box-content"
            />
          </Label>
          <Label name="phoneNumber" size="base" labelStyle="flex flex-col leading-[150%] ml-4">
            연락처
            <input
              value={userData.phone || ''}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              className="rounded-lg font-normal text-base border border-opacityblack outline-none mt-[8px] w-[16.31rem] h-[1.375rem] py-2 px-6 box-content"
            />
          </Label>
        </div>
        <Label name="mail" size="base" labelStyle="flex flex-col leading-[150%] mt-6">
          이메일
          <Input value={userData.email || ''} onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} _size={'lg'} />
        </Label>
      </form>
      <form className="my-10 flex flex-col">
        <h5 className="mb-8">배송지 정보</h5>
        <Label name="delivery" size={'base'} labelStyle="flex flex-col leading-[150%]">
          상세 주소
        </Label>
        <input
          type="text"
          value={userData.address || ''}
          onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))}
          className="rounded-lg font-normal text-base border border-opacityblack outline-none my-[8px] w-[23.56rem] h-[1.375rem] py-2 px-6 box-content"
        />
        <div className="flex text-sm">
          <input type="checkbox" className="mr-[8px]" /> 위 배송지를 기본 배송지로 저장합니다.
        </div>
      </form>
      <hr className="border border-[#E6E6E6] w-full" />
      <div className="my-10">
        <label htmlFor="paymentMethod" className="font-bold leading-[150%] ">
          결제 방식
        </label>
        <div className="flex items-center text-sm leading-[150%] mt-[12px]">
          <input type="radio" id="paymentMethod" className="mr-[8px]" checked />
          포인트 결제
        </div>
        <p className="leading-[150%] my-[16px]">
          <span className="font-bold ">보유중인 나무 :</span>
          {`${session?.point} 그루`}
        </p>
        <p className="leading-[150%]">
          <span className="font-bold leading-[150%]">배송비 :</span> 무료
        </p>
      </div>
      <hr className="border border-[#E6E6E6] w-full mb-[1.25rem]" />
      <div className="flex justify-between w-full">
        <p className="leading-[150%]">총 결제 나무 :</p>
        <p className="text-lg font-bold leading-[140%]">25그루</p>
      </div>
      <div className="flex gap-2 justify-center mt-8 w-full">
        <Button type="submit" onClick={onClickJoinChallenge} btnType={'primary'}>
          참여 신청하기
        </Button>
        <Button btnType={'borderBlack'} size={'small'} onClick={handleCancelClick}>
          취소
        </Button>
      </div>
    </Modal>
  );
}

type UpdateUserData = {
  rank: number;
  address: string | null;
  email: string;
  nickname: string;
  point: number;
  phone: string | null;
};
