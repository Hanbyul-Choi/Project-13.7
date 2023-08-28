'use client';
import React, { useEffect, useState } from 'react';

import { useModalStore } from '@/store/modal.store';

import NaverSignIn from './social-sign-in/NaverSignIn';
import SocialSignIn from './social-sign-in/SocialSignIn';
import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Input, Label, useDialog } from '../common';
import Modal from '../common/Modal';

type SignUpModalProps = {
  switchHandler: (type: 'signIn' | 'signUp') => void;
  modalType: string;
};

const AuthModal: React.FC<SignUpModalProps> = ({ switchHandler, modalType }) => {
  const { Alert } = useDialog();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const { closeModal } = useModalStore(state => state);
  let disabled = true;

  useEffect(() => {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setNickname('');
  }, [modalType]);
  if (email.replaceAll(' ', '') !== '' && password.replaceAll(' ', '') !== '') {
    if (modalType === 'signIn') {
      disabled = false;
    } else if (passwordConfirm.replaceAll(' ', '') !== '' && nickname.replaceAll(' ', '') !== '') {
      disabled = false;
    }
  }

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPasswordConfirm(event.target.value);
  };

  const handleNicknameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setNickname(event.target.value);
  };

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return alert('이메일을 입력하세요');
    if (!password) return alert('패스워드를 입력하세요');
    if (!nickname) return alert('닉네임을 입력하세요');

    // auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    let uid = authData.user?.id;

    // database
    const { error: dbError } = await supabase.from('users').insert({ user_id: uid, email, nickname });

    if (authError) {
      if (authError?.message === 'invalid format') return Alert('이메일 형태가 올바르지 않습니다.');
      else if (authError?.message === 'user already exist') return Alert('일치하는 회원이 존재합니다.');
    }
    if (dbError) {
      console.log(dbError);
      return Alert('오류가 발생했습니다.', '잠시후 다시 시도해주세요.');
    }
    closeModal();
    return Alert('회원가입이 정상적으로 처리되었습니다.');
  };

  const signInHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) Alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    else Alert('로그인 되었습니다.');
    closeModal();
  };

  return (
    <Modal>
      {modalType === 'signUp' ? (
        <>
          <h1 className="mb-10">Sign Up 👋</h1>
          <form onSubmit={signUpHandler} className="flex flex-col gap-y-4">
            <Label name={'nickname'} size={'base'}>
              닉네임
            </Label>
            <Input type="text" value={nickname} autoFocus onChange={handleNicknameChange} _size="sm" placeholder="닉네임을 입력하세요" />
            <Label name={'email'} size={'base'}>
              이메일
            </Label>
            <Input type="text" value={email} onChange={handleEmailChange} _size={'sm'} placeholder="example@email.com" />
            <Label name={'password'} size={'base'}>
              비밀번호
            </Label>
            <Input type="password" value={password} placeholder="비밀번호" onChange={handlePasswordChange} _size="sm" />
            <Label name={'passwordConfirm'} size={'base'}>
              비밀번호 확인
            </Label>
            <Input type="password" id="passwordConfirm" value={passwordConfirm} placeholder="비밀번호 확인" onChange={handlePasswordConfirmChange} _size="sm" />
            <Button type="submit" btnType={'primary'} size="full" buttonStyle="mt-8" disabled={disabled}>
              회원가입
            </Button>
          </form>
          <p className="text-lg mx-auto mt-12">
            이미 회원이신가요?
            <button className="text-blue" onClick={() => switchHandler('signIn')}>
              &nbsp; 로그인
            </button>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={signInHandler} className="flex flex-col gap-y-4">
            <h1 className="mb-10">Log In 👋</h1>
            <Label name={'id'} size={'base'}>
              이메일
            </Label>
            <Input _size="sm" type="text" value={email} onChange={handleEmailChange} placeholder="example@email.com" />
            <Label name={'password'} size={'base'}>
              비밀번호
            </Label>
            <Input _size="sm" type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호" />
            <div className="flex justify-end py-2 text-base text-sub6">
              <p>아이디 찾기</p>
              <p className="px-2">|</p>
              <p>비밀번호 찾기</p>
            </div>
            <Button type="submit" btnType={'primary'} size={'full'} disabled={disabled}>
              로그인
            </Button>
          </form>
          <div className="flex items-center gap-4 w-full mt-12">
            <div className="h-[1px] w-full bg-sub4" />
            <p className="text-sm min-w-fit text-sub6">SNS 계정으로 간편로그인</p>
            <div className="h-[1px] w-full bg-sub4" />
          </div>
          <div className="flex gap-6 rounded-lg items-center mx-auto mt-[34px]">
            <SocialSignIn social="google" />
            <SocialSignIn social="kakao" />
            <NaverSignIn />
          </div>
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
