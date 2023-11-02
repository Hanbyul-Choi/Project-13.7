import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BarLoader } from 'react-spinners';

import { getUser } from '@/app/api/users';
import usePostCodeStore from '@/store/post-code.store';
import useSessionStore from '@/store/session.store';

import useInputRegister from './useInputRegister';
import useJoinChallenge from './useJoinChallenge';
import { Button, Label } from '../common';
import Modal from '../common/Modal';
import PostCode from '../common/PostCode/PostCode';

export default function JoinChallengeModal() {
  const [isPostCodeOpen, setIsPostCodeOpen] = useState<Boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserData>({ mode: 'onChange' });
  const { session } = useSessionStore(state => state);

  const { isLoading: userLoading, isError: userError, data: userInfoData } = useQuery(['user'], () => getUser(session!.user_id));
  const { address, zoneCode } = usePostCodeStore();

  const [userData, setUserData] = useState<UpdateUserData>({
    address: '',
    detailAddress: '',
    point: 0,
    rank: 0,
    phone: '',
    name: '',
    zonecode: '',
  });

  useEffect(() => {
    setUserData({
      address: userInfoData?.address || '',
      point: 0,
      rank: 0,
      phone: userInfoData?.phone || '',
      name: userInfoData?.name || '',
      detailAddress: userInfoData?.detailAddress || '',
      zonecode: userInfoData?.zonecode || '',
    });
    setValue('zonecode', userData.zonecode);
    setValue('address', userData.address);
  }, [userInfoData, setValue, userData.address, userData.zonecode]);

  useEffect(() => {
    setValue('address', address);
    setValue('zonecode', zoneCode);
  }, [address, zoneCode, setValue]);

  const { debounce, handleDefaultAddress, handleCancelClick, mainChallengeLoading, mainChallengeError } = useJoinChallenge(
    session,
    userData,
    handleSubmit,
  );

  const { nameRegister, phoneRegister, addressRegister, detailAddressRegister, zoneCodeRegister } = useInputRegister(register);

  if (userLoading || mainChallengeLoading) {
    return (
      <div className="absolute top-[50%] left-[50%] -translate-x-center -translate-y-center">
        <BarLoader color="#101828" height={5} width={200} />
      </div>
    );
  }
  if (userError || mainChallengeError) {
    return <div>에러입니다...</div>;
  }

  return (
    <Modal>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
        className="my-[30px] overflow-y-auto pr-3"
      >
        <h5 className="mb-4 sm:mb-8">신청자 정보</h5>
        <div className="flex flex-col sm:flex-row">
          <Label name="name" size="base" labelStyle="flex flex-col leading-[150%]">
            이름
            <input
              defaultValue={userData.name || ''}
              className={
                'rounded-lg font-normal text-base border border-opacityblack outline-none w-[200px] sm:w-[9.375rem] h-[1.375rem] py-2 px-6 box-content sm:mt-[8px]'
              }
              {...nameRegister}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </Label>
          <Label name="phoneNumber" size="base" labelStyle="flex leading-[150%] mt-[8px] flex-col sm:ml-4 sm:mt-0">
            연락처
            <input
              maxLength={11}
              placeholder="ex)01012345678"
              defaultValue={userData.phone || ''}
              className="rounded-lg font-normal text-base border border-opacityblack outline-none ml-0 w-[200px] h-[1.375rem] py-2 px-6 box-content sm:mt-[8px] sm:w-[16.31rem]"
              {...phoneRegister}
            />
            {errors.phone && <p className="text-sm text-nagative">{errors.phone.message}</p>}
          </Label>
        </div>
        <div className="my-5 flex flex-col w-full sm:my-10">
          <div className="mb-4 flex flex-col sm:items-center sm:flex-row sm:mb-8 ">
            <h5>배송지 정보</h5>
            <p className="text-sm sm:ml-[15px]">챌린지 관련 물품이 있을 시 배송받으실 주소를 입력해주세요.</p>
          </div>

          <div className="flex flex-row w-full items-end">
            <div className="w-[20%] mr-[16px]">
              <Label name="zonecode" size={'base'} labelStyle="flex flex-col leading-[150%] ">
                우편번호
              </Label>
              <input
                readOnly
                defaultValue={userData.zonecode || ''}
                className="bg-[#f4f6f8;] rounded-lg font-normal text-base border border-opacityblack outline-none ml-0 w-full h-10 py-2 px-6 box-border sm:mt-[8px]"
                {...zoneCodeRegister}
              />
            </div>
            <div className="w-[64%]">
              <Label name="address" size={'base'} labelStyle="flex flex-col leading-[150%] ">
                주소
              </Label>
              <input
                readOnly
                defaultValue={userData.address || ''}
                className="bg-[#f4f6f8;] rounded-lg font-normal text-base border border-opacityblack outline-none ml-0 w-full h-10 py-2 px-6 box-border sm:mt-[8px]"
                {...addressRegister}
              />
            </div>
            <button onClick={() => setIsPostCodeOpen(true)} className="py-2 px-4 h-10 bg-[#d3d3d3] ml-2 rounded-lg">
              검색
            </button>
          </div>
          {isPostCodeOpen && <PostCode setIsPostCodeOpen={setIsPostCodeOpen} />}
          <Label name="detailAddress" size={'base'} labelStyle="flex flex-col leading-[150%] ">
            상세 주소
          </Label>

          <textarea
            defaultValue={userData.detailAddress || ''}
            className="rounded-lg font-normal text-base border border-opacityblack outline-none my-[8px] w-full box-border h-[2.6rem] py-2 px-6 resize-none"
            {...detailAddressRegister}
          />
          {errors.address && <p className="text-sm text-nagative">{errors.address.message}</p>}
          <div className="flex text-sm">
            <input type="checkbox" className="mr-[8px]" onChange={handleDefaultAddress} defaultChecked /> 위 배송지를 기본 배송지로 저장합니다.
          </div>
        </div>

        <hr className="border border-[#E6E6E6] w-full" />
        <div className="flex my-5 justify-between sm:my-10 sm:block">
          <div className="flex flex-col sm:block">
            <label htmlFor="paymentMethod" className="font-bold leading-[150%] sm:h-auto">
              결제 방식
            </label>
            <div className="flex items-center text-sm leading-[150%] mt-[12px]">
              <input type="radio" id="paymentMethod" className="mr-[8px]" defaultChecked />
              포인트 결제
            </div>
          </div>
          <div>
            <p className="leading-[150%] mb-[12px] sm:my-[16px]">
              <span className="font-bold ">보유중인 나무 : </span>
              {`${session?.point} 그루`}
            </p>
            <p className="leading-[150%]">
              <span className="font-bold leading-[150%]">배송비 : </span> 무료
            </p>
          </div>
        </div>
        <hr className="border border-[#E6E6E6] w-full mb-[1.25rem]" />
        <div className="flex justify-between w-full">
          <p className="leading-[150%]">총 결제 나무 :</p>
          <p className="text-lg font-bold leading-[140%]">25그루</p>
        </div>
        <div className="flex gap-2 justify-center mt-8 w-full">
          <Button onClick={() => debounce(500)} type="submit" btnType={'primary'}>
            참여 신청하기
          </Button>
          <Button type="button" btnType={'borderBlack'} size={'small'} onClick={handleCancelClick}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export type UpdateUserData = {
  rank: number;
  address: string | null;
  point: number;
  phone: string | null;
  name: string | null;
  detailAddress: string;
  zonecode: string | null;
};
