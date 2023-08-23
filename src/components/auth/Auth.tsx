'use client';
import React, { useState } from 'react';

import { useModalStore } from '@/store/modalStore';

import AuthModal from './AuthModal';

export const Auth: React.FC = () => {
  const [modalType, setModalType] = useState('');
  const { openModal } = useModalStore(state => state);

  const onClickSignIn = () => {
    setModalType('signIn');
    openModal();
  };

  const onClickSignUp = () => {
    setModalType('signUp');
    openModal();
  };

  return (
    <div className="flex gap-2">
      <button onClick={onClickSignIn}>로그인</button>
      <button onClick={onClickSignUp}>회원가입</button>
      <AuthModal type={modalType} />
    </div>
  );
};

export default Auth;
