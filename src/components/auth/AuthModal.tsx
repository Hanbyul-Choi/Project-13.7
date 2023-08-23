'use client';
import React, { useState } from 'react';

import { useModalStore } from '@/store/modalStore';

import { supabase } from '../../../supabase/supabaseConfig';
import Button from '../common/Button';
import { useDialog } from '../common/Dialog';
import { Input } from '../common/Input';
import { Label } from '../common/Label';
import Modal from '../common/Modal';

type SignUpModalProps = {
  type: string;
};

const AuthModal: React.FC<SignUpModalProps> = ({ type }) => {
  const { Alert } = useDialog();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const { closeModal } = useModalStore(state => state);
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
    const { error: dbError } = await supabase.from('users').insert({ user_id: uid, email, nickname, point: 25 });

    if (authError) {
      if (authError?.message === 'invalid format') return alert('이메일 형태가 올바르지 않습니다.');
      else if (authError?.message === 'user already exist') return alert('일치하는 회원이 존재합니다.');
    }
    if (dbError) return alert('database error');
    closeModal();
    return alert('회원가입이 정상적으로 처리되었습니다.');
  };

  const signInHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) Alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    else Alert('로그인 성공');
    closeModal();
  };

  return (
    <Modal>
      {type === 'signUp' ? (
        <>
          <h1 className="mb-10">Sign Up 👋</h1>
          <form onSubmit={signUpHandler} className="flex flex-col gap-y-4">
            <Label name={'nickname'} size={'base'}>
              닉네임
            </Label>
            <Input type="text" value={nickname} onChange={handleNicknameChange} _size="sm" />
            <Label name={'email'} size={'base'}>
              이메일
            </Label>
            <Input type="text" value={email} onChange={handleEmailChange} autoFocus _size={'sm'} />
            <Label name={'password'} size={'base'}>
              비밀번호
            </Label>
            <Input type="password" value={password} placeholder="비밀번호" onChange={handlePasswordChange} _size="sm" />
            <Label name={'passwordConfirm'} size={'base'}>
              비밀번호 확인
            </Label>
            <Input type="password" id="passwordConfirm" value={passwordConfirm} placeholder="비밀번호 확인" onChange={handlePasswordConfirmChange} _size="sm" />
            <Button type="submit" btnType={'primary'} size="full">
              회원가입
            </Button>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={signInHandler} className="flex flex-col gap-y-4">
            <h1 className="mb-10">Log In 👋</h1>
            <Label name={'id'} size={'base'}>
              아이디
            </Label>
            <Input _size="sm" type="text" value={email} onChange={handleEmailChange} />
            <Label name={'password'} size={'base'}>
              비밀번호
            </Label>
            <Input _size="sm" type="password" value={password} onChange={handlePasswordChange} />
            <div className="flex justify-end py-2 text-base text-sub6">
              <p>아이디 찾기</p> <p className="px-2">|</p>
              <p>비밀번호 찾기</p>
            </div>
            <Button type="submit" btnType={'primary'} size={'full'}>
              로그인
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default AuthModal;
