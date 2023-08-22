'use client';
import React, { useState } from 'react';

import { supabase } from '../../../supabase/supabaseConfig';
import Button from '../common/Button';
import { Input } from '../common/Input';
import Modal from '../common/Modal';

type SignUpModalProps = {
  onClose: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

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
    onClose();
    return alert('회원가입이 정상적으로 처리되었습니다.');
  };

  return (
    <Modal>
      <form onSubmit={signUpHandler}>
        <label>이메일</label>
        <Input
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          autoFocus
          _size={'sm'}
        />
        <label>비밀번호</label>
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          _size={'sm'}
        />
        <label>닉네임</label>
        <Input
          type="text"
          value={nickname}
          onChange={e => {
            setNickname(e.target.value);
          }}
          _size={'sm'}
        />
        <Button type="submit" btnType={'primary'} size="full">
          회원가입
        </Button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
