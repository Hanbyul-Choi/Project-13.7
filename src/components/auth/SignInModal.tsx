import React, { useState } from 'react';

import { supabase } from '../../../supabase/supabaseConfig';
import Button from '../common/Button';
import { Input } from '../common/Input';
import Modal from '../common/Modal';

type SignInModalProps = {
  onClose: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    else alert('로그인 성공');
    onClose();
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <Input _size="sm" type="text" placeholder="아이디" value={email} onChange={handleEmailChange} />
        <Input _size="sm" type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
        <Button type="submit">로그인</Button>
      </form>
    </Modal>
  );
};

export default SignInModal;
