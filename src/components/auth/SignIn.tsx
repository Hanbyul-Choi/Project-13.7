'use client';
import React, { useState } from 'react';

import { useModalStore } from '@/store/modalStore';

import SignInModal from './SignInModal';

export const SignIn = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { openModal } = useModalStore(state => state);

  const handleOpenModal = () => {
    setShowSignInModal(true);
    openModal();
  };

  const handleCloseModal = () => {
    setShowSignInModal(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>로그인</button>
      {showSignInModal && <SignInModal onClose={handleCloseModal} />}
    </div>
  );
};

export default SignIn;
