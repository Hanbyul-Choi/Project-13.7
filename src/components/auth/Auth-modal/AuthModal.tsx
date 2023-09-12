'use client';
import React from 'react';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Modal from '../../common/Modal';

type SignUpModalProps = {
  switchHandler: (type: 'signIn' | 'signUp') => void;
  modalType: string;
};

const AuthModal: React.FC<SignUpModalProps> = ({ switchHandler, modalType }) => {
  return (
    <Modal>
      {modalType === 'signUp' ? (
        <>
          <SignUpForm />
          <p className="text-lg mx-auto mt-12">
            이미 회원이신가요?
            <button className="text-blue" onClick={() => switchHandler('signIn')}>
              &nbsp; 로그인
            </button>
          </p>
        </>
      ) : (
        <>
          <SignInForm />
          <p className="text-lg mx-auto mt-12">
            아직 회원이 아니신가요?
            <button className="text-blue" onClick={() => switchHandler('signUp')}>
              &nbsp; 회원가입
            </button>
          </p>
        </>
      )}
    </Modal>
  );
};

export default AuthModal;
