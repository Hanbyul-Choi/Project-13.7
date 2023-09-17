'use client';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { getUser } from '@/app/api/users';
import InputForm from '@/components/common/InputForm';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/session.store';

import { supabase } from '../../../../supabase/supabaseConfig';
import { Button, Input, Label, useDialog } from '../../common';
import SocialSignIn from '../social-sign-in/SocialSignIn';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

interface SignInUser {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { Alert } = useDialog();
  const { setSession } = useSessionStore();
  const { closeModal } = useModalStore();
  const [disableBtn, setDisableBtn] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const { email, password } = watch();

  useEffect(() => {
    if (!email && !password) return;
    if (email.trim() !== '' && password.trim() !== '') {
      setDisableBtn(false);
    }
  }, [email, password]);

  const signInHandler: SubmitHandler<SignInUser | FieldValues> = async data => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (!session) return;
    const access_token = session.access_token;
    const refresh_token = session.refresh_token;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    const userData = await getUser(session.user.id);
    setSession(userData);

    if (error) return Alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    else Alert('로그인 되었습니다.');
    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit(signInHandler)} className="flex flex-col gap-y-4">
        <h1 className="mb-10">Log In 👋</h1>
        <Label name={'email'} size={'base'}>
          이메일
        </Label>
        <InputForm
          _size="sm"
          type="text"
          placeholder="example@email.com"
          name="email"
          rules={{ pattern: { value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, message: '이메일 형식이 아닙니다.' } }}
          register={register}
          errors={errors}
        />
        <Label name={'password'} size={'base'}>
          비밀번호
        </Label>
        <Input _size="sm" type="password" placeholder="비밀번호" {...register('password')} />
        <div className="flex justify-end py-2 text-base text-sub6">
          <p>아이디 찾기</p>
          <p className="px-2">|</p>
          <p>비밀번호 찾기</p>
        </div>
        <Button type="submit" btnType={'primary'} size={'full'} disabled={disableBtn}>
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
      </div>
    </>
  );
}
