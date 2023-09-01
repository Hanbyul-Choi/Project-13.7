import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useModalStore } from '@/store/modal.store';

const TreeGuideModal: React.FC = () => {
  const { mainCloseModal } = useModalStore(state => state);

  return (
    <Modal>
      <div>
        <p className="text-lg font-semibold mb-4">활동하고 나무 충전하기</p>
        <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg w-full px-8 py-4 mb-3">
          <li className="text-lg">회원가입</li>
          <li className="text-sub6 text-base">25 그루 지급</li>
        </ul>
        <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg w-full px-8 py-4 mb-3">
          <li className="text-lg">챌린지 참가 인증</li>
          <li className="text-sub6 text-base">10 그루 지급</li>
        </ul>
        <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg w-full px-8 py-4 mb-3">
          <li className="text-lg">챌린지 제안</li>
          <li className="text-sub6 text-base">5 그루 </li>
        </ul>
        <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg w-full px-8 py-4 mb-3">
          <li className="text-lg">댓글 작성</li>
          <li className="text-sub6 text-base">1 그루 </li>
        </ul>
        <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg w-full px-8 py-4 mb-3">
          <li className="text-lg">등급 UP</li>
          <li className="text-sub6 text-base">20 그루 </li>
        </ul>
        <div className="flex gap-2">
          <Button btnType={'primary'} size={'full'}>
            <Link href={'/challenge'} onClick={mainCloseModal}>
              챌린지 참여하기
            </Link>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TreeGuideModal;
