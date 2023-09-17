import React from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';

import { useModalStore } from '@/store/modal.store';

import TreeDonation from './TreeDonation';
import TreeGuideModal from './TreeGuideModal';

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
        <div className="text-lg flex justify-center items-baseline gap-1 mt-8">
          <p>현재 나무 총</p>
          <p className="text-xl align-text-bottom font-semibold">{curUserTrees}</p>
          <p>그루</p>
        </div>
        <button
          onClick={onClickTreeGuide}
          className="bg-green text-white px-3 py-1 my-3 gap-2 border rounded-full text-sm mb-2 flex justify-center items-center"
        >
          <p className="font-semibold sm:text-base">나무를 얻으려면?</p> <AiOutlineArrowRight size={15} />
        </button>
        {isOpenMainModal && <TreeGuideModal />}
        <button
          onClick={onClickTreeDonation}
          className="bg-green text-white px-3 py-1 my-3 gap-2 border rounded-full text-sm mb-2 flex justify-center items-center"
        >
          <p className="font-semibold sm:text-base">나무로 후원하기</p> <AiOutlineArrowRight size={15} />
        </button>
        {isOpenSub2Modal && <TreeDonation curUserTrees={curUserTrees} userId={userId} />}
      </div>
    </>
  );
}
