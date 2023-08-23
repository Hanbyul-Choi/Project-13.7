'use client';
import React, { useState } from 'react';

import { supabase } from '../../../supabase/supabaseConfig';
import Button from '../common/Button';
import { useDialog } from '../common/Dialog';
import { Input } from '../common/Input';
import { Label } from '../common/Label';
import Modal from '../common/Modal';

type SignInModalProps = {
  onClose: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const { Alert } = useDialog();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) Alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    else Alert('로그인 성공');
    onClose();
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <h1 className="mb-10">Log In 👋</h1>
        <Label name={'id'} size={'base'}>
          아이디
        </Label>
        <Input
          _size="sm"
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <Label name={'password'} size={'base'}>
          비밀번호
        </Label>
        <Input
          _size="sm"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex justify-end py-2 text-base text-sub6">
          <p>아이디 찾기</p> <p className="px-2">|</p>
          <p>비밀번호 찾기</p>
        </div>
        <Button type="submit" btnType={'primary'} size={'full'}>
          로그인
        </Button>
      </form>
    </Modal>
  );
};

export default SignInModal;
