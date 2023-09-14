import React from 'react';

import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useModalStore } from '@/store/modal.store';

import type { HowToGetTrees } from '@/types/db.type';

export const treeGuideArray: HowToGetTrees[] = [
  { title: '챌린지 참가 인증', trees: 10 },
  { title: '챌린지 제안', trees: 5 },
  { title: '챌린지 응원/댓글', trees: 2 },
  { title: '챌린지 투표(좋아요)', trees: 2 },
  { title: '등급 UP 혜택', trees: 30 },
];

const TreeGuideModal: React.FC = () => {
  const { mainCloseModal } = useModalStore(state => state);
  const route = useRouter();

  const onClickToJoinChallenge = () => {
    route.push('/challenge');
  };

  return (
    <>
      <Modal>
        <div className="md:w-[29rem] md:h-[35.4375rem] w-[24rem] h-[24rem] flex flex-col px-2 justify-evenly">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold py-2">활동하고 나무 충전하기</p>
            <button onClick={mainCloseModal}>
              <AiOutlineClose size={25} />
            </button>
          </div>
          <div className="border-t border-black opacity-25 mb-6 justify-between"></div>
          {treeGuideArray.map((item: HowToGetTrees) => (
            <ul key={item.title} className="flex items-center justify-between gap-2 md:bg-sub1 rounded-lg md:px-6 md:py-4 md:mb-3">
              <li className="text-lg font-semibold">{item.title}</li>
              <li className="text-sub6 text-sm">나무 {item.trees} 그루 지급</li>
            </ul>
          ))}
          <div className="mt-6" onClick={mainCloseModal}>
            <Button onClick={onClickToJoinChallenge} btnType={'primary'} size={'full'}>
              챌린지 참여하기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TreeGuideModal;
