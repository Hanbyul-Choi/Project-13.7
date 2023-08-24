// TreeGuideModal.tsx
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
        <h3>활동하고 나무 충전하기</h3>
        <p className="text-sky">나무 충전 가이드</p>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>회원가입</li>
          <li>25 그루</li>
          <Button btnType={'borderBlack'} size={'xsmall'}>
            <Link href={'/'}>바로가기</Link>
          </Button>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>챌린지 참가 인증</li>
          <li>10 그루</li>
          <Button btnType={'borderBlack'} size={'xsmall'}>
            <Link href={'/'}>바로가기</Link>
          </Button>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>챌린지 제안</li>
          <li>5 그루</li>
          <Button btnType={'borderBlack'} size={'xsmall'}>
            <Link href={'/'}>바로가기</Link>
          </Button>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>댓글 작성</li>
          <li>1 그루</li>
          <Button btnType={'borderBlack'} size={'xsmall'}>
            <Link href={'/'}>바로가기</Link>
          </Button>
        </ul>
        <ul className="flex item-center justify-between gap-2 py-1">
          <li>등급 UP</li>
          <li>20 그루</li>
          <Button btnType={'borderBlack'} size={'xsmall'}>
            <Link href={'/'}>바로가기</Link>
          </Button>
        </ul>
        <Button onClick={closeModal} btnType={'primary'} size={'small'}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default TreeGuideModal;
