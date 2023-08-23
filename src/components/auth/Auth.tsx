'use client';
import React, { useState } from 'react';

import { useModalStore } from '@/store/modalStore';

import AuthModal from './AuthModal';

export const Auth: React.FC = () => {
  const { openModal, isOpen } = useModalStore(state => state);

  const [modalType, setModalType] = useState('');
  const onClickSignIn = () => {
    setModalType('signIn');
    openModal();
  };

  const switchHandler = (type: 'signIn' | 'signUp') => {
    setModalType(type);
  };

  return (
    <div className={`${isOpen ? 'text-black' : 'text-sub6'} flex gap-2 text-lg font-medium`}>
      <button onClick={onClickSignIn}>로그인</button>
      <AuthModal modalType={modalType} switchHandler={switchHandler} />
    </div>
  );
};

export default Auth;
