'use client';
import React, { useState } from 'react';

import { useModalStore } from '@/store/modalStore';

import SignUpModal from './SignUpModal';

export const SingUp = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { openModal, closeModal } = useModalStore(state => state);

  const handleOpenSignUp = () => {
    setShowSignUpModal(true);
    openModal();
  };

  const handleCloseSignUp = () => {
    setShowSignUpModal(true);
    closeModal();
  };

  return (
    <div>
      <button onClick={handleOpenSignUp}>회원가입</button>
      {showSignUpModal && <SignUpModal onClose={handleCloseSignUp} />}
    </div>
  );
};
