'use client';
import React, { useState } from 'react';

import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import UploadReviewModal from './UploadReviewModal';
import { Button, useDialog } from '../common';

export function CertifyPost() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);

  const [modalType, setModalType] = useState('');
  const { Alert } = useDialog();

  const onClickUploadReview = () => {
    if (session?.user) {
      setModalType('reviews');
      mainOpenModal();
    } else {
      Alert('로그인하세요');
    }
  };

  return (
    <>
      <Button onClick={onClickUploadReview} btnType={'primary'} size="small">
        인증하기
      </Button>
      {isOpenMainModal && <UploadReviewModal modalType={modalType} />}
    </>
  );
}
