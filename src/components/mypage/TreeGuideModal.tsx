import React from 'react';

import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useModalStore } from '@/store/modal.store';

import type { HowToGetTrees } from '@/types/db.type';

export const treeGuideArray: HowToGetTrees[] = [
  { title: '챌린지 참가 인증', trees: 25 },
  { title: '챌린지 제안하기', trees: 5 },
  { title: '챌린지 응원하기', trees: 2 },
  { title: '챌린지 투표하기', trees: 2 },
  { title: '등급 UP 혜택', trees: 20 },
];

const TreeGuideModal: React.FC = () => {
  const { mainCloseModal } = useModalStore(state => state);

  return (
    <>
      <Modal>
        <div className="w-[29rem] h-[35.4375rem] flex flex-col justify-center sm:w-[20rem] sm:h-[25rem]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold py-2">활동하고 나무 충전하기</p>
            <button onClick={mainCloseModal}>
              <AiOutlineClose size={25} />
            </button>
          </div>
          <div className="border-t border-black opacity-25 mb-6"></div>
          <div className="justify-evenly">
            {treeGuideArray.map((item: HowToGetTrees) => (
              <ul key={item.title} className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3 sm:px-2 sm:py-2 sm:mb-2">
                <li className="text-lg font-semibold">{item.title}</li>
                <li className="text-sub6 text-base">나무 {item.trees} 그루 지급</li>
              </ul>
            ))}
          </div>
          <div className="mt-6">
            <Button btnType={'primary'} size={'full'}>
              <Link href={'/challenge'} onClick={mainCloseModal}>
                챌린지 참여하기
              </Link>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TreeGuideModal;
