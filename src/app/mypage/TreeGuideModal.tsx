import React from 'react';

import Link from 'next/link';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useModalStore } from '@/store/modalStore';

const TreeGuideModal: React.FC = () => {
  const { closeModal } = useModalStore(state => state);

  return (
    <Modal>
      <div className="">
        <h1>활동하고 나무 충전하기</h1>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>회원가입</li>
          <li>25 그루</li>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>챌린지 참가 인증</li>
          <li>10 그루</li>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>챌린지 제안</li>
          <li>5 그루</li>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>댓글 작성</li>
          <li>1 그루</li>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>등급 UP</li>
          <li>20 그루</li>
        </ul>
        <div className="flex gap-2">
          <Button btnType={'primary'} size={'small'}>
            <Link href={'/challenge'}>챌린지 바로가기</Link>
          </Button>
          <Button onClick={closeModal} btnType={'borderBlack'} size={'small'}>
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TreeGuideModal;
