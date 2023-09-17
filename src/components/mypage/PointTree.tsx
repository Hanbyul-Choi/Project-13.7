import React from 'react';

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
  const { mainOpenModal, isOpenMainModal, sub2OpenModal, isOpenSub2Modal } = useModalStore(state => state);
  const onClickTreeGuide = () => {
    mainOpenModal();
  };
  const onClickTreeDonation = () => {
    sub2OpenModal();
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
            <p className="font-semibold sm:text-base">나무를 얻으려면?</p> <AiOutlineArrowRight size={15} />
          </Button>
          {isOpenMainModal && <TreeGuideModal />}
          <Button onClick={onClickTreeDonation} btnType={'green'} size={'medium'}>
            <p className="font-semibold sm:text-base">나무로 후원하기</p> <AiOutlineArrowRight size={15} />
          </Button>
        </div>
        {isOpenSub2Modal && <TreeDonation curUserTrees={curUserTrees} userId={userId} />}
      </div>
    </>
  );
}
