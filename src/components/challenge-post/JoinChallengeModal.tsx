import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { getUser } from '@/app/api/users';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Label, useDialog } from '../common';
import Modal from '../common/Modal';

import type { SubmitHandler } from 'react-hook-form';

export default function JoinChallengeModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({ mode: 'onChange' });
  const { session } = useSessionStore(state => state);
  const route = useRouter();
  const { Alert } = useDialog();
  const { mainCloseModal } = useModalStore(state => state);
  const { isLoading, isError, data: userInfoData } = useQuery(['user'], () => getUser(session!.user_id));
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [userData, setUserData] = useState<UpdateUserData>({
    address: '',
    point: 0,
    rank: 0,
    phone: '',
    name: '',
  });

  useEffect(() => {
    setUserData({ address: userInfoData?.address || '', point: 0, rank: 0, phone: userInfoData?.phone || '', name: userInfoData?.name || '' });
  }, [userInfoData]);

  const handleDefaultAddress = () => {
    setIsDefaultAddress(!isDefaultAddress);
  };

  const { data: mainChallenge } = useQuery({ queryKey: ['mainChallenge'], queryFn: mainChallengeCheck });

  const onClickJoinChallenge: SubmitHandler<UpdateUserData> = async data => {
    if (!session) {
      Alert('챌린지에 참여하려면 로그인이 필요합니다.');
      mainCloseModal();
      return;
    }

    try {
      const updatedPoint = session.point - 25;
      setUserData(prev => ({ ...prev, ...data, point: updatedPoint }));
      const { error: updateError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session.user_id);
      if (updateError) {
        console.error('데이터 업데이트 오류:', updateError);
        return;
      }
      if (!mainChallenge) return;
      await supabase.from('joinChallenge').insert({ user_id: session.user_id, challenge_id: mainChallenge.challenge_Id, address: data.address });

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

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>에러입니다...</div>;
  }

  return (
    <Modal>
      <form className="my-[30px]">
        <h5 className="mb-8">신청자 정보</h5>
        <div className="flex flex-col sm:flex-row">
          <Label name="name" size="base" labelStyle="flex flex-col leading-[150%]">
            이름
            <input
              readOnly={userInfoData?.name ? true : false}
              defaultValue={userData.name || ''}
              // onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className={`${userInfoData?.name ? 'bg-[#f4f6f8;]' : 'bg-white'} rounded-lg font-normal text-base border border-opacityblack outline-none w-[200px] sm:w-[9.375rem] h-[1.375rem] py-2 px-6 box-content sm:mt-[8px]`}
              {...register('name', { required: '이름은 필수 입력사항입니다.' })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </Label>
          <Label name="phoneNumber" size="base" labelStyle="flex leading-[150%] mt-[8px] flex-col sm:ml-4 sm:mt-0">
            연락처
            <input
              placeholder="ex)010-1234-5678"
              defaultValue={userData.phone || ''}
              // onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              className="rounded-lg font-normal text-base border border-opacityblack outline-none ml-0 w-[200px] h-[1.375rem] py-2 px-6 box-content sm:mt-[8px] sm:w-[16.31rem]"
              {...register('phone', {
                required: '휴대폰 번호는 필수 입력사항입니다.',
                // minLength: { value: 8, message: '휴대폰 번호 형식에 맞지 않습니다.' },
                pattern: { value: /^[0-9-]+$/, message: "숫자와 '-'만 입력해주세요. ex)010-1234-5678" },
              })}
            />
            {errors.phone && <p className="text-sm text-nagative">{errors.phone.message}</p>}
          </Label>
        </div>
        <div className="my-10 flex flex-col">
          <div className="mb-8 flex flex-col sm:items-center sm:flex-row">
            <h5>배송지 정보</h5>
            <p className="text-sm sm:ml-[15px]">챌린지 관련 물품이 있을 시 배송받으실 주소를 입력해주세요.</p>
          </div>
          <Label name="delivery" size={'base'} labelStyle="flex flex-col leading-[150%] ">
            상세 주소
          </Label>
          <textarea
            defaultValue={userData.address || ''}
            // onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))}
            className="rounded-lg font-normal text-base border border-opacityblack outline-none my-[8px] w-[200px] h-[80px] py-2 px-6 box-content resize-none sm:w-[23.56rem] sm:h-[1.5rem]"
            {...register('address', { required: '상세주소는 필수 입력사항입니다.' })}
          />
          {errors.address && <p className="text-sm text-nagative">{errors.address.message}</p>}
          <div className="flex text-sm">
            <input type="checkbox" className="mr-[8px]" onChange={handleDefaultAddress} defaultChecked /> 위 배송지를 기본 배송지로 저장합니다.
          </div>
        </div>

        <hr className="border border-[#E6E6E6] w-full" />
        <div className="my-10">
          <label htmlFor="paymentMethod" className="font-bold leading-[150%] ">
            결제 방식
          </label>
          <div className="flex items-center text-sm leading-[150%] mt-[12px]">
            <input type="radio" id="paymentMethod" className="mr-[8px]" defaultChecked />
            포인트 결제
          </div>
          <p className="leading-[150%] my-[16px]">
            <span className="font-bold ">보유중인 나무 : </span>
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
          <Button type="submit" onClick={handleSubmit(onClickJoinChallenge)} btnType={'primary'}>
            참여 신청하기
          </Button>
          <Button btnType={'borderBlack'} size={'small'} onClick={handleCancelClick}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
}

type UpdateUserData = {
  rank: number;
  address: string | null;
  point: number;
  phone: string | null;
  name: string | null;
};
