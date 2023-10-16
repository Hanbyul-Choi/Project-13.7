import React from 'react';

import { useRouter } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { useModalStore } from '@/store/modal.store';

import TreeDonation from './TreeDonation';
import TreeGuideModal from './TreeGuideModal';
import { Button } from '../common';

interface PointTreeProps {
  curUserTrees: number;
  userId: string;
}

export default function PointTree({ curUserTrees, userId }: PointTreeProps) {
  const route = useRouter();

  const { mainOpenModal, isOpenMainModal, sub2OpenModal, isOpenSub2Modal } = useModalStore(state => state);
  const onClickTreeGuide = () => {
    mainOpenModal();
  };
  const onClickTreeDonation = () => {
    sub2OpenModal();
  };
  const goToDonationHistory = () => {
    route.push('/mypage/donationHistory');
  };

  return (
    <>
      <div className="flex flex-col text-center">
        <div className="text-lg flex justify-center items-baseline gap-1 my-3">
          <p>현재 나무 총</p>
          <p className="text-xl align-text-bottom font-semibold">{curUserTrees}</p>
          <p>그루</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={onClickTreeGuide} btnType={'green'} size={'medium'}>
            <p className="font-semibold sm:text-base ml-2">나무를 얻으려면?</p> <AiOutlineArrowRight size={15} />
          </Button>
          {isOpenMainModal && <TreeGuideModal />}
          <Button onClick={onClickTreeDonation} btnType={'green'} size={'medium'}>
            <p className="font-semibold sm:text-base ml-2">나무로 후원하기</p> <AiOutlineArrowRight size={15} />
          </Button>
          {isOpenSub2Modal && <TreeDonation curUserTrees={curUserTrees} userId={userId} />}
        </div>
        <p onClick={goToDonationHistory} className="font-semibold text-base text-green cursor-pointer my-4">
          지난 후원내역
        </p>
      </div>
    </>
  );
}
