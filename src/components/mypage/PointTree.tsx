import React from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';

import { useModalStore } from '@/store/modal.store';

import TreeGuideModal from './TreeGuideModal';

export default function PointTree() {
  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);
  const onClickTreeGuide = () => {
    mainOpenModal();
  };

  return (
    <>
      <div className="flex flex-col text-center">
        <button onClick={onClickTreeGuide} className="bg-green text-white px-4 py-1 gap-2 border rounded-full text-sm mb-2 flex justify-center items-center">
          <p className="font-semibold">나무를 얻으려면?</p> <AiOutlineArrowRight size={15} />
        </button>
        {isOpenMainModal && <TreeGuideModal />}
      </div>
    </>
  );
}
